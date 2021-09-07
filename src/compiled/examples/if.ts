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

// Functions

export function ifElseCall(condition: boolean, config?: { ttl?: number }): Promise<void>;
export function ifElseCall(peer: FluencePeer, condition: boolean, config?: { ttl?: number }): Promise<void>;
export function ifElseCall(...args) {
    let peer: FluencePeer;
    let condition;
    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        condition = args[1];
        config = args[2];
    } else {
        peer = FluencePeer.default;
        condition = args[0];
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
   (call %init_peer_id% ("getDataSrv" "condition") [] condition)
  )
  (xor
   (match condition true
    (xor
     (call %init_peer_id% ("println-service-id" "print") ["it is true"])
     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
    )
   )
   (call %init_peer_id% ("println-service-id" "print") ["it is false"])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.connectionInfo.connectedRelay;
                });
                h.on('getDataSrv', 'condition', () => {
                    return condition;
                });
                h.onEvent('callbackSrv', 'response', (args) => {});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for ifElseCall');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}

export function ifElseNumCall(condition: number, config?: { ttl?: number }): Promise<void>;
export function ifElseNumCall(peer: FluencePeer, condition: number, config?: { ttl?: number }): Promise<void>;
export function ifElseNumCall(...args) {
    let peer: FluencePeer;
    let condition;
    let config;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        condition = args[1];
        config = args[2];
    } else {
        peer = FluencePeer.default;
        condition = args[0];
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
   (call %init_peer_id% ("getDataSrv" "condition") [] condition)
  )
  (xor
   (match condition 1
    (xor
     (call %init_peer_id% ("println-service-id" "print") ["it is 1"])
     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
    )
   )
   (call %init_peer_id% ("println-service-id" "print") ["it is not 1"])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.connectionInfo.connectedRelay;
                });
                h.on('getDataSrv', 'condition', () => {
                    return condition;
                });
                h.onEvent('callbackSrv', 'response', (args) => {});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for ifElseNumCall');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
