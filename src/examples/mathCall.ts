import {test1, test2} from '../compiled/examples/math';
import {ifCalc} from "../compiled/examples/funcs";

export async function mathTest1Call(): Promise<number> {
    return await test1();
}

export async function mathTest2Call(): Promise<number> {
    return await test2();
}

export async function ifCalcCall(): Promise<number> {
    return await ifCalc();
}