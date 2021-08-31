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

//GetStr
//defaultId = "multiret-test"

//retStr: (arg0: string) => string
//END GetStr




//GetNum
//defaultId = "multiret-num"

//retNum: () => number
//END GetNum



// Functions

export async function tupleFunc(client: FluenceClient, config?: {ttl?: number}): Promise<[string, number]> {
    let request: RequestFlow;
    const promise = new Promise<[string, number]>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("multiret-test" "retStr") ["some-str"] str)
   )
   (call %init_peer_id% ("multiret-num" "retNum") [] n)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [str n])
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
   let opt: any = args;

 return resolve(opt);
});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for tupleFunc');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function multiReturnFunc(client: FluenceClient, somethingToReturn: number[], smthOption: string | null, config?: {ttl?: number}): Promise<[string[], number, string, number[], string | null, number]> {
    let request: RequestFlow;
    const promise = new Promise<[string[], number, string, number[], string | null, number]>((resolve, reject) => {
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
         (call %init_peer_id% ("getDataSrv" "somethingToReturn") [] somethingToReturn)
        )
        (call %init_peer_id% ("getDataSrv" "smthOption") [] smthOption)
       )
       (call %init_peer_id% ("multiret-test" "retStr") ["some-str"] $res)
      )
      (call %init_peer_id% ("multiret-test" "retStr") ["random-str"] $res)
     )
     (call %init_peer_id% ("multiret-test" "retStr") ["some-str"] str)
    )
    (call %init_peer_id% ("multiret-num" "retNum") [] n)
   )
   (ap str $res)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$res 5 "some-str" somethingToReturn smthOption n])
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
                h.on('getDataSrv', 'somethingToReturn', () => {return somethingToReturn;});
h.on('getDataSrv', 'smthOption', () => {return smthOption === null ? [] : [smthOption];});
                h.onEvent('callbackSrv', 'response', (args) => {
   let opt: any = args;

  if(Array.isArray(opt[4])) {
     if (opt[4].length === 0) { opt[4] = null; }
     else {opt[4] = opt[4][0]; }
  }
 return resolve(opt);
});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for multiReturnFunc');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      
