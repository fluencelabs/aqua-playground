import { registerSubService } from '../compiled/examples/imports_exports/subImport';
import { registerConcatSubs, subImportUsage } from '../compiled/examples/subImportUsage';

export async function subImportCall() {
    // helloWorld.aqua
    registerSubService({
        sub: (s) => {
            return {
                one: s,
                two: 42,
            };
        },
    });
    registerConcatSubs({
        get_some: (s, sr) => {
            return {
                one: s,
                two: sr.two,
            };
        },
    });

    return await subImportUsage('random_string');
}
