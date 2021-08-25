import { FluencePeer } from '@fluencelabs/fluence';
import {
    concat_foobars,
    registerMyExportSrv,
    registerStringService,
} from '../compiled/examples/imports_exports/imports';

export async function declareCall(peer: FluencePeer) {
    // super foo is not exported
    registerServiceFunction(peer, 'super_foo', 'small_foo', (args: any[], _) => {
        return 'small_foo';
    });

    registerStringService(peer, {
        concat: (a, b) => {
            return a + b;
        },
    });
    registerMyExportSrv(peer, {
        another_str: () => {
            return 'str_from_my_export_srv';
        },
    });
    return await concat_foobars(peer);
}
