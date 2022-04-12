import {test1, test2} from '../compiled/examples/math';

export async function mathTest1Call(): Promise<number> {
    return await test1();
}

export async function mathTest2Call(): Promise<number> {
    return await test2();
}