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

 export interface OpHDef {
     identity: (s: string, callParams: CallParams<'s'>) => Promise<string> | string;
 }

 export function registerOpH(service: OpHDef): void;
export function registerOpH(serviceId: string, service: OpHDef): void;
export function registerOpH(peer: FluencePeer, service: OpHDef): void;
export function registerOpH(peer: FluencePeer, serviceId: string, service: OpHDef): void;
 export function registerOpH(...args) {
    let peer: FluencePeer;
    let serviceId;
    let service;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
    } else {
        peer = FluencePeer.default;
    }

    if (typeof args[0] === 'string') {
        serviceId = args[0];
    } else if (typeof args[1] === 'string') {
        serviceId = args[1];
    }  
 else {
     serviceId = "opa"
}

    if (!(args[0] instanceof FluencePeer) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

      peer.internals.callServiceHandler.use(async (req, resp, next) => {
          if (req.serviceId !== serviceId) {
              await next();
              return;
          }
  
          
 if (req.fnName === 'identity') {
     
 const callParams = {
     ...req.particleContext,
     tetraplets: {
         s: req.tetraplets[0]
     },
 };
 resp.retCode = ResultCodes.success;
 resp.result = await service.identity(req.args[0], callParams)

 }
    
  
          await next();
      });
 }
      

// Functions

 export async function a(b: string, config?: {ttl?: number}) : Promise<string>;
 export async function a(peer: FluencePeer, b: string, config?: {ttl?: number}) : Promise<string>;
 export async function a(...args) {
     let peer: FluencePeer;
     let b;
     let config;
     if (args[0] instanceof FluencePeer) {
         peer = args[0];
         b = args[1];
config = args[2];
     } else {
         peer = FluencePeer.default;
         b = args[0];
config = args[1];
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
    (call %init_peer_id% ("getDataSrv" "b") [] b)
   )
   (call %init_peer_id% ("opa" "identity") [b] c)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [c])
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
                h.on('getDataSrv', 'b', async () => {return b;});
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
                reject('Request timed out for a');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return promise;
}
      


 export async function d(e: string, config?: {ttl?: number}) : Promise<string>;
 export async function d(peer: FluencePeer, e: string, config?: {ttl?: number}) : Promise<string>;
 export async function d(...args) {
     let peer: FluencePeer;
     let e;
     let config;
     if (args[0] instanceof FluencePeer) {
         peer = args[0];
         e = args[1];
config = args[2];
     } else {
         peer = FluencePeer.default;
         e = args[0];
config = args[1];
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
    (call %init_peer_id% ("getDataSrv" "e") [] e)
   )
   (call %init_peer_id% ("opa" "identity") [e] c)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [c])
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
                h.on('getDataSrv', 'e', async () => {return e;});
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
                reject('Request timed out for d');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return promise;
}
      
