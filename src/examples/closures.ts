import { Fluence } from '@fluencelabs/fluence';
// import { smth, registerLocalSrv } from '../compiled/examples/closures';
import { relays } from '../config'

export async function closuresCall() {
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;
    const selfPeerId = Fluence.getPeer().getStatus().peerId;

    // registerLocalSrv({inside: () => console.log("call inside")})

    // return smth(relays[2].peerId, relays[3].peerId)
}