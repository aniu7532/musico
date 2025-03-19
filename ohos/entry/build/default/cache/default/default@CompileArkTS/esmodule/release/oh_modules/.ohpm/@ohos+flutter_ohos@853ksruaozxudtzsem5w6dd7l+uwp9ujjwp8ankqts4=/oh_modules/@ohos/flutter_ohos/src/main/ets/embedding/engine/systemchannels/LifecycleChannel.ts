import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import StringCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StringCodec";
import type DartExecutor from '../dart/DartExecutor';
import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
export default class LifecycleChannel {
    private static TAG = "LifecycleChannel";
    private static CHANNEL_NAME = "flutter/lifecycle";
    private static RESUMED = "AppLifecycleState.resumed";
    private static INACTIVE = "AppLifecycleState.inactive";
    private static PAUSED = "AppLifecycleState.paused";
    private static DETACHED = "AppLifecycleState.detached";
    private lastOhosState = "";
    private lastFlutterState = "";
    private lastFocus = true;
    private channel: BasicMessageChannel<string>;
    constructor(r20: DartExecutor) {
        this.channel = new BasicMessageChannel<string>(r20, LifecycleChannel.CHANNEL_NAME, StringCodec.INSTANCE);
    }
    aWindowIsFocused(): void {
        this.sendState(this.lastOhosState, true);
    }
    noWindowsAreFocused(): void {
        this.sendState(this.lastOhosState, false);
    }
    appIsResumed(): void {
        this.sendState(LifecycleChannel.RESUMED, this.lastFocus);
    }
    appIsInactive(): void {
        this.sendState(LifecycleChannel.INACTIVE, this.lastFocus);
    }
    appIsPaused(): void {
        this.sendState(LifecycleChannel.PAUSED, this.lastFocus);
    }
    appIsDetached(): void {
        this.sendState(LifecycleChannel.DETACHED, this.lastFocus);
    }
    private sendState(o20: string, p20: boolean): void {
        if (this.lastOhosState == o20 && p20 == this.lastFocus) {
            return;
        }
        let q20: string;
        if (o20 == LifecycleChannel.RESUMED) {
            q20 = p20 ? LifecycleChannel.RESUMED : LifecycleChannel.INACTIVE;
        }
        else {
            q20 = o20;
        }
        this.lastOhosState = o20;
        this.lastFocus = p20;
        if (q20 == this.lastFlutterState) {
            return;
        }
        Log.i(LifecycleChannel.TAG, "Sending " + q20 + " message.");
        this.channel.send(q20);
        this.lastFlutterState = q20;
    }
}
