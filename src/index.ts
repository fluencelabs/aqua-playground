#!/usr/bin/env node

import { createClient } from "@fluencelabs/fluence";
import { testNet } from "@fluencelabs/fluence-network-environment";
import { getPeerExternalAddresses } from "./compiled/helloWorld";

const main = async () => {
  const client = await createClient(testNet[0]);
  const addresses = getPeerExternalAddresses(client);
  console.log("Relay external addresses: ", addresses);
};

main();
