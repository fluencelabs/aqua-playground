import { barfoo, wrap } from '../compiled/examples/imports_exports/import2';

export async function import2Call() {
    // registerServiceFunction(client, 'hello', 'more_call', (args: any[], _) => {
    //     return {};
    // });

    // registerServiceFunction(client, 'ohmygod', 'more_call', (args: any[], _) => {
    //     return {};
    // });

    let first = await wrap();
    let second = await barfoo();

    return { first, second };
}
