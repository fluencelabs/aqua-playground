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



export async function viaArr(client: FluenceClient, node_id: string, viaAr: string[], config?: {ttl?: number}): Promise<{external_addresses:string[]}> {
    let request: RequestFlow;
    const promise = new Promise<{external_addresses:string[]}>((resolve, reject) => {
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
         (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
        )
        (call %init_peer_id% ("getDataSrv" "viaAr") [] viaAr)
       )
       (call -relay- ("op" "noop") [])
      )
      (fold viaAr -via-peer-
       (seq
        (call -via-peer- ("op" "noop") [])
        (next -via-peer-)
       )
      )
     )
     (xor
      (call node_id ("peer" "identify") [] p)
      (seq
       (seq
        (seq
         (fold viaAr -via-peer-
          (seq
           (call -via-peer- ("op" "noop") [])
           (next -via-peer-)
          )
         )
         (call -relay- ("op" "noop") [])
        )
        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
       )
       (call -relay- ("op" "noop") [])
      )
     )
    )
    (fold viaAr -via-peer-
     (seq
      (call -via-peer- ("op" "noop") [])
      (next -via-peer-)
     )
    )
   )
   (call -relay- ("op" "noop") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [p])
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
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'viaAr', () => {return viaAr;});
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
                reject('Request timed out for viaArr');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function viaStream(client: FluenceClient, node_id: string, viaStr: string[], config?: {ttl?: number}): Promise<{external_addresses:string[]}> {
    let request: RequestFlow;
    const promise = new Promise<{external_addresses:string[]}>((resolve, reject) => {
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
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
         )
         (call %init_peer_id% ("getDataSrv" "viaStr") [] viaStr-iter)
        )
        (fold viaStr-iter viaStr-item
         (seq
          (call %init_peer_id% ("op" "identity") [viaStr-item] $viaStr)
          (next viaStr-item)
         )
        )
       )
       (call -relay- ("op" "noop") [])
      )
      (fold $viaStr -via-peer-
       (seq
        (call -via-peer- ("op" "noop") [])
        (next -via-peer-)
       )
      )
     )
     (xor
      (call node_id ("peer" "identify") [] p)
      (seq
       (seq
        (seq
         (fold $viaStr -via-peer-
          (seq
           (call -via-peer- ("op" "noop") [])
           (next -via-peer-)
          )
         )
         (call -relay- ("op" "noop") [])
        )
        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
       )
       (call -relay- ("op" "noop") [])
      )
     )
    )
    (fold $viaStr -via-peer-
     (seq
      (call -via-peer- ("op" "noop") [])
      (next -via-peer-)
     )
    )
   )
   (call -relay- ("op" "noop") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [p])
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
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'viaStr', () => {return viaStr;});
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
                reject('Request timed out for viaStream');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function viaOpt(client: FluenceClient, relay: string, node_id: string, viaOpt: string | null, config?: {ttl?: number}): Promise<{external_addresses:string[]}> {
    let request: RequestFlow;
    const promise = new Promise<{external_addresses:string[]}>((resolve, reject) => {
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
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "relay") [] relay)
         )
         (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
        )
        (call %init_peer_id% ("getDataSrv" "viaOpt") [] viaOpt)
       )
       (call -relay- ("op" "noop") [])
      )
      (fold viaOpt -via-peer-
       (seq
        (call -via-peer- ("op" "noop") [])
        (next -via-peer-)
       )
      )
     )
     (xor
      (call node_id ("peer" "identify") [] p)
      (seq
       (seq
        (seq
         (fold viaOpt -via-peer-
          (seq
           (call -via-peer- ("op" "noop") [])
           (next -via-peer-)
          )
         )
         (call -relay- ("op" "noop") [])
        )
        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
       )
       (call -relay- ("op" "noop") [])
      )
     )
    )
    (fold viaOpt -via-peer-
     (seq
      (call -via-peer- ("op" "noop") [])
      (next -via-peer-)
     )
    )
   )
   (call -relay- ("op" "noop") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [p])
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
                h.on('getDataSrv', 'relay', () => {return relay;});
h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'viaOpt', () => {return viaOpt === null ? [] : [viaOpt];});
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
                reject('Request timed out for viaOpt');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      