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

export interface TestSDef {
    multiline: (a: string, b: string, c: boolean, callParams: CallParams<'a' | 'b' | 'c'>) => string;
    t: (arg0: string, callParams: CallParams<'arg0'>) => string;
}

export function registerTestS(service: TestSDef): void;
export function registerTestS(serviceId: string, service: TestSDef): void;
export function registerTestS(peer: FluencePeer, service: TestSDef): void;
export function registerTestS(peer: FluencePeer, serviceId: string, service: TestSDef): void;
export function registerTestS(...args: any) {
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
        serviceId = 'some-id';
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

        if (req.fnName === 'multiline') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    a: req.tetraplets[0],
                    b: req.tetraplets[1],
                    c: req.tetraplets[2],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.multiline(req.args[0], req.args[1], req.args[2], callParams);
        }

        if (req.fnName === 't') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    arg0: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.t(req.args[0], callParams);
        }

        next();
    });
}

// Functions

export function doStuff(
    a: string,
    b: string,
    c: boolean,
    d: boolean,
    e: string[],
    g: string[],
    str: string,
    config?: { ttl?: number },
): Promise<string[]>;
export function doStuff(
    peer: FluencePeer,
    a: string,
    b: string,
    c: boolean,
    d: boolean,
    e: string[],
    g: string[],
    str: string,
    config?: { ttl?: number },
): Promise<string[]>;
export function doStuff(...args: any) {
    let peer: FluencePeer;
    let a: any;
    let b: any;
    let c: any;
    let d: any;
    let e: any;
    let g: any;
    let str: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        a = args[1];
        b = args[2];
        c = args[3];
        d = args[4];
        e = args[5];
        g = args[6];
        str = args[7];
        config = args[8];
    } else {
        peer = Fluence.getPeer();
        a = args[0];
        b = args[1];
        c = args[2];
        d = args[3];
        e = args[4];
        g = args[5];
        str = args[6];
        config = args[7];
    }

    let request: RequestFlow;
    const promise = new Promise<string[]>((resolve, reject) => {
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
      (seq
       (seq
        (seq
         (seq
          (seq
           (seq
            (seq
             (seq
              (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
              (call %init_peer_id% ("getDataSrv" "a") [] a)
             )
             (call %init_peer_id% ("getDataSrv" "b") [] b)
            )
            (call %init_peer_id% ("getDataSrv" "c") [] c)
           )
           (call %init_peer_id% ("getDataSrv" "d") [] d)
          )
          (call %init_peer_id% ("getDataSrv" "e") [] e)
         )
         (call %init_peer_id% ("getDataSrv" "g") [] g)
        )
        (call %init_peer_id% ("getDataSrv" "str") [] str)
       )
       (par
        (par
         (seq
          (seq
           (call %init_peer_id% ("some-id" "t") [str] $stream)
           (call -relay- ("op" "noop") [])
          )
          (call b ("op" "noop") [])
         )
         (call %init_peer_id% ("println-service-id" "print") [a])
        )
        (seq
         (call -relay- ("op" "noop") [])
         (xor
          (call a ("peer" "identify") [])
          (seq
           (seq
            (call -relay- ("op" "noop") [])
            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
           )
           (call -relay- ("op" "noop") [])
          )
         )
        )
       )
      )
      (call -relay- ("op" "noop") [])
     )
     (xor
      (seq
       (call -relay- ("op" "noop") [])
       (xor
        (match c true
         (xor
          (match d true
           (xor
            (fold e eEl
             (seq
              (seq
               (fold g gEl
                (seq
                 (seq
                  (call b ("some-id" "t") [gEl] $stream)
                  (call b ("some-id" "t") [eEl] $stream)
                 )
                 (next gEl)
                )
               )
               (call b ("some-id" "t") [eEl] $stream)
              )
              (next eEl)
             )
            )
            (seq
             (call -relay- ("op" "noop") [])
             (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
            )
           )
          )
          (null)
         )
        )
        (null)
       )
      )
      (seq
       (call -relay- ("op" "noop") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
      )
     )
    )
    (call -relay- ("op" "noop") [])
   )
   (call %init_peer_id% ("some-id" "multiline") [a b c] $stream)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$stream])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'a', () => {
                    return a;
                });
                h.on('getDataSrv', 'b', () => {
                    return b;
                });
                h.on('getDataSrv', 'c', () => {
                    return c;
                });
                h.on('getDataSrv', 'd', () => {
                    return d;
                });
                h.on('getDataSrv', 'e', () => {
                    return e;
                });
                h.on('getDataSrv', 'g', () => {
                    return g;
                });
                h.on('getDataSrv', 'str', () => {
                    return str;
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
                reject('Request timed out for doStuff');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
