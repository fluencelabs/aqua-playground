import { FluencePeer } from '@fluencelabs/fluence';
import { returnNone, returnOptional, useOptional, registerSomeS } from '../compiled/examples/option';

export function registerHandlers(): void {
    registerSomeS({
        getStr: (arg0) => {
            return arg0;
        },
        getStr1: () => {
            return 'optional';
        },
        getStr2: (arg0) => {
            return arg0;
        },
    });
}

export async function useOptionalCall(): Promise<string> {
    return await useOptional('hello');
}

export async function returnOptionalCall(): Promise<string | null> {
    return await returnOptional();
}

export async function returnNull(): Promise<string | null> {
    return await returnNone();
}
