import {ifCorrectXorWrap, ifElseCall, ifElseNumCall} from '../compiled/examples/if';

export async function ifCall() {
    await ifElseCall(false);
    await ifElseCall(true);

    await ifElseNumCall(1);
    await ifElseNumCall(5);
}

export async function ifWrapCall(node: string) {
    return ifCorrectXorWrap(node)
}
