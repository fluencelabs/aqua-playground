import {someFunc} from "../compiled/examples/streamCallback";

export async function streamCallbackCall(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        someFunc((a: string[]) => {
            resolve(a);
        })
    });
}
