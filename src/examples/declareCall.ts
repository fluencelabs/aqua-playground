import { FluencePeer } from '@fluencelabs/fluence';
import {
    concat_foobars,
    registerMyExportSrv,
    registerStringService,
} from '../compiled/examples/imports_exports/imports';
import { registerSuperFoo } from '../compiled/examples/imports_exports/declare';

export async function declareCall() {
    registerSuperFoo({
        small_foo: async () => {
            return 'small_foo';
        },
    });

    registerStringService({
        concat: async (a, b) => {
            return a + b;
        },
    });
    registerMyExportSrv({
        another_str: async () => {
            return 'str_from_my_export_srv';
        },
    });
    return await concat_foobars();
}
