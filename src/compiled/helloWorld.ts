import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';



export async function getPeerExternalAddresses(client: FluenceClient, otherNodePeerId: string): Promise<string[]> {
    let request;
    const promise = new Promise<string[]>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (seq
    (seq
     (call %init_peer_id% ("getDataSrv" "otherNodePeerId") [] otherNodePeerId)
     (call %init_peer_id% ("getDataSrv" "relay") [] relay)
    )
    (seq
     (call relay ("op" "identity") [])
     (call otherNodePeerId ("peer" "identify") [] res)
    )
   )
   (call relay ("op" "identity") [])
  )
  (call %init_peer_id% ("callbackSrv" "response") [res.$.external_addresses!])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error%])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', 'relay', () => {
                    return client.relayPeerId;
                });
                h.on('getRelayService', 'hasReleay', () => {// Not Used
                    return client.relayPeerId !== undefined;
                });
                h.on('getDataSrv', 'otherNodePeerId', () => {return otherNodePeerId;});
                h.on('callbackSrv', 'response', (args) => {
  const [res] = args;
  resolve(res);
});

                h.on('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out');
            })
            .build();
    });
    await client.initiateFlow(request);
    return promise;
}
      