/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.4-138
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';



export async function betterMessage(client: FluenceClient, relay: string): Promise<void> {
    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
      (call %init_peer_id% ("getDataSrv" "relay") [] relay)
     )
     (call -relay- ("op" "identity") [])
    )
    (xor
     (call relay ("peer" "is_connected") [relay] isOnline)
     (seq
      (call -relay- ("op" "identity") [])
      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
     )
    )
   )
   (call -relay- ("op" "identity") [])
  )
  (xor
   (match isOnline true
    (xor
     (call %init_peer_id% ("test" "doSomething") [])
     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
    )
   )
   (null)
  )
 )
 (seq
  (call -relay- ("op" "identity") [])
  (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
 )
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'relay', () => {return relay;});
                
                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for betterMessage');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
      