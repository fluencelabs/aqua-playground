/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.0-SNAPSHOT
 *
 */
import Fluence, { FluencePeer } from '@fluencelabs/fluence';
import {
    ResultCodes,
    RequestFlow,
    RequestFlowBuilder,
    CallParams,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v1';

// Services

export interface TestSrvDef {
    str: (callParams: CallParams<null>) => string;
}

export function registerTestSrv(service: TestSrvDef): void;
export function registerTestSrv(serviceId: string, service: TestSrvDef): void;
export function registerTestSrv(peer: FluencePeer, service: TestSrvDef): void;
export function registerTestSrv(peer: FluencePeer, serviceId: string, service: TestSrvDef): void;
export function registerTestSrv(...args: any) {
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
        serviceId = 'test-service-id';
    }

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

        if (req.fnName === 'str') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.str(callParams);
        }

        next();
    });
}

// Functions

export function testFunc(config?: { ttl?: number }): Promise<string>;
export function testFunc(peer: FluencePeer, config?: { ttl?: number }): Promise<string>;
export function testFunc(...args: any) {
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
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("test-service-id" "str") [] res)
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
                reject('Request timed out for testFunc');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
