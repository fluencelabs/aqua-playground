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

// Functions

export function put_value(initial_peer: string, value: string, config?: { ttl?: number }): Promise<string>;
export function put_value(
    peer: FluencePeer,
    initial_peer: string,
    value: string,
    config?: { ttl?: number },
): Promise<string>;
export function put_value(...args: any) {
    let peer: FluencePeer;
    let initial_peer: any;
    let value: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        initial_peer = args[1];
        value = args[2];
        config = args[3];
    } else {
        peer = Fluence.getPeer();
        initial_peer = args[0];
        value = args[1];
        config = args[2];
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
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "initial_peer") [] initial_peer)
       )
       (call %init_peer_id% ("getDataSrv" "value") [] value)
      )
      (call -relay- ("op" "noop") [])
     )
     (xor
      (seq
       (call initial_peer ("op" "string_to_b58") ["some-const3"] k)
       (call initial_peer ("kad" "neighborhood") [k [] []] nodes)
      )
      (seq
       (call -relay- ("op" "noop") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
      )
     )
    )
    (call -relay- ("op" "noop") [])
   )
   (fold nodes n
    (par
     (xor
      (seq
       (seq
        (call n ("peer" "timestamp_sec") [] t)
        (call n ("aqua-dht" "register_key") ["some-const3" t false 0])
       )
       (call n ("aqua-dht" "put_value") ["some-const3" value t [] [] 0])
      )
      (null)
     )
     (seq
      (call -relay- ("op" "noop") [])
      (next n)
     )
    )
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") ["OK"])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
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
                h.on('getDataSrv', 'initial_peer', () => {
                    return initial_peer;
                });
                h.on('getDataSrv', 'value', () => {
                    return value;
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
                reject('Request timed out for put_value');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function registerKeyPutValue(
    node_id: string,
    key: string,
    value: string,
    relay_id: string | null,
    service_id: string | null,
    config?: { ttl?: number },
): Promise<string[]>;
export function registerKeyPutValue(
    peer: FluencePeer,
    node_id: string,
    key: string,
    value: string,
    relay_id: string | null,
    service_id: string | null,
    config?: { ttl?: number },
): Promise<string[]>;
export function registerKeyPutValue(...args: any) {
    let peer: FluencePeer;
    let node_id: any;
    let key: any;
    let value: any;
    let relay_id: any;
    let service_id: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        node_id = args[1];
        key = args[2];
        value = args[3];
        relay_id = args[4];
        service_id = args[5];
        config = args[6];
    } else {
        peer = Fluence.getPeer();
        node_id = args[0];
        key = args[1];
        value = args[2];
        relay_id = args[3];
        service_id = args[4];
        config = args[5];
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
           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
           (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
          )
          (call %init_peer_id% ("getDataSrv" "key") [] key)
         )
         (call %init_peer_id% ("getDataSrv" "value") [] value)
        )
        (call %init_peer_id% ("getDataSrv" "relay_id") [] relay_id)
       )
       (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
      )
      (call -relay- ("op" "noop") [])
     )
     (xor
      (seq
       (call key ("op" "string_to_b58") [node_id] k)
       (call key ("kad" "neighborhood") [k [] []] nodes)
      )
      (seq
       (call -relay- ("op" "noop") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
      )
     )
    )
    (call -relay- ("op" "noop") [])
   )
   (fold nodes n
    (par
     (xor
      (call n ("peer" "timestamp_sec") [] t)
      (seq
       (call -relay- ("op" "noop") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
      )
     )
     (seq
      (call -relay- ("op" "noop") [])
      (next n)
     )
    )
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [nodes])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'node_id', () => {
                    return node_id;
                });
                h.on('getDataSrv', 'key', () => {
                    return key;
                });
                h.on('getDataSrv', 'value', () => {
                    return value;
                });
                h.on('getDataSrv', 'relay_id', () => {
                    return relay_id === null ? [] : [relay_id];
                });
                h.on('getDataSrv', 'service_id', () => {
                    return service_id === null ? [] : [service_id];
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
                reject('Request timed out for registerKeyPutValue');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function getNeighbours(node_id: string, topic: string, config?: { ttl?: number }): Promise<string[]>;
export function getNeighbours(
    peer: FluencePeer,
    node_id: string,
    topic: string,
    config?: { ttl?: number },
): Promise<string[]>;
export function getNeighbours(...args: any) {
    let peer: FluencePeer;
    let node_id: any;
    let topic: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        node_id = args[1];
        topic = args[2];
        config = args[3];
    } else {
        peer = Fluence.getPeer();
        node_id = args[0];
        topic = args[1];
        config = args[2];
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
       (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
       (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
      )
      (call %init_peer_id% ("getDataSrv" "topic") [] topic)
     )
     (call -relay- ("op" "noop") [])
    )
    (xor
     (seq
      (call node_id ("op" "string_to_b58") [topic] k)
      (call node_id ("kad" "neighborhood") [k [] []] nodes)
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
   (call %init_peer_id% ("callbackSrv" "response") [nodes])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
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
                h.on('getDataSrv', 'node_id', () => {
                    return node_id;
                });
                h.on('getDataSrv', 'topic', () => {
                    return topic;
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
                reject('Request timed out for getNeighbours');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function findSubscribers(
    node_id: string,
    topic: string,
    config?: { ttl?: number },
): Promise<
    {
        peer_id: string;
        relay_id: string[];
        service_id: string[];
        set_by: string;
        timestamp_created: number;
        value: string;
        weight: number;
    }[]
>;
export function findSubscribers(
    peer: FluencePeer,
    node_id: string,
    topic: string,
    config?: { ttl?: number },
): Promise<
    {
        peer_id: string;
        relay_id: string[];
        service_id: string[];
        set_by: string;
        timestamp_created: number;
        value: string;
        weight: number;
    }[]
>;
export function findSubscribers(...args: any) {
    let peer: FluencePeer;
    let node_id: any;
    let topic: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        node_id = args[1];
        topic = args[2];
        config = args[3];
    } else {
        peer = Fluence.getPeer();
        node_id = args[0];
        topic = args[1];
        config = args[2];
    }

    let request: RequestFlow;
    const promise = new Promise<
        {
            peer_id: string;
            relay_id: string[];
            service_id: string[];
            set_by: string;
            timestamp_created: number;
            value: string;
            weight: number;
        }[]
    >((resolve, reject) => {
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
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
         )
         (call %init_peer_id% ("getDataSrv" "topic") [] topic)
        )
        (call -relay- ("op" "noop") [])
       )
       (xor
        (seq
         (call node_id ("op" "string_to_b58") [topic] k)
         (call node_id ("kad" "neighborhood") [k [] []] nodes)
        )
        (seq
         (seq
          (call -relay- ("op" "noop") [])
          (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
         )
         (call -relay- ("op" "noop") [])
        )
       )
      )
      (call -relay- ("op" "noop") [])
     )
     (fold nodes n
      (par
       (seq
        (xor
         (seq
          (call n ("peer" "timestamp_sec") [] t)
          (call n ("aqua-dht" "get_values") [topic t] $res)
         )
         (null)
        )
        (call node_id ("op" "noop") [])
       )
       (seq
        (call -relay- ("op" "noop") [])
        (next n)
       )
      )
     )
    )
    (xor
     (call node_id ("aqua-dht" "merge_two") [$res.$.[0].result! $res.$.[1].result!] v)
     (seq
      (call -relay- ("op" "noop") [])
      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
     )
    )
   )
   (call -relay- ("op" "noop") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [v.$.result!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'node_id', () => {
                    return node_id;
                });
                h.on('getDataSrv', 'topic', () => {
                    return topic;
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
                reject('Request timed out for findSubscribers');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function initTopicAndSubscribe(
    node_id: string,
    topic: string,
    value: string,
    relay_id: string | null,
    service_id: string | null,
    config?: { ttl?: number },
): Promise<void>;
export function initTopicAndSubscribe(
    peer: FluencePeer,
    node_id: string,
    topic: string,
    value: string,
    relay_id: string | null,
    service_id: string | null,
    config?: { ttl?: number },
): Promise<void>;
export function initTopicAndSubscribe(...args: any) {
    let peer: FluencePeer;
    let node_id: any;
    let topic: any;
    let value: any;
    let relay_id: any;
    let service_id: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        node_id = args[1];
        topic = args[2];
        value = args[3];
        relay_id = args[4];
        service_id = args[5];
        config = args[6];
    } else {
        peer = Fluence.getPeer();
        node_id = args[0];
        topic = args[1];
        value = args[2];
        relay_id = args[3];
        service_id = args[4];
        config = args[5];
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
      (seq
       (seq
        (seq
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
         )
         (call %init_peer_id% ("getDataSrv" "topic") [] topic)
        )
        (call %init_peer_id% ("getDataSrv" "value") [] value)
       )
       (call %init_peer_id% ("getDataSrv" "relay_id") [] relay_id)
      )
      (call %init_peer_id% ("getDataSrv" "service_id") [] service_id)
     )
     (call -relay- ("op" "noop") [])
    )
    (xor
     (seq
      (call node_id ("op" "string_to_b58") [topic] k)
      (call node_id ("kad" "neighborhood") [k [] []] nodes)
     )
     (seq
      (call -relay- ("op" "noop") [])
      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
     )
    )
   )
   (call -relay- ("op" "noop") [])
  )
  (fold nodes n
   (par
    (xor
     (seq
      (seq
       (call n ("peer" "timestamp_sec") [] t)
       (call n ("aqua-dht" "register_key") [topic t false 0])
      )
      (call n ("aqua-dht" "put_value") [topic value t relay_id service_id 0])
     )
     (null)
    )
    (seq
     (call -relay- ("op" "noop") [])
     (next n)
    )
   )
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
                h.on('getDataSrv', 'node_id', () => {
                    return node_id;
                });
                h.on('getDataSrv', 'topic', () => {
                    return topic;
                });
                h.on('getDataSrv', 'value', () => {
                    return value;
                });
                h.on('getDataSrv', 'relay_id', () => {
                    return relay_id === null ? [] : [relay_id];
                });
                h.on('getDataSrv', 'service_id', () => {
                    return service_id === null ? [] : [service_id];
                });
                h.onEvent('callbackSrv', 'response', (args) => {});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for initTopicAndSubscribe');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
