#!/usr/bin/env node

import { createClient } from "@fluencelabs/fluence";
import { testNet } from "@fluencelabs/fluence-network-environment";
import {
  getPeerExternalAddresses,
  // getPeerExternalTimestamp,
} from "./compiled/helloWorld";

const main = async () => {
  const client = await createClient(testNet[0]);

  const addresses = await getPeerExternalAddresses(client, client.relayPeerId!);
  console.log("Relay external addresses: ", addresses);

  // const timestamp = await getPeerExternalTimestamp(client, client.relayPeerId!);
  // console.log("Relay timestamp: ", timestamp);

  client.disconnect();
};

main();
