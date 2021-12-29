/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.5.2-257
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface SuperFooDef {
    small_foo: (callParams: CallParams<null>) => string | Promise<string>;
}
export function registerSuperFoo(service: SuperFooDef): void;
export function registerSuperFoo(serviceId: string, service: SuperFooDef): void;
export function registerSuperFoo(peer: FluencePeer, service: SuperFooDef): void;
export function registerSuperFoo(peer: FluencePeer, serviceId: string, service: SuperFooDef): void;
       

export function registerSuperFoo(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "super_foo",
    "functions" : [
        {
            "functionName" : "small_foo",
            "argDefs" : [
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        }
    ]
}
    );
}
      
// Functions

