import { Fluence } from '@fluencelabs/fluence';
import {closureIn, closureOut, closureBig, registerLocalSrv, closureOut2} from '../compiled/examples/closures';
import { config } from '../config'

const relays = config.relays

export async function closuresCall(): Promise<[string, string[], string[], [string, string]]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    const selfPeerId = Fluence.getPeer().getStatus().peerId;

    registerLocalSrv({inside: () => console.log("call inside")})

    const resIn = await closureIn(relays[4].peerId, {ttl: 15000})
    console.log("11111111111")
    let resOut;
    try {
        resOut = await closureOut(relays[5].peerId, {ttl: 15000})
    } catch (e) {
        console.log(e)
    }

    console.log("22222222222")
    const resOut2 = await closureOut2(relays[5].peerId, {ttl: 15000})
    console.log("333333333333333")
    const resBig = await closureBig(relays[4].peerId, relays[5].peerId, {ttl: 15000})

    return [resIn, resOut.external_addresses, resOut2.external_addresses, resBig]
}