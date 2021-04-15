import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';



export async function id(client: FluenceClient): Promise<void> {
    let request;
    const promise = new Promise<void>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .withRawScript(
                `
(xor
 (seq
  (call %init_peer_id% ("getDataSrv" "relay") [] relay)
  (call %init_peer_id% ("op" "identity") [])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error%])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', 'relay', () => {
                    return client.relayPeerId;
                });
                h.on('getRelayService', 'hasReleay', () => {// Not Used
                    return client.relayPeerId !== undefined;
                });
                
                
                h.on('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out');
            })
            .build();
    });
    await client.initiateFlow(request);
    return Promise.race([promise, Promise.resolve()]);
}
      


export async function parFunc(client: FluenceClient, node: string, c: (arg0: {external_addresses:string[]}) => void): Promise<void> {
    let request;
    const promise = new Promise<void>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "node") [] node)
   (call %init_peer_id% ("getDataSrv" "relay") [] relay)
  )
  (par
   (par
    (call %init_peer_id% ("parservice-id" "call") [] y)
    (seq
     (call relay ("op" "identity") [])
     (seq
      (call node ("peer" "identify") [] t)
      (seq
       (call relay ("op" "identity") [])
       (call %init_peer_id% ("callbackSrv" "c") [t])
      )
     )
    )
   )
   (call %init_peer_id% ("parservice-id" "call") [] x)
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error%])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', 'relay', () => {
                    return client.relayPeerId;
                });
                h.on('getRelayService', 'hasReleay', () => {// Not Used
                    return client.relayPeerId !== undefined;
                });
                h.on('getDataSrv', 'node', () => {return node;});
h.on('callbackSrv', 'c', (args) => {return c(args[0]);});
                
                h.on('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out');
            })
            .build();
    });
    await client.initiateFlow(request);
    return Promise.race([promise, Promise.resolve()]);
}
      