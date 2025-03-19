import type Any from '../../plugin/common/Any';
import { DVModel, DVModelParameters, DVModelEvents, DVModelChildren } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicView";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
const TAG = "dynamicViewJson";
export function createDVModelFromJson(w85: Object): DVModel {
    let x85: (children: Array<Object>) => DVModelChildren = (m86: Array<Object>): DVModelChildren => {
        let n86 = new DVModelChildren();
        if (Array.isArray(m86)) {
            (m86 as Array<Object>).forEach(o86 => {
                const p86 = createDVModelFromJson(o86);
                if (p86 != undefined) {
                    n86.push(p86);
                }
            });
        }
        return n86;
    };
    let y85: (result: DVModelParameters | DVModelEvents, key: Any, element: Object) => void = (i86: DVModelParameters, j86: Any, k86: Any): void => {
        let l86 = i86 as Record<string, Any>;
        l86[j86] = k86[j86];
    };
    let z85: (attributes: Object) => DVModelParameters = (f86: Object): DVModelParameters => {
        let g86 = new DVModelParameters();
        if ((typeof f86 == "object") && (!Array.isArray(f86))) {
            Object.keys(f86).forEach(h86 => { y85(g86, h86, f86); });
        }
        return g86;
    };
    let a86: (events: Object) => DVModelEvents = (c86: Object): DVModelEvents => {
        let d86 = new DVModelEvents();
        if ((typeof c86 == "object") && (!Array.isArray(c86))) {
            Object.keys(c86).forEach(e86 => { y85(d86, e86, c86); });
        }
        return d86;
    };
    if (typeof w85 !== 'object') {
        Log.e(TAG, "createDVModelFromJson: input is not JSON");
        return new DVModel("", "", "", x85([]));
    }
    let b86 = w85 as Record<string, string | Any>;
    return new DVModel(b86["compType"], z85(b86["attributes"]), a86(b86["events"]), x85(b86["children"]), b86["build"]);
}
