/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.7-152
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';



export async function helloWorld(client: FluenceClient, name: string, config?: {ttl?: number}): Promise<string> {
    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withTTL(config?.ttl || 5000)
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
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
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
      


export async function print(client: FluenceClient, str: string, config?: {ttl?: number}): Promise<void> {
    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withTTL(config?.ttl || 5000)
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
      


export async function testFunc(client: FluenceClient, config?: {ttl?: number}): Promise<string> {
    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withTTL(config?.ttl || 5000)
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
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
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
      


export async function doStuff(client: FluenceClient, a: string, b: string, c: boolean, d: boolean, e: string[], g: string[], str: string, config?: {ttl?: number}): Promise<string[]> {
    let request: RequestFlow;
    const promise = new Promise<string[]>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withTTL(config?.ttl || 5000)
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
       (par
        (par
         (seq
          (call %init_peer_id% ("some-id" "t") [str] $stream)
          (call b ("op" "noop") [])
         )
         (call %init_peer_id% ("println-service-id" "print") [a])
        )
        (seq
         (call -relay- ("op" "noop") [])
         (xor
          (call a ("peer" "identify") [])
          (seq
           (call -relay- ("op" "noop") [])
           (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
          )
         )
        )
       )
      )
      (call -relay- ("op" "noop") [])
     )
     (xor
      (seq
       (call -relay- ("op" "noop") [])
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
             (call -relay- ("op" "noop") [])
             (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
            )
           )
          )
          (null)
         )
        )
        (null)
       )
      )
      (seq
       (call -relay- ("op" "noop") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
      )
     )
    )
    (call -relay- ("op" "noop") [])
   )
   (call %init_peer_id% ("some-id" "multiline") [a b c] $stream)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$stream])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
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
      