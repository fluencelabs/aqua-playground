import { krasnodar, stage, testNet } from '@fluencelabs/fluence-network-environment';
import { defaultConfig } from '@fluencelabs/fluence/dist/internal/ephemeral';

export const krasnodarConfig = {
    relays: krasnodar,
    externalAddressesRelay1: ['/ip4/164.90.171.139/tcp/7770', '/ip4/164.90.171.139/tcp/9990/ws'],
    externalAddressesRelay2: ['/ip4/164.90.164.229/tcp/7001', '/ip4/164.90.164.229/tcp/9001/ws'],
    tryCatchError:
        "Local service error, ret_code is 1, error message is '\"Service with id 'unex' not found (function getStr)\"'",
};

export const stageConfig = {
    relays: stage,
    externalAddressesRelay1: ['/ip4/134.209.186.43/tcp/7001', '/ip4/134.209.186.43/tcp/9001/ws'],
    externalAddressesRelay2: ['/ip4/134.209.186.43/tcp/7770', '/ip4/134.209.186.43/tcp/9990/ws'],
    tryCatchError:
        "Local service error, ret_code is 1, error message is '\"Service with id 'unex' not found (function getStr)\"'",
};

export const testNetConfig = {
    relays: testNet,
    externalAddressesRelay1: ['/ip4/165.227.164.206/tcp/7001', '/ip4/165.227.164.206/tcp/9001/ws'],
    externalAddressesRelay2: ['/ip4/142.93.169.49/tcp/7001', '/ip4/142.93.169.49/tcp/9001/ws'],
    tryCatchError:
        "Local service error, ret_code is 1, error message is '\"Service with id 'unex' not found (function getStr)\"'",
};

export const ephemeralConfig = {
    relays: defaultConfig.peers.map((x) => ({
        peerId: x.peerId,
        multiaddr: 'dontcare',
    })),
    externalAddressesRelay1: [],
    externalAddressesRelay2: [],
    tryCatchError:
        "Local service error, ret_code is 1, error message is '\"Service with id 'unex' not found (function getStr)\"'",
};

// export const config = ephemeralConfig;
export const config = stageConfig;
