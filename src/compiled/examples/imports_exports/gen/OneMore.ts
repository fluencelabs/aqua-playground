/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.5.2-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface OneMoreDef {
    more_call: (callParams: CallParams<null>) => void | Promise<void>;
}
export function registerOneMore(serviceId: string, service: OneMoreDef): void;
export function registerOneMore(peer: FluencePeer, serviceId: string, service: OneMoreDef): void;
       

export function registerOneMore(...args: any) {
    registerService(
        args,
        {
    "functions" : [
        {
            "functionName" : "more_call",
            "argDefs" : [
            ],
            "returnType" : {
                "tag" : "void"
            }
        }
    ]
}
    );
}
      
// Functions

