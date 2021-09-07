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

 export interface ParServiceDef {
     call: (callParams: CallParams<null>) => Promise<string> | string;
 }

 export function registerParService(service: ParServiceDef): void;
export function registerParService(serviceId: string, service: ParServiceDef): void;
export function registerParService(peer: FluencePeer, service: ParServiceDef): void;
export function registerParService(peer: FluencePeer, serviceId: string, service: ParServiceDef): void;
 export function registerParService(...args) {
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
     serviceId = "parservice-id"
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
  
          
 if (req.fnName === 'call') {
     
 const callParams = {
     ...req.particleContext,
     tetraplets: {
         
     },
 };
 resp.retCode = ResultCodes.success;
 resp.result = await service.call(callParams)

 }
    
  
          await next();
      });
 }
      

// Functions

 export async function parFunc(node: string, c: (arg0: {external_addresses:string[]}, callParams: CallParams<'arg0'>) => Promise<void> | void, config?: {ttl?: number}) : Promise<void>;
 export async function parFunc(peer: FluencePeer, node: string, c: (arg0: {external_addresses:string[]}, callParams: CallParams<'arg0'>) => Promise<void> | void, config?: {ttl?: number}) : Promise<void>;
 export async function parFunc(...args) {
     let peer: FluencePeer;
     let node;
let c;
     let config;
     if (args[0] instanceof FluencePeer) {
         peer = args[0];
         node = args[1];
c = args[2];
config = args[3];
     } else {
         peer = FluencePeer.default;
         node = args[0];
c = args[1];
config = args[2];
     }
    
     let request: RequestFlow;
     const promise = new Promise<void>((resolve, reject) => {
         const r = new RequestFlowBuilder()
                 .disableInjections()
                 .withRawScript(
                     `
     (xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("getDataSrv" "node") [] node)
  )
  (par
   (par
    (call %init_peer_id% ("parservice-id" "call") [] y)
    (seq
     (call -relay- ("op" "noop") [])
     (xor
      (seq
       (seq
        (call node ("peer" "identify") [] t)
        (call -relay- ("op" "noop") [])
       )
       (xor
        (call %init_peer_id% ("callbackSrv" "c") [t])
        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
       )
      )
      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
     )
    )
   )
   (call %init_peer_id% ("parservice-id" "call") [] x)
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
)

                 `,
                 )
                 .configHandler((h) => {
                     h.on('getDataSrv', '-relay-', async () => {
                    return peer.connectionInfo.connectedRelays[0] || null;
                });
                h.on('getDataSrv', 'node', async () => {return node;});

 h.use(async (req, resp, next) => {
 if(req.serviceId === 'callbackSrv' && req.fnName === 'c') {
     
 const callParams = {
     ...req.particleContext,
     tetraplets: {
         arg0: req.tetraplets[0]
     },
 };
 resp.retCode = ResultCodes.success;
 await c(req.args[0], callParams); resp.result = {}

 }
 await next();
 });
        
                h.onEvent('callbackSrv', 'response', async (args) => {
  
});

                h.onEvent('errorHandlingSrv', 'error', async (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for parFunc');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
      
