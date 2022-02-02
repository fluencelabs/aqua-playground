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
    const listBlueprintsCall = `npm run aqua listBlueprints -- --addr ${addr}`
    const listModulesCall = `npm run aqua listModules -- --addr ${addr}`
    const listInterfacesCall = `npm run aqua listInterfaces -- --addr ${addr}`
    const getInterfaceCall = `npm run aqua getInterface -- --addr ${addr}`
    const getModuleInterfaceCall = `npm run aqua getModuleInterface -- --addr ${addr}`

    it('run simple command', (done) => {
        exec(call, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
            } else if (stderr) {
                console.error(`stderr: ${stderr}`);
            } else {
                // get element before last in output
                const result = stdout;

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
        exec(listBlueprintsCall, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
            } else if (stderr) {
                console.error(`stderr: ${stderr}`);
            } else {
                let arr = stdout.split("\n").slice(2)
                const result = JSON.parse(arr.join(""));

                expect(Array.isArray(result)).toBeTruthy();
            }
            done();
        });
    }, 16000);

    it.skip('run listModules', (done) => {
        exec(listModulesCall, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
            } else if (stderr) {
                console.error(`stderr: ${stderr}`);
            } else {
                let arr = stdout.split("\n").slice(2)
                const result = JSON.parse(arr.join(""));

                expect(Array.isArray(result)).toBeTruthy();
            }
            done();
        });
    }, 16000);

    it.skip('run listInterfaces', (done) => {
        exec(listInterfacesCall, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
            } else if (stderr) {
                console.error(`stderr: ${stderr}`);
            } else {
                let arr = stdout.split("\n").slice(2)
                const result = JSON.parse(arr.join(""));

                expect(Array.isArray(result)).toBeTruthy();
            }
            done();
        });
    }, 16000);
})