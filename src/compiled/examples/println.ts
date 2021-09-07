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

 export interface PrintlnDef {
     print: (arg0: string, callParams: CallParams<'arg0'>) => Promise<void> | void;
 }

 export function registerPrintln(service: PrintlnDef): void;
export function registerPrintln(serviceId: string, service: PrintlnDef): void;
export function registerPrintln(peer: FluencePeer, service: PrintlnDef): void;
export function registerPrintln(peer: FluencePeer, serviceId: string, service: PrintlnDef): void;
 export function registerPrintln(...args) {
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
     serviceId = "println-service-id"
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
  
          
 if (req.fnName === 'print') {
     
 const callParams = {
     ...req.particleContext,
     tetraplets: {
         arg0: req.tetraplets[0]
     },
 };
 resp.retCode = ResultCodes.success;
 await service.print(req.args[0], callParams); resp.result = {}

 }
    
  
          await next();
      });
 }
      

// Functions

 export async function print(str: string, config?: {ttl?: number}) : Promise<void>;
 export async function print(peer: FluencePeer, str: string, config?: {ttl?: number}) : Promise<void>;
 export async function print(...args) {
     let peer: FluencePeer;
     let str;
     let config;
     if (args[0] instanceof FluencePeer) {
         peer = args[0];
         str = args[1];
config = args[2];
     } else {
         peer = FluencePeer.default;
         str = args[0];
config = args[1];
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
   (call %init_peer_id% ("getDataSrv" "str") [] str)
  )
  (call %init_peer_id% ("println-service-id" "print") [str])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
)

                 `,
                 )
                 .configHandler((h) => {
                     h.on('getDataSrv', '-relay-', async () => {
                    return peer.connectionInfo.connectedRelays[0] || null;
                });
                h.on('getDataSrv', 'str', async () => {return str;});
                h.onEvent('callbackSrv', 'response', async (args) => {
  
});

                h.onEvent('errorHandlingSrv', 'error', async (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for print');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
      
