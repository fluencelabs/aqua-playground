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

export interface OpADef {
    get_str: (callParams: CallParams<null>) => string;
}
export function registerOpA(service: OpADef): void;
export function registerOpA(serviceId: string, service: OpADef): void;
export function registerOpA(peer: FluencePeer, service: OpADef): void;
export function registerOpA(peer: FluencePeer, serviceId: string, service: OpADef): void;
       

export function registerOpA(...args: any) {
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
        serviceId = "pop"
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

    const incorrectServiceDefinitions = missingFields(service, ['get_str']);
    if (!!incorrectServiceDefinitions.length) {
        throw new Error("Error registering service OpA: missing functions: " + incorrectServiceDefinitions.map((d) => "'" + d + "'").join(", "))
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }

        if (req.fnName === 'get_str') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.get_str(callParams)
        }

        next();
    });
}
      
// Functions
 

export function get_results(config?: {ttl?: number}): Promise<string[]>;
export function get_results(peer: FluencePeer, config?: {ttl?: number}): Promise<string[]>;
export function get_results(...args: any) {
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
    const promise = new Promise<string[]>((resolve, reject) => {
        const r = new RequestFlowBuilder()
                .disableInjections()
                .withRawScript(`
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (ap "hello" $results)
                        )
                        (call %init_peer_id% ("pop" "get_str") [] str)
                       )
                       (ap str $results)
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [$results])
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
                    reject('Request timed out for get_results');
                })

                if (config && config.ttl) {
                    r.withTTL(config.ttl)
                }

                request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
