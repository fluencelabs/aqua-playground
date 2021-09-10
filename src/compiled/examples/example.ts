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

export interface PeerDef {
    is_connected: (arg0: string, callParams: CallParams<'arg0'>) => boolean;
}

export function registerPeer(service: PeerDef): void;
export function registerPeer(serviceId: string, service: PeerDef): void;
export function registerPeer(peer: FluencePeer, service: PeerDef): void;
export function registerPeer(peer: FluencePeer, serviceId: string, service: PeerDef): void;
export function registerPeer(...args: any) {
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
        serviceId = 'peer';
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

        if (req.fnName === 'is_connected') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    arg0: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.is_connected(req.args[0], callParams);
        }

        next();
    });
}

export interface OpDef {
    identity: (callParams: CallParams<null>) => void;
}

export function registerOp(service: OpDef): void;
export function registerOp(serviceId: string, service: OpDef): void;
export function registerOp(peer: FluencePeer, service: OpDef): void;
export function registerOp(peer: FluencePeer, serviceId: string, service: OpDef): void;
export function registerOp(...args: any) {
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
        serviceId = 'op';
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

        if (req.fnName === 'identity') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            service.identity(callParams);
            resp.result = {};
        }

        next();
    });
}

export interface TestDef {
    doSomething: (callParams: CallParams<null>) => boolean;
    getUserList: (callParams: CallParams<null>) => { name: string; peer_id: string; relay_id: string }[];
}

export function registerTest(service: TestDef): void;
export function registerTest(serviceId: string, service: TestDef): void;
export function registerTest(peer: FluencePeer, service: TestDef): void;
export function registerTest(peer: FluencePeer, serviceId: string, service: TestDef): void;
export function registerTest(...args: any) {
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
        serviceId = 'test';
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

        if (req.fnName === 'doSomething') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.doSomething(callParams);
        }

        if (req.fnName === 'getUserList') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.getUserList(callParams);
        }

        next();
    });
}

// Functions

export function betterMessage(relay: string, config?: { ttl?: number }): Promise<void>;
export function betterMessage(peer: FluencePeer, relay: string, config?: { ttl?: number }): Promise<void>;
export function betterMessage(...args: any) {
    let peer: FluencePeer;
    let relay: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        relay = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        relay = args[0];
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
   (seq
    (seq
     (seq
      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
      (call %init_peer_id% ("getDataSrv" "relay") [] relay)
     )
     (call -relay- ("op" "noop") [])
    )
    (xor
     (call relay ("peer" "is_connected") [relay] isOnline)
     (seq
      (call -relay- ("op" "noop") [])
      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
     )
    )
   )
   (call -relay- ("op" "noop") [])
  )
  (xor
   (match isOnline true
    (xor
     (call %init_peer_id% ("test" "doSomething") [])
     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
    )
   )
   (null)
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'relay', () => {
                    return relay;
                });
                h.onEvent('callbackSrv', 'response', (args) => {});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for betterMessage');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
