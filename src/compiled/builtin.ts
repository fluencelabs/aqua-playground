import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';



export async function id(client: FluenceClient): Promise<void> {
    let request;
    const promise = new Promise<void>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .withRawScript(
                `
(xor
 (seq
  (call %init_peer_id% ("getDataSrv" "relay") [] relay)
  (call %init_peer_id% ("op" "identity") [])
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
      