/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.0-SNAPSHOT
 *
 */
import { FluencePeer } from '@fluencelabs/fluence';
import {
    ResultCodes,
    RequestFlow,
    RequestFlowBuilder,
    CallParams,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v1';


// Services


// Functions

 export async function wrap(config?: {ttl?: number}) : Promise<string>;
 export async function wrap(peer: FluencePeer, config?: {ttl?: number}) : Promise<string>;
 export async function wrap(...args) {
     let peer: FluencePeer;
     
     let config;
     if (args[0] instanceof FluencePeer) {
         peer = args[0];
         config = args[1];
     } else {
         peer = FluencePeer.default;
         config = args[0];
     }
    
     let request: RequestFlow;
     const promise = new Promise<string>((resolve, reject) => {
         const r = new RequestFlowBuilder()
                 .disableInjections()
                 .withRawScript(
                     `
     (xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("hello" "more_call") [])
   )
   (call %init_peer_id% ("ohmygod" "more_call") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") ["I am MyFooBar foo"])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
                 )
                 .configHandler((h) => {
                     h.on('getDataSrv', '-relay-', async () => {
                    return peer.connectionInfo.connectedRelays[0] || null;
                });
                
                h.onEvent('callbackSrv', 'response', async (args) => {
    const [res] = args;
  resolve(res);
});

                h.onEvent('errorHandlingSrv', 'error', async (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for wrap');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return promise;
}
      


 export async function barfoo(config?: {ttl?: number}) : Promise<string[]>;
 export async function barfoo(peer: FluencePeer, config?: {ttl?: number}) : Promise<string[]>;
 export async function barfoo(...args) {
     let peer: FluencePeer;
     
     let config;
     if (args[0] instanceof FluencePeer) {
         peer = args[0];
         config = args[1];
     } else {
         peer = FluencePeer.default;
         config = args[0];
     }
    
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
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (ap "I am MyFooBar foo" $res)
   )
   (ap " I am MyFooBar bar" $res)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$res])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
                 )
                 .configHandler((h) => {
                     h.on('getDataSrv', '-relay-', async () => {
                    return peer.connectionInfo.connectedRelays[0] || null;
                });
                
                h.onEvent('callbackSrv', 'response', async (args) => {
    const [res] = args;
  resolve(res);
});

                h.onEvent('errorHandlingSrv', 'error', async (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for barfoo');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return promise;
}
      
