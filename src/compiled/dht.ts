/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.2-126
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';



export async function getNeighbours(client: FluenceClient, key: string, node_id: string): Promise<string[]> {
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
       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
       (call %init_peer_id% ("getDataSrv" "key") [] key)
      )
      (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
     )
     (call -relay- ("op" "identity") [])
    )
    (xor
     (seq
      (call node_id ("op" "string_to_b58") [key] k)
      (call node_id ("kad" "neighborhood") [k false] nodes)
     )
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
   (call %init_peer_id% ("callbackSrv" "response") [nodes])
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
                h.on('getDataSrv', 'key', () => {return key;});
h.on('getDataSrv', 'node_id', () => {return node_id;});
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
                reject('Request timed out for getNeighbours');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function registerKey(client: FluenceClient, node_id: string, key: string): Promise<string[]> {
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
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
       )
       (call %init_peer_id% ("getDataSrv" "key") [] key)
      )
      (call -relay- ("op" "identity") [])
     )
     (xor
      (seq
       (call node_id ("op" "string_to_b58") [key] k)
       (call node_id ("kad" "neighborhood") [k false] nodes)
      )
      (seq
       (call -relay- ("op" "identity") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
      )
     )
    )
    (call -relay- ("op" "identity") [])
   )
   (fold nodes n
    (par
     (seq
      (seq
       (seq
        (call -relay- ("op" "identity") [])
        (xor
         (seq
          (call n ("peer" "timestamp_sec") [] t)
          (call n ("aqua-dht" "register_key") [key t true 0])
         )
         (null)
        )
       )
       (call -relay- ("op" "identity") [])
      )
      (call %init_peer_id% ("op" "identity") [])
     )
     (next n)
    )
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [nodes])
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
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'key', () => {return key;});
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
                reject('Request timed out for registerKey');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function setKeyPutValue(client: FluenceClient, node_id: string, key: string, value: string, relay_id: string, weight: number): Promise<string[]> {
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
         (seq
          (seq
           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
           (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
          )
          (call %init_peer_id% ("getDataSrv" "key") [] key)
         )
         (call %init_peer_id% ("getDataSrv" "value") [] value)
        )
        (call %init_peer_id% ("getDataSrv" "relay_id") [] relay_id)
       )
       (call %init_peer_id% ("getDataSrv" "weight") [] weight)
      )
      (call -relay- ("op" "identity") [])
     )
     (xor
      (seq
       (call node_id ("op" "string_to_b58") [key] k)
       (call node_id ("kad" "neighborhood") [k false] nodes)
      )
      (seq
       (call -relay- ("op" "identity") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
      )
     )
    )
    (call -relay- ("op" "identity") [])
   )
   (fold nodes n
    (par
     (seq
      (seq
       (seq
        (call -relay- ("op" "identity") [])
        (xor
         (seq
          (seq
           (call n ("peer" "timestamp_sec") [] t)
           (call n ("aqua-dht" "register_key") [key t true weight])
          )
          (call n ("aqua-dht" "put_value_relay") [key value t relay_id weight])
         )
         (null)
        )
       )
       (call -relay- ("op" "identity") [])
      )
      (call %init_peer_id% ("op" "identity") [])
     )
     (next n)
    )
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [nodes])
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
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'key', () => {return key;});
h.on('getDataSrv', 'value', () => {return value;});
h.on('getDataSrv', 'relay_id', () => {return relay_id;});
h.on('getDataSrv', 'weight', () => {return weight;});
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
                reject('Request timed out for setKeyPutValue');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function putValue(client: FluenceClient, node_id: string, key: string, value: string, relay_id: string, weight: number): Promise<string[]> {
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
         (seq
          (seq
           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
           (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
          )
          (call %init_peer_id% ("getDataSrv" "key") [] key)
         )
         (call %init_peer_id% ("getDataSrv" "value") [] value)
        )
        (call %init_peer_id% ("getDataSrv" "relay_id") [] relay_id)
       )
       (call %init_peer_id% ("getDataSrv" "weight") [] weight)
      )
      (call -relay- ("op" "identity") [])
     )
     (xor
      (seq
       (call node_id ("op" "string_to_b58") [key] k)
       (call node_id ("kad" "neighborhood") [k false] nodes)
      )
      (seq
       (call -relay- ("op" "identity") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
      )
     )
    )
    (call -relay- ("op" "identity") [])
   )
   (fold nodes n
    (par
     (seq
      (seq
       (seq
        (call -relay- ("op" "identity") [])
        (xor
         (seq
          (call n ("peer" "timestamp_sec") [] t)
          (call n ("aqua-dht" "put_value_relay") [key value t relay_id weight])
         )
         (null)
        )
       )
       (call -relay- ("op" "identity") [])
      )
      (call %init_peer_id% ("op" "identity") [])
     )
     (next n)
    )
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [nodes])
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
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'key', () => {return key;});
h.on('getDataSrv', 'value', () => {return value;});
h.on('getDataSrv', 'relay_id', () => {return relay_id;});
h.on('getDataSrv', 'weight', () => {return weight;});
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
                reject('Request timed out for putValue');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function putHostValue(client: FluenceClient, node_id: string, key: string, value: string, relay_id: string[], service_id: string[], weight: number): Promise<string[]> {
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
         (seq
          (seq
           (seq
            (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
            (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
           )
           (call %init_peer_id% ("getDataSrv" "key") [] key)
          )
          (call %init_peer_id% ("getDataSrv" "value") [] value)
         )
         (call %init_peer_id% ("getDataSrv" "relay_id") [] relay_id)
        )
        (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
       )
       (call %init_peer_id% ("getDataSrv" "weight") [] weight)
      )
      (call -relay- ("op" "identity") [])
     )
     (xor
      (seq
       (call node_id ("op" "string_to_b58") [key] k)
       (call node_id ("kad" "neighborhood") [k false] nodes)
      )
      (seq
       (call -relay- ("op" "identity") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
      )
     )
    )
    (call -relay- ("op" "identity") [])
   )
   (fold nodes n
    (par
     (seq
      (seq
       (seq
        (call -relay- ("op" "identity") [])
        (xor
         (seq
          (call n ("peer" "timestamp_sec") [] t)
          (call n ("aqua-dht" "put_host_value") [key value t relay_id service_id weight])
         )
         (null)
        )
       )
       (call -relay- ("op" "identity") [])
      )
      (call %init_peer_id% ("op" "identity") [])
     )
     (next n)
    )
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [nodes])
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
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'key', () => {return key;});
h.on('getDataSrv', 'value', () => {return value;});
h.on('getDataSrv', 'relay_id', () => {return relay_id;});
h.on('getDataSrv', 'service_id', () => {return service_id;});
h.on('getDataSrv', 'weight', () => {return weight;});
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
                reject('Request timed out for putHostValue');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function getValues(client: FluenceClient, node_id: string, key: string): Promise<{peer_id:string;relay_id:string[];service_id:string[];set_by:string;timestamp_created:number;value:string;weight:number}[]> {
    let request: RequestFlow;
    const promise = new Promise<{peer_id:string;relay_id:string[];service_id:string[];set_by:string;timestamp_created:number;value:string;weight:number}[]>((resolve, reject) => {
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
         (seq
          (seq
           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
           (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
          )
          (call %init_peer_id% ("getDataSrv" "key") [] key)
         )
         (call -relay- ("op" "identity") [])
        )
        (xor
         (seq
          (call node_id ("op" "string_to_b58") [key] k)
          (call node_id ("kad" "neighborhood") [k false] nodes)
         )
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
      (fold nodes n
       (seq
        (seq
         (seq
          (call -relay- ("op" "identity") [])
          (xor
           (seq
            (call n ("peer" "timestamp_sec") [] t)
            (call n ("aqua-dht" "get_values") [key t] $res)
           )
           (null)
          )
         )
         (call -relay- ("op" "identity") [])
        )
        (next n)
       )
      )
     )
     (call -relay- ("op" "identity") [])
    )
    (xor
     (call node_id ("aqua-dht" "merge_hack_get_values") [$res] v)
     (seq
      (seq
       (call -relay- ("op" "identity") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
      )
      (call -relay- ("op" "identity") [])
     )
    )
   )
   (call -relay- ("op" "identity") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [v.$.result!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
  )
 )
 (seq
  (call -relay- ("op" "identity") [])
  (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
 )
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'key', () => {return key;});
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
                reject('Request timed out for getValues');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      