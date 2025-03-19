import JSONMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMethodCodec";
import type MethodCall from '../../../plugin/common/MethodCall';
import MethodChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type { MethodCallHandler, MethodResult } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
export default class NavigationChannel {
    private static TAG = "NavigationChannel";
    private channel: MethodChannel;
    constructor(dartExecutor: DartExecutor) {
        this.channel = new MethodChannel(dartExecutor, "flutter/navigation", JSONMethodCodec.INSTANCE);
        // Provide a default handler that returns an empty response to any messages
        // on this channel.
        this.channel.setMethodCallHandler(new NavigationCallback());
    }
    setInitialRoute(initialRoute: string): void {
        Log.i(NavigationChannel.TAG, "Sending message to set initial route to '" + initialRoute + "'");
        this.channel.invokeMethod("setInitialRoute", initialRoute);
    }
    pushRoute(route: string): void {
        Log.i(NavigationChannel.TAG, "Sending message to push route '" + route + "'");
        this.channel.invokeMethod("pushRoute", route);
    }
    pushRouteInformation(route: string): void {
        Log.i(NavigationChannel.TAG, "Sending message to push route information '" + route + "'");
        this.channel.invokeMethod("pushRouteInformation", new Map().set("location", route));
    }
    popRoute(): void {
        Log.i(NavigationChannel.TAG, "Sending message to pop route.");
        this.channel.invokeMethod("popRoute", null);
    }
    setMethodCallHandler(handler: MethodCallHandler) {
        this.channel.setMethodCallHandler(handler);
    }
}
class NavigationCallback implements MethodCallHandler {
    onMethodCall(call: MethodCall, result: MethodResult) {
        result.success(null);
    }
}
