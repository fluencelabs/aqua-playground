import { FluencePeer } from '@fluencelabs/fluence';
import { returnNone, returnOptional, useOptional, registerSomeS } from '../compiled/examples/option';

export function registerHandlers(peer: FluencePeer): void {
    registerSomeS(peer, {
        getStr: async (arg0) => {
            return arg0;
        },
        getStr1: async () => {
            return 'optional';
        },
        getStr2: async (arg0) => {
            return arg0;
        },
    });
}

export async function useOptionalCall(peer: FluencePeer): Promise<string> {
    return await useOptional(peer, 'hello');
}

export async function returnOptionalCall(peer: FluencePeer): Promise<string | null> {
    return await returnOptional(peer);
}

export async function returnNull(peer: FluencePeer): Promise<string | null> {
    return await returnNone(peer);
}
