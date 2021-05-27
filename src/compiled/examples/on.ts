/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.2-112
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';



export async function id(client: FluenceClient): Promise<void> {
    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
  (call %init_peer_id% ("op" "identity") [])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                
                
                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for id');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
      


export async function getPeerExternalAddresses(client: FluenceClient, otherNodePeerId: string): Promise<string[]> {
    let request: RequestFlow;
    const promise = new Promise<string[]>((resolve, reject) => {
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
      (call %init_peer_id% ("getDataSrv" "otherNodePeerId") [] otherNodePeerId)
     )
     (call -relay- ("op" "identity") [])
    )
    (xor
     (call otherNodePeerId ("peer" "identify") [] res)
     (seq
      (seq
       (call -relay- ("op" "identity") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
      )
      (call -relay- ("op" "identity") [])
     )
    )
   )
   (call -relay- ("op" "identity") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res.$.external_addresses!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
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
                h.on('getDataSrv', 'otherNodePeerId', () => {return otherNodePeerId;});
                h.onEvent('callbackSrv', 'response', (args) => {
  const [res] = args;
  resolve(res);
});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for getPeerExternalAddresses');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function getDistantAddresses(client: FluenceClient, target: string, viaNode: string): Promise<string[]> {
    let request: RequestFlow;
    const promise = new Promise<string[]>((resolve, reject) => {
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
      (seq
       (seq
        (seq
         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
         (call %init_peer_id% ("getDataSrv" "target") [] target)
        )
        (call %init_peer_id% ("getDataSrv" "viaNode") [] viaNode)
       )
       (call -relay- ("op" "identity") [])
      )
      (call viaNode ("op" "identity") [])
     )
     (xor
      (call target ("peer" "identify") [] res)
      (seq
       (seq
        (seq
         (call viaNode ("op" "identity") [])
         (call -relay- ("op" "identity") [])
        )
        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
       )
       (call -relay- ("op" "identity") [])
      )
     )
    )
    (call viaNode ("op" "identity") [])
   )
   (call -relay- ("op" "identity") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res.$.external_addresses!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
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
                h.on('getDataSrv', 'target', () => {return target;});
h.on('getDataSrv', 'viaNode', () => {return viaNode;});
                h.onEvent('callbackSrv', 'response', (args) => {
  const [res] = args;
  resolve(res);
});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for getDistantAddresses');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      