    import {FluenceClient} from "@fluencelabs/fluence";
    import {iterateAndPrint, iterateAndPrintParallel} from "./compiled/fold";

    export async function foldCall(client: FluenceClient) {
        await iterateAndPrint(client, ["1", "2", "3"])
        await iterateAndPrintParallel(client, ["4", "5", "6"])
    }