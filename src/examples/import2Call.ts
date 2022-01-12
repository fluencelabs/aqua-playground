import { registerOneMore } from '../compiled/examples/imports_exports/gen/OneMore';
import { barfoo, wrap } from '../compiled/examples/imports_exports/import2';

export async function import2Call() {
    registerOneMore('hello', {
        more_call: () => {
        },
    });

    registerOneMore('ohmygod', {
        more_call: () => {
        },
    });

    let first = await wrap();
    let second = await barfoo();

    return { first, second };
}
