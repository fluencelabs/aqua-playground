/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.2.1-SNAPSHOT
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';


// Services

//TestS
//defaultId = "some-id"

//multiline: (a: string, b: string, c: boolean) => string
//t: (arg0: string) => string
//END TestS



// Functions

export async function doStuff(client: FluenceClient, a: string, b: string, c: boolean, d: boolean, e: string[], g: string[], str: string, config?: {ttl?: number}): Promise<string[]> {
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
          (seq
           (call %init_peer_id% ("some-id" "t") [str] $stream)
           (call -relay- ("op" "noop") [])
          )
          (call b ("op" "noop") [])
         )
         (call %init_peer_id% ("println-service-id" "print") [a])
        )
        (seq
         (call -relay- ("op" "noop") [])
         (xor
          (call a ("peer" "identify") [])
          (seq
           (seq
            (call -relay- ("op" "noop") [])
            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
           )
           (call -relay- ("op" "noop") [])
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
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      
