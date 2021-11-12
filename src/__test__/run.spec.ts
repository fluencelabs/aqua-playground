import {callArrowCall} from "../examples/callArrowCall";
import {krasnodar, stage, testNet} from '@fluencelabs/fluence-network-environment';

import { exec } from "child_process";


describe('Testing run command', () => {

    const addr = krasnodar[2].multiaddr
    const nodeId = krasnodar[3].peerId
    const message = "hello"
    const message2 = "aaa"
    const func = `\"call(\\\"${message}\\\", \\\"${message}\\\", \\\"${nodeId}\\\")\"`
    const call = `npm run aqua run -- --addr ${addr} -i cli-run-aqua/caller.aqua -m node_modules/ --func ${func}`

    it('run simple command', async () => {
        exec(call, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                process.exit(1)
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                process.exit(1)
            }

            // get element before last in output
            const result = stdout.split("\n").slice(-2)[0]
            const toCheck = [message, message2].join(",")
            if (toCheck === message) {
                console.log("Test passed.")
                process.exit(0)
            } else {
                console.log(`Incorrect message returned. Returned: ${result}. Expected: ${message}`)
                process.exit(1)
            }
        });
    });
})