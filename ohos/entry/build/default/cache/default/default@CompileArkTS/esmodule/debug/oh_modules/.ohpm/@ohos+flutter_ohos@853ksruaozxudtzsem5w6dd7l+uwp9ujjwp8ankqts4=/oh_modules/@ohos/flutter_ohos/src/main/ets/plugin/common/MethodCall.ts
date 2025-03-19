import ToolUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/ToolUtils";
import type Any from './Any';
/** Command object representing a method call on a {@link MethodChannel}. */
export default class MethodCall {
    /** The name of the called method. */
    method: string;
    /**
     * Arguments for the call.
     *
     * <p>Consider using {@link #arguments()} for cases where a particular run-time type is expected.
     * Consider using {@link #argument(String)} when that run-time type is {@link Map} or {@link
     * JSONObject}.
     */
    args: Any;
    constructor(method: string, args: Any) {
        this.method = method;
        this.args = args;
    }
    argument(key: string): Any {
        if (this.args == null) {
            return null;
        }
        else if (this.args instanceof Map) {
            return (this.args as Map<Any, Any>).get(key);
        }
        else if (ToolUtils.isObj(this.args)) {
            return this.args[key];
        }
        else {
            throw new Error("ClassCastException");
        }
    }
    hasArgument(key: string): boolean {
        if (this.args == null) {
            return false;
        }
        else if (this.args instanceof Map) {
            return (this.args as Map<Any, Any>).has(key);
        }
        else if (ToolUtils.isObj(this.args)) {
            return this.args.hasOwnProperty(key);
        }
        else {
            throw new Error("ClassCastException");
        }
    }
}
