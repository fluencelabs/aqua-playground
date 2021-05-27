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



export async function helloWorld(client: FluenceClient, name: string): Promise<string> {
    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "name") [] name)
   )
   (call %init_peer_id% ("service-id" "addNameToHello") [name] res)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (seq
  (call -relay- ("op" "identity") [])
  (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
 )
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'name', () => {return name;});
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
                reject('Request timed out for helloWorld');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function print(client: FluenceClient, str: string): Promise<void> {
    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("getDataSrv" "str") [] str)
  )
  (call %init_peer_id% ("println-service-id" "print") [str])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'str', () => {return str;});
                
                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for print');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
      


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
      


export async function testFunc(client: FluenceClient): Promise<string> {
    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("test-service-id" "str") [] res)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (seq
  (call -relay- ("op" "identity") [])
  (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
 )
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                
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
                reject('Request timed out for testFunc');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function doStuff(client: FluenceClient, a: string, b: string, c: boolean, d: boolean, e: string[], g: string[], str: string): Promise<string[]> {
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
            (seq
             (seq
              (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
              (call %init_peer_id% ("getDataSrv" "a") [] a)
             )
             (call %init_peer_id% ("getDataSrv" "b") [] b)
            )
            (call %init_peer_id% ("getDataSrv" "c") [] c)
           )
           (call %init_peer_id% ("getDataSrv" "d") [] d)
          )
          (call %init_peer_id% ("getDataSrv" "e") [] e)
         )
         (call %init_peer_id% ("getDataSrv" "g") [] g)
        )
        (call %init_peer_id% ("getDataSrv" "str") [] str)
       )
       (call %init_peer_id% ("some-id" "t") [str] $stream)
      )
      (par
       (call %init_peer_id% ("println-service-id" "print") [a])
       (seq
        (seq
         (seq
          (call -relay- ("op" "identity") [])
          (xor
           (call a ("peer" "identify") [])
           (seq
            (call -relay- ("op" "identity") [])
            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
           )
          )
         )
         (call -relay- ("op" "identity") [])
        )
        (call %init_peer_id% ("op" "identity") [])
       )
      )
     )
     (call -relay- ("op" "identity") [])
    )
    (xor
     (xor
      (match c true
       (xor
        (match d true
         (xor
          (fold e eEl
           (seq
            (seq
             (fold g gEl
              (seq
               (seq
                (call b ("some-id" "t") [gEl] $stream)
                (call b ("some-id" "t") [eEl] $stream)
               )
               (next gEl)
              )
             )
             (call b ("some-id" "t") [eEl] $stream)
            )
            (next eEl)
           )
          )
          (seq
           (seq
            (call -relay- ("op" "identity") [])
            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
           )
           (call -relay- ("op" "identity") [])
          )
         )
        )
        (null)
       )
      )
      (null)
     )
     (seq
      (seq
       (call -relay- ("op" "identity") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
      )
      (call -relay- ("op" "identity") [])
     )
    )
   )
   (call -relay- ("op" "identity") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$stream])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
  )
 )
 (seq
  (call -relay- ("op" "identity") [])
  (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
 )
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'a', () => {return a;});
h.on('getDataSrv', 'b', () => {return b;});
h.on('getDataSrv', 'c', () => {return c;});
h.on('getDataSrv', 'd', () => {return d;});
h.on('getDataSrv', 'e', () => {return e;});
h.on('getDataSrv', 'g', () => {return g;});
h.on('getDataSrv', 'str', () => {return str;});
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
                reject('Request timed out for doStuff');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      