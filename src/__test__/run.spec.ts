import {krasnodar, stage, testNet} from '@fluencelabs/fluence-network-environment';

const util = require('util');
const exec = util.promisify(require('child_process').exec);


describe('Testing run command', () => {

    const addr = krasnodar[4].multiaddr
    const nodeId = krasnodar[5].peerId
    const message = "hello"
    const message2 = "aaa"
    const func = `\"call(\\\"${message}\\\", \\\"${message2}\\\", \\\"${nodeId}\\\")\"`
    const call = `npm run aqua run -- --addr ${addr} -i cli-run-aqua/caller.aqua -m node_modules/ --func ${func}`
    const listModulesCall = `npm run aqua listBlueprints -- --addr ${addr}`

    it('run simple command', (done) => {
        exec(call, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
            } else if (stderr) {
                console.error(`stderr: ${stderr}`);
            } else {
                // get element before last in output
                const result = stdout;
                console.log(result);
                const toCheck = [message, message2].join(',');
                const res = result.includes(message) && result.includes(message2);
                if (res) {
                    console.log('Test passed.');
                } else {
                    console.log(`Incorrect message returned. Returned: ${result}. Expected: ${toCheck}`);
                }

                expect(res).toBeTruthy();
            }
            done();
        });
    }, 16000);

    it.skip('run listBlueprints', (done) => {
        exec(listModulesCall, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
            } else if (stderr) {
                console.error(`stderr: ${stderr}`);
            } else {
                // get element before last in output
                const result = stdout;
                console.log(result);
                const toCheck = [message, message2].join(',');
                const res = result.includes(message) && result.includes(message2);
                if (res) {
                    console.log('Test passed.');
                } else {
                    console.log(`Incorrect message returned. Returned: ${result}. Expected: ${toCheck}`);
                }

                expect(res).toBeTruthy();
            }
            done();
        });
    }, 16000);
})