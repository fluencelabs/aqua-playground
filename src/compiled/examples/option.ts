/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.14-SNAPSHOT
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';


// Services

//Srv
//defaultId = "srv"

//add_alias: (alias: string, service_id: string) => void
//create: (blueprint_id: string) => string
//get_interface: (service_id: string) => {function_signatures:{arguments:string[][];name:string;output_types:string[]}[];record_types:{fields:string[][];id:number;name:string}[]}
//list: () => {blueprint_id:string;id:string;owner_id:string}[]
//remove: (service_id: string) => void
//resolve_alias: (alias: string) => string
//END Srv




//Op
//defaultId = "op"

//array: (a: string, b: string | null, c: string | null, d: string | null) => string[]
//array_length: (array: string[]) => number
//bytes_from_b58: (b: string) => number[]
//bytes_to_b58: (bs: number[]) => string
//concat: (a: string[], b: string[] | null, c: string[] | null, d: string[] | null) => string[]
//concat_strings: (a: string, b: string) => string
//identity: (s: string | null) => string | null
//noop: () => void
//sha256_string: (s: string) => string
//string_from_b58: (b: string) => string
//string_to_b58: (s: string) => string
//END Op




//Kademlia
//defaultId = "kad"

//merge: (target: string, left: string[], right: string[], count: number | null) => string[]
//neighborhood: (key: string, already_hashed: boolean | null, count: number | null) => string[]
//END Kademlia




//Script
//defaultId = "script"

//add: (air_script: string, interval: string | null) => string
//list: () => {failures:number;id:string;interval:string;owner:string;src:string}
//remove: (script_id: string) => boolean
//END Script




//Dist
//defaultId = "dist"

//add_blueprint: (blueprint: {dependencies:string[];name:string}) => string
//add_module: (wasm_b56_content: number[], conf: {name:string}) => string
//add_module_from_vault: (path: string, config: {name:string}) => string
//default_module_config: (module_name: string) => {name:string}
//get_interface: (module_id: string) => {function_signatures:{arguments:string[][];name:string;output_types:string[]}[];record_types:{fields:string[][];id:number;name:string}[]}
//list_blueprints: () => {dependencies:string[];id:string;name:string}[]
//list_modules: () => {config:{name:string};hash:string;name:string}[]
//make_blueprint: (name: string, dependencies: string[]) => {dependencies:string[];name:string}
//make_module_config: (name: string, mem_pages_count: number | null, logger_enabled: boolean | null, preopened_files: string[] | null, envs: string[][] | null, mapped_dirs: string[][] | null, mounted_binaries: string[][] | null, logging_mask: number | null) => {name:string}
//END Dist




//Peer
//defaultId = "peer"

//connect: (id: string, multiaddrs: string[] | null) => boolean
//get_contact: (peer: string) => {addresses:string[];peer_id:string}
//identify: () => {external_addresses:string[]}
//is_connected: (peer: string) => boolean
//timestamp_ms: () => number
//timestamp_sec: () => number
//END Peer




//SomeS
//defaultId = "test2"

//getStr: (arg0: string | null) => string | null
//getStr1: () => string | null
//getStr2: (arg0: string) => string
//END SomeS



// Functions

export async function useOptional(client: FluenceClient, opt: string | null, config?: {ttl?: number}): Promise<string> {
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
     (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
     (call %init_peer_id% ("getDataSrv" "opt") [] opt)
    )
    (call %init_peer_id% ("test2" "getStr") [opt] res)
   )
   (fold opt i
    (seq
     (call %init_peer_id% ("test2" "getStr2") [i])
     (next i)
    )
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res.$.[0]!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'opt', () => {return opt === null ? [] : [opt];});
                h.onEvent('callbackSrv', 'response', (args) => {
    const [res] = args;
  resolve(res);
});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for useOptional');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function returnOptional(client: FluenceClient, config?: {ttl?: number}): Promise<string | null> {
    let request: RequestFlow;
    const promise = new Promise<string | null>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("test2" "getStr1") [] res)
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
                    return client.relayPeerId!;
                });
                
                h.onEvent('callbackSrv', 'response', (args) => {
    let [opt] = args;
  if (Array.isArray(opt)) {
      if (opt.length === 0) { resolve(null); }
      opt = opt[0];
  }          
  return resolve(opt);
});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for returnOptional');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function returnNone(client: FluenceClient, config?: {ttl?: number}): Promise<string | null> {
    let request: RequestFlow;
    const promise = new Promise<string | null>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("op" "noop") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$result])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                
                h.onEvent('callbackSrv', 'response', (args) => {
    let [opt] = args;
  if (Array.isArray(opt)) {
      if (opt.length === 0) { resolve(null); }
      opt = opt[0];
  }          
  return resolve(opt);
});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for returnNone');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      
