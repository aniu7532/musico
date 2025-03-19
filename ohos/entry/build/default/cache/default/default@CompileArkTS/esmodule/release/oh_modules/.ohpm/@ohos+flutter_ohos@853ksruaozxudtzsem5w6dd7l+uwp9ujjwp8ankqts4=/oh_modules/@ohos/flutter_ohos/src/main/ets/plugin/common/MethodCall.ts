import ToolUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/ToolUtils";
import type Any from './Any';
export default class MethodCall {
    method: string;
    args: Any;
    constructor(z50: string, a51: Any) {
        this.method = z50;
        this.args = a51;
    }
    argument(y50: string): Any {
        if (this.args == null) {
            return null;
        }
        else if (this.args instanceof Map) {
            return (this.args as Map<Any, Any>).get(y50);
        }
        else if (ToolUtils.isObj(this.args)) {
            return this.args[y50];
        }
        else {
            throw new Error("ClassCastException");
        }
    }
    hasArgument(x50: string): boolean {
        if (this.args == null) {
            return false;
        }
        else if (this.args instanceof Map) {
            return (this.args as Map<Any, Any>).has(x50);
        }
        else if (ToolUtils.isObj(this.args)) {
            return this.args.hasOwnProperty(x50);
        }
        else {
            throw new Error("ClassCastException");
        }
    }
}
