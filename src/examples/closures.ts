import { Fluence } from '@fluencelabs/fluence';
import { closureIn, closureOut, closureBig, registerLocalSrv } from '../compiled/examples/closures';
import { relays } from '../config'

export async function closuresCall(): Promise<[string, string[], [string, string]]> {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    const selfPeerId = Fluence.getPeer().getStatus().peerId;

    registerLocalSrv({inside: () => console.log("call inside")})

    const resIn = await closureIn(relays[4].peerId, {ttl: 15000})
    const resOut = await closureOut(relays[5].peerId, {ttl: 15000})
    const resBig = await closureBig(relays[4].peerId, relays[5].peerId, {ttl: 15000})

    return [resIn, resOut.external_addresses, resBig]
}