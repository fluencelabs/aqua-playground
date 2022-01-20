import {Fluence, FluencePeer} from '@fluencelabs/fluence';
import {joinIdx} from "../compiled/examples/join";
import { config } from '../config';

const relays = config.relays

export async function joinIdxCall() {
    // join.aqua
    const relayPeerId = Fluence.getPeer().getStatus().relayPeerId;

    return await joinIdx(2, [relayPeerId, relays[2].peerId, relays[3].peerId, relays[4].peerId]);
}
