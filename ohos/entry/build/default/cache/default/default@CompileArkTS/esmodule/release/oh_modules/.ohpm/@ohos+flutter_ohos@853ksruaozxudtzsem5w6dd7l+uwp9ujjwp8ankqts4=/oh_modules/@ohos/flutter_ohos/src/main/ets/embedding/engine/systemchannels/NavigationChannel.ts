import JSONMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMethodCodec";
import type MethodCall from '../../../plugin/common/MethodCall';
import MethodChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type { MethodCallHandler, MethodResult } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
export default class NavigationChannel {
    private static TAG = "NavigationChannel";
    private channel: MethodChannel;
    constructor(u21: DartExecutor) {
        this.channel = new MethodChannel(u21, "flutter/navigation", JSONMethodCodec.INSTANCE);
        this.channel.setMethodCallHandler(new NavigationCallback());
    }
    setInitialRoute(t21: string): void {
        Log.i(NavigationChannel.TAG, "Sending message to set initial route to '" + t21 + "'");
        this.channel.invokeMethod("setInitialRoute", t21);
    }
    pushRoute(s21: string): void {
        Log.i(NavigationChannel.TAG, "Sending message to push route '" + s21 + "'");
        this.channel.invokeMethod("pushRoute", s21);
    }
    pushRouteInformation(r21: string): void {
        Log.i(NavigationChannel.TAG, "Sending message to push route information '" + r21 + "'");
        this.channel.invokeMethod("pushRouteInformation", new Map().set("location", r21));
    }
    popRoute(): void {
        Log.i(NavigationChannel.TAG, "Sending message to pop route.");
        this.channel.invokeMethod("popRoute", null);
    }
    setMethodCallHandler(q21: MethodCallHandler) {
        this.channel.setMethodCallHandler(q21);
    }
}
class NavigationCallback implements MethodCallHandler {
    onMethodCall(o21: MethodCall, p21: MethodResult) {
        p21.success(null);
    }
}
