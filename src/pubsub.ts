import {findSubscribers, getNeighbours, initTopicAndSubscribe} from "@fluencelabs/aqua-dht-ts";
import {createClient} from "@fluencelabs/fluence";
import {krasnodar} from "@fluencelabs/fluence-network-environment";

const main = async () => {
    const client = await createClient(krasnodar[0]);
    const peer = krasnodar[0].peerId
    const nodes = await getNeighbours(client, peer, "random")
    console.log(nodes)

    const topic = "random"
    await initTopicAndSubscribe(client, peer, topic, "random value", null, null)

    const result = await findSubscribers(client, peer, topic)

    console.log(result)

    process.exit(0)
}

main().catch((err) => {
    console.log(err)
    process.exit(1)
})