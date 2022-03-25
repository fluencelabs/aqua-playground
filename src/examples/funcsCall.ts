import {main, registerA, calc} from '../compiled/examples/funcs';

export async function funcsCall() {

    registerA({
        getJ: (n) => {
            return n
        }
    })

    let res1 = await main((c, arr) => {
        console.log(c + ": " + arr)
    })

    let res2 = await calc((c, arr) => {
        console.log(c + ": " + arr)
    })

    return [res1, res2]
}