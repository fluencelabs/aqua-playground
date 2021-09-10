/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.0-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    ResultCodes,
    RequestFlow,
    RequestFlowBuilder,
    CallParams,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v1';

// Services

export interface ConcatSubsDef {
    get_some: (
        s: string,
        sr: { one: string; two: number },
        callParams: CallParams<'s' | 'sr'>,
    ) => { one: string; two: number };
}

export function registerConcatSubs(service: ConcatSubsDef): void;
export function registerConcatSubs(serviceId: string, service: ConcatSubsDef): void;
export function registerConcatSubs(peer: FluencePeer, service: ConcatSubsDef): void;
export function registerConcatSubs(peer: FluencePeer, serviceId: string, service: ConcatSubsDef): void;
export function registerConcatSubs(...args: any) {
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
        serviceId = 'concat_subs';
    }

    // Figuring out which overload is the service.
    // If the first argument is not Fluence Peer and it is an object, then it can only be the service def
    // If the first argument is peer, we are checking further. The second argument might either be
    // an object, that it must be the service object
    // or a string, which is the service id. In that case the service is the third argument
    if (!FluencePeer.isInstance(args[0]) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }

        if (req.fnName === 'get_some') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                    sr: req.tetraplets[1],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.get_some(req.args[0], req.args[1], callParams);
        }

        next();
    });
}

// Functions

export function subImportUsage(s: string, config?: { ttl?: number }): Promise<{ one: string; two: number }>;
export function subImportUsage(
    peer: FluencePeer,
    s: string,
    config?: { ttl?: number },
): Promise<{ one: string; two: number }>;
export function subImportUsage(...args: any) {
    let peer: FluencePeer;
    let s: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        s = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        s = args[0];
        config = args[1];
    }

    let request: RequestFlow;
    const promise = new Promise<{ one: string; two: number }>((resolve, reject) => {
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
      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
      (call %init_peer_id% ("getDataSrv" "s") [] s)
     )
     (call %init_peer_id% ("sub_service" "sub") [s] sr1)
    )
    (call %init_peer_id% ("sub_service" "sub") ["some thing"] res)
   )
   (call %init_peer_id% ("concat_subs" "get_some") [sr1.$.one! res] result)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [result])
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
                h.on('getDataSrv', 's', () => {
                    return s;
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
                reject('Request timed out for subImportUsage');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
