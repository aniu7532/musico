import type HashMap from "@ohos:util.HashMap";
import type MethodCall from '../../../plugin/common/MethodCall';
import MethodChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type { MethodCallHandler, MethodResult } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import StandardMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StandardMethodCodec";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
const TAG: string = 'MouseCursorChannel';
export default class MouseCursorChannel implements MethodCallHandler {
    public channel: MethodChannel;
    private mouseCursorMethodHandler: MouseCursorMethodHandler | null = null;
    onMethodCall(h21: MethodCall, i21: MethodResult): void {
        if (this.mouseCursorMethodHandler === null) {
            Log.e(TAG, "mouseCursorMethodHandler is null");
            return;
        }
        let j21: string = h21.method;
        Log.i(TAG, "Received '" + j21 + "' message.");
        try {
            switch (j21) {
                case "activateSystemCursor":
                    let l21: HashMap<string, string> = h21.args;
                    let m21: string = l21.get("kind");
                    try {
                        this.mouseCursorMethodHandler.activateSystemCursor(m21);
                    }
                    catch (n21) {
                        i21.error("error", "Error when setting cursors: " + JSON.stringify(n21), null);
                        break;
                    }
                    i21.success(true);
                    break;
                default:
                    break;
            }
        }
        catch (k21) {
            i21.error("error", "UnHandled error: " + JSON.stringify(k21), null);
        }
    }
    constructor(g21: DartExecutor) {
        this.channel = new MethodChannel(g21, "flutter/mousecursor", StandardMethodCodec.INSTANCE);
        this.channel.setMethodCallHandler(this);
    }
    public setMethodHandler(f21: MouseCursorMethodHandler | null): void {
        this.mouseCursorMethodHandler = f21;
    }
    public synthesizeMethodCall(d21: MethodCall, e21: MethodResult): void {
        this.onMethodCall(d21, e21);
    }
}
export interface MouseCursorMethodHandler {
    activateSystemCursor(kind: String): void;
}
