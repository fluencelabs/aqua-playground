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

export interface Op2Def {
    identity: (s: number, callParams: CallParams<'s'>) => void;
}

export function registerOp2(service: Op2Def): void;
export function registerOp2(serviceId: string, service: Op2Def): void;
export function registerOp2(peer: FluencePeer, service: Op2Def): void;
export function registerOp2(peer: FluencePeer, serviceId: string, service: Op2Def): void;
export function registerOp2(...args) {
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
    } else {
        serviceId = 'op';
    }

    if (!(args[0] instanceof FluencePeer) && typeof args[0] === 'object') {
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

        if (req.fnName === 'identity') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            service.identity(req.args[0], callParams);
            resp.result = {};
        }

        next();
    });
}

// Functions

export function getTwoResults(relay: string, config?: { ttl?: number }): Promise<number[]>;
export function getTwoResults(peer: FluencePeer, relay: string, config?: { ttl?: number }): Promise<number[]>;
export function getTwoResults(...args) {
    let peer: FluencePeer;
    let relay;
    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        relay = args[1];
        config = args[2];
    } else {
        peer = FluencePeer.default;
        relay = args[0];
        config = args[1];
    }

    let request: RequestFlow;
    const promise = new Promise<number[]>((resolve, reject) => {
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
      (call %init_peer_id% ("getDataSrv" "relay") [] relay)
     )
     (call -relay- ("op" "noop") [])
    )
    (xor
     (seq
      (seq
       (seq
        (seq
         (seq
          (call relay ("op" "string_to_b58") [%init_peer_id%] k)
          (call relay ("kad" "neighborhood") [k [] []] nodes)
         )
         (fold nodes n
          (par
           (seq
            (xor
             (call n ("peer" "timestamp_sec") [] $res)
             (null)
            )
            (call relay ("op" "noop") [])
           )
           (next n)
          )
         )
        )
        (call relay ("op" "identity") [$res.$.[0]!])
       )
       (call relay ("op" "identity") [$res.$.[1]!])
      )
      (call relay ("op" "identity") [$res.$.[2]!])
     )
     (seq
      (call -relay- ("op" "noop") [])
      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
     )
    )
   )
   (call -relay- ("op" "noop") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$res])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.connectionInfo.connectedRelay;
                });
                h.on('getDataSrv', 'relay', () => {
                    return relay;
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
                reject('Request timed out for getTwoResults');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
