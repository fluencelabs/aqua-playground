/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.13-SNAPSHOT
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';



export async function getPeerExternalAddresses(client: FluenceClient, otherNodePeerId: string, config?: {ttl?: number}): Promise<string[]> {
    let request: RequestFlow;
    const promise = new Promise<string[]>((resolve, reject) => {
        const r = new RequestFlowBuilder()
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
     (call -relay- ("op" "noop") [])
    )
    (xor
     (call otherNodePeerId ("peer" "identify") [] res)
     (seq
      (call -relay- ("op" "noop") [])
      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
     )
    )
   )
   (call -relay- ("op" "noop") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res.$.external_addresses!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
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
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function getDistantAddresses(client: FluenceClient, target: string, viaNode: string, config?: {ttl?: number}): Promise<string[]> {
    let request: RequestFlow;
    const promise = new Promise<string[]>((resolve, reject) => {
        const r = new RequestFlowBuilder()
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
       (call -relay- ("op" "noop") [])
      )
      (call viaNode ("op" "noop") [])
     )
     (xor
      (call target ("peer" "identify") [] res)
      (seq
       (seq
        (seq
         (call viaNode ("op" "noop") [])
         (call -relay- ("op" "noop") [])
        )
        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
       )
       (call -relay- ("op" "noop") [])
      )
     )
    )
    (call viaNode ("op" "noop") [])
   )
   (call -relay- ("op" "noop") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res.$.external_addresses!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
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
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      