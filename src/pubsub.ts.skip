import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { getNeighbours, initTopicAndSubscribe, findSubscribers } from './compiled/dht/dht-example';

const main = async () => {
    await Fluence.start({ connectTo: krasnodar[0] });
    const relayPeerId = krasnodar[0].peerId;

    const nodes = await getNeighbours(relayPeerId);
    console.log(nodes);

    const topic = 'random';
    await initTopicAndSubscribe(relayPeerId, topic, null, null);

    const result = await findSubscribers(topic);

    console.log(result);

    process.exit(0);
};

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
