import { Fluence } from '@fluencelabs/fluence';
import {closureIn, closureOut, closureBig, registerLocalSrv, closureOut2} from '../compiled/examples/closures';
import { config } from '../config'

const relays = config.relays

export async function closuresCall(): Promise<[string, string[], string[], [string, string]]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    const selfPeerId = Fluence.getPeer().getStatus().peerId;

    registerLocalSrv({inside: () => console.log("call inside")})

    const resIn = await closureIn(relays[4].peerId, {ttl: 15000})
    const resOut = await closureOut(relays[5].peerId, {ttl: 15000})
    const resOut2 = await closureOut2(relays[5].peerId, {ttl: 15000})
    const resBig = await closureBig(relays[4].peerId, relays[5].peerId, {ttl: 15000})

    return [resIn, resOut.external_addresses, resOut2.external_addresses, resBig]
}