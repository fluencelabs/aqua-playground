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

export interface AquaDHTDef {
    put_host_value: (key: string, value: string, service_id: string[], callParams: CallParams<'key' | 'value' | 'service_id'>) => string;
}
export function registerAquaDHT(service: AquaDHTDef): void;
export function registerAquaDHT(serviceId: string, service: AquaDHTDef): void;
export function registerAquaDHT(peer: FluencePeer, service: AquaDHTDef): void;
export function registerAquaDHT(peer: FluencePeer, serviceId: string, service: AquaDHTDef): void;
       

export function registerAquaDHT(...args: any) {
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
        serviceId = "test-dht"
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

    const incorrectServiceDefinitions = missingFields(service, ['put_host_value']);
    if (!!incorrectServiceDefinitions.length) {
        throw new Error("Error registering service AquaDHT: missing functions: " + incorrectServiceDefinitions.map((d) => "'" + d + "'").join(", "))
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }

        if (req.fnName === 'put_host_value') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    key: req.tetraplets[0],value: req.tetraplets[1],service_id: req.tetraplets[2]
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.put_host_value(req.args[0], req.args[1], req.args[2], callParams)
        }

        next();
    });
}
      
// Functions
 

export function putHostValue(key: string, value: string, service_id: string | null, config?: {ttl?: number}): Promise<string>;
export function putHostValue(peer: FluencePeer, key: string, value: string, service_id: string | null, config?: {ttl?: number}): Promise<string>;
export function putHostValue(...args: any) {
    let peer: FluencePeer;
    let key: any;
    let value: any;
    let service_id: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        key = args[1];
        value = args[2];
        service_id = args[3];
        config = args[4];
    } else {
        peer = Fluence.getPeer();
        key = args[0];
        value = args[1];
        service_id = args[2];
        config = args[3];
    }

    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
                .disableInjections()
                .withRawScript(`
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                          (call %init_peer_id% ("getDataSrv" "key") [] key)
                         )
                         (call %init_peer_id% ("getDataSrv" "value") [] value)
                        )
                        (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
                       )
                       (call %init_peer_id% ("test-dht" "put_host_value") [key value service_id] res)
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
                        return peer.getStatus().relayPeerId;
                    });
                    h.on('getDataSrv', 'key', () => {return key;});
                    h.on('getDataSrv', 'value', () => {return value;});
                    h.on('getDataSrv', 'service_id', () => {return service_id === null ? [] : [service_id];});
                    h.onEvent('callbackSrv', 'response', (args) => {
                        const [res] = args;
                        resolve(res);
                    });
                    h.onEvent('errorHandlingSrv', 'error', (args) => {
                        const [err] = args;
                        reject(err);
                    });
                })
                .handleScriptError(reject)
                .handleTimeout(() => {
                    reject('Request timed out for putHostValue');
                })

                if (config && config.ttl) {
                    r.withTTL(config.ttl)
                }

                request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

 

export function create_client_util(service_id: string, config?: {ttl?: number}): Promise<string>;
export function create_client_util(peer: FluencePeer, service_id: string, config?: {ttl?: number}): Promise<string>;
export function create_client_util(...args: any) {
    let peer: FluencePeer;
    let service_id: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        service_id = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        service_id = args[0];
        config = args[1];
    }

    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
                .disableInjections()
                .withRawScript(`
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
                       )
                       (call %init_peer_id% ("test-dht" "put_host_value") ["client-util" service_id []] res)
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
                        return peer.getStatus().relayPeerId;
                    });
                    h.on('getDataSrv', 'service_id', () => {return service_id;});
                    h.onEvent('callbackSrv', 'response', (args) => {
                        const [res] = args;
                        resolve(res);
                    });
                    h.onEvent('errorHandlingSrv', 'error', (args) => {
                        const [err] = args;
                        reject(err);
                    });
                })
                .handleScriptError(reject)
                .handleTimeout(() => {
                    reject('Request timed out for create_client_util');
                })

                if (config && config.ttl) {
                    r.withTTL(config.ttl)
                }

                request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
