/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.2-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    ResultCodes,
    RequestFlow,
    RequestFlowBuilder,
    CallParams
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v1';


function missingFields(obj: any, fields: string[]): string[] {
    return fields.filter(f => !(f in obj))
}

// Services

export interface GetStrDef {
    retStr: (arg0: string, callParams: CallParams<'arg0'>) => string;
}
export function registerGetStr(service: GetStrDef): void;
export function registerGetStr(serviceId: string, service: GetStrDef): void;
export function registerGetStr(peer: FluencePeer, service: GetStrDef): void;
export function registerGetStr(peer: FluencePeer, serviceId: string, service: GetStrDef): void;
       

export function registerGetStr(...args: any) {
    let peer: FluencePeer;
    let serviceId: any;
    let service: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
    } else {
        peer = Fluence.getPeer();
    }

    if (typeof args[0] === 'string') {
        serviceId = args[0];
    } else if (typeof args[1] === 'string') {
        serviceId = args[1];
    } else {
        serviceId = "multiret-test"
    }

    // Figuring out which overload is the service.
    // If the first argument is not Fluence Peer and it is an object, then it can only be the service def
    // If the first argument is peer, we are checking further. The second argument might either be
    // an object, that it must be the service object
    // or a string, which is the service id. In that case the service is the third argument
    if (!(FluencePeer.isInstance(args[0])) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    const incorrectServiceDefinitions = missingFields(service, ['retStr']);
    if (!!incorrectServiceDefinitions.length) {
        throw new Error("Error registering service GetStr: missing functions: " + incorrectServiceDefinitions.map((d) => "'" + d + "'").join(", "))
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }

        if (req.fnName === 'retStr') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    arg0: req.tetraplets[0]
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.retStr(req.args[0], callParams)
        }

        next();
    });
}
      


export interface GetNumDef {
    retNum: (callParams: CallParams<null>) => number;
}
export function registerGetNum(service: GetNumDef): void;
export function registerGetNum(serviceId: string, service: GetNumDef): void;
export function registerGetNum(peer: FluencePeer, service: GetNumDef): void;
export function registerGetNum(peer: FluencePeer, serviceId: string, service: GetNumDef): void;
       

export function registerGetNum(...args: any) {
    let peer: FluencePeer;
    let serviceId: any;
    let service: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
    } else {
        peer = Fluence.getPeer();
    }

    if (typeof args[0] === 'string') {
        serviceId = args[0];
    } else if (typeof args[1] === 'string') {
        serviceId = args[1];
    } else {
        serviceId = "multiret-num"
    }

    // Figuring out which overload is the service.
    // If the first argument is not Fluence Peer and it is an object, then it can only be the service def
    // If the first argument is peer, we are checking further. The second argument might either be
    // an object, that it must be the service object
    // or a string, which is the service id. In that case the service is the third argument
    if (!(FluencePeer.isInstance(args[0])) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    const incorrectServiceDefinitions = missingFields(service, ['retNum']);
    if (!!incorrectServiceDefinitions.length) {
        throw new Error("Error registering service GetNum: missing functions: " + incorrectServiceDefinitions.map((d) => "'" + d + "'").join(", "))
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }

        if (req.fnName === 'retNum') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.retNum(callParams)
        }

        next();
    });
}
      
// Functions
 
export type TupleFuncResult = [string, number]
export function tupleFunc(config?: {ttl?: number}): Promise<TupleFuncResult>;
export function tupleFunc(peer: FluencePeer, config?: {ttl?: number}): Promise<TupleFuncResult>;
export function tupleFunc(...args: any) {
    let peer: FluencePeer;

    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        config = args[1];
    } else {
        peer = Fluence.getPeer();
        config = args[0];
    }

    let request: RequestFlow;
    const promise = new Promise<TupleFuncResult>((resolve, reject) => {
        const r = new RequestFlowBuilder()
                .disableInjections()
                .withRawScript(`
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
                        return peer.getStatus().relayPeerId;
                    });

                    h.onEvent('callbackSrv', 'response', (args) => {
                    let opt: any = args;

                    return resolve(opt);
                    });
                    h.onEvent('errorHandlingSrv', 'error', (args) => {
                        const [err] = args;
                        reject(err);
                    });
                })
                .handleScriptError(reject)
                .handleTimeout(() => {
                    reject('Request timed out for tupleFunc');
                })

                if (config && config.ttl) {
                    r.withTTL(config.ttl)
                }

                request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

 
export type MultiReturnFuncResult = [string[], number, string, number[], string | null, number]
export function multiReturnFunc(somethingToReturn: number[], smthOption: string | null, config?: {ttl?: number}): Promise<MultiReturnFuncResult>;
export function multiReturnFunc(peer: FluencePeer, somethingToReturn: number[], smthOption: string | null, config?: {ttl?: number}): Promise<MultiReturnFuncResult>;
export function multiReturnFunc(...args: any) {
    let peer: FluencePeer;
    let somethingToReturn: any;
    let smthOption: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        somethingToReturn = args[1];
        smthOption = args[2];
        config = args[3];
    } else {
        peer = Fluence.getPeer();
        somethingToReturn = args[0];
        smthOption = args[1];
        config = args[2];
    }

    let request: RequestFlow;
    const promise = new Promise<MultiReturnFuncResult>((resolve, reject) => {
        const r = new RequestFlowBuilder()
                .disableInjections()
                .withRawScript(`
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
                        return peer.getStatus().relayPeerId;
                    });
                    h.on('getDataSrv', 'somethingToReturn', () => {return somethingToReturn;});
                    h.on('getDataSrv', 'smthOption', () => {return smthOption === null ? [] : [smthOption];});
                    h.onEvent('callbackSrv', 'response', (args) => {
                    let opt: any = args;
                        if( Array.isArray(opt[4])) {
                            if (opt[4].length === 0) { opt[4] = null; }
                            else {opt[4] = opt[4][0]; }
                        }
                    return resolve(opt);
                    });
                    h.onEvent('errorHandlingSrv', 'error', (args) => {
                        const [err] = args;
                        reject(err);
                    });
                })
                .handleScriptError(reject)
                .handleTimeout(() => {
                    reject('Request timed out for multiReturnFunc');
                })

                if (config && config.ttl) {
                    r.withTTL(config.ttl)
                }

                request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
