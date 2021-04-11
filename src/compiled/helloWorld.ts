import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';



export async function getPeerExternalAddresses(client: FluenceClient): Promise<string[]> {
    let request;
    const promise = new Promise<string[]>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .withRawScript(
                `
(seq
 (seq
  (call %init_peer_id% ("getDataSrv" "relay") [] relay)
  (call %init_peer_id% ("peer" "identify") [] res)
 )
 (seq
  (call relay ("op" "identity") [])
  (call %init_peer_id% ("callbackSrv" "response") [res.$.external_addresses!])
 )
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
                
                h.on('callbackSrv', 'response', (args) => {
  const [res] = args;
  resolve(res);
});

                h.on('nameOfServiceWhereToSendXorError', 'errorProbably', (args) => {
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
      