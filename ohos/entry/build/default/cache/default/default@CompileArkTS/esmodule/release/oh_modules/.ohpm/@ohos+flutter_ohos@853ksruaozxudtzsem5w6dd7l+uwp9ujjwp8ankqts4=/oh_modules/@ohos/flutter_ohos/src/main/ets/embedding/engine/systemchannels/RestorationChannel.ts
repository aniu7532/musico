import type Any from '../../../plugin/common/Any';
import type MethodCall from '../../../plugin/common/MethodCall';
import MethodChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type { MethodCallHandler, MethodResult } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import StandardMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StandardMethodCodec";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
export default class RestorationChannel {
    private static TAG = "RestorationChannel";
    private static CHANNEL_NAME = "flutter/restoration";
    public waitForRestorationData: boolean = false;
    public pendingFrameworkRestorationChannelRequest: MethodResult | null = null;
    public engineHasProvidedData: boolean = false;
    public frameworkHasRequestedData: boolean = false;
    private restorationData: Uint8Array;
    private channel: MethodChannel | null = null;
    private handler: MethodCallHandler;
    constructor(i28: MethodChannel | DartExecutor, j28: boolean) {
        if (i28 instanceof MethodChannel) {
            this.channel = i28;
        }
        else {
            this.channel =
                new MethodChannel(i28, RestorationChannel.CHANNEL_NAME, StandardMethodCodec.INSTANCE);
        }
        this.waitForRestorationData = j28;
        this.restorationData = new Uint8Array(1).fill(0);
        this.handler = new RestorationChannelMethodCallHandler(this);
        this.channel.setMethodCallHandler(this.handler);
    }
    getRestorationData(): Uint8Array {
        return this.restorationData;
    }
    setRestorationDataOnly(h28: Uint8Array) {
        this.restorationData = h28;
    }
    setRestorationData(c28: Uint8Array) {
        this.engineHasProvidedData = true;
        if (this.pendingFrameworkRestorationChannelRequest != null) {
            this.pendingFrameworkRestorationChannelRequest.success(RestorationChannelMethodCallHandler.packageData(c28));
            this.pendingFrameworkRestorationChannelRequest = null;
            this.restorationData = c28;
        }
        else if (this.frameworkHasRequestedData) {
            this.channel?.invokeMethod("push", RestorationChannelMethodCallHandler.packageData(c28), {
                success: (g28: Any): void => {
                    this.restorationData = c28;
                },
                error: (d28: string, e28: string, f28: Any): void => {
                    Log.e(RestorationChannel.TAG, "Error " + d28 + " while sending restoration data to framework: " + e28);
                },
                notImplemented: (): void => {
                }
            });
        }
        else {
            this.restorationData = c28;
        }
    }
    clearData() {
        this.restorationData = new Uint8Array(1).fill(0);
    }
}
class RestorationChannelMethodCallHandler implements MethodCallHandler {
    private channel: RestorationChannel;
    constructor(b28: RestorationChannel) {
        this.channel = b28;
    }
    onMethodCall(x27: MethodCall, y27: MethodResult): void {
        const z27 = x27.method;
        const a28: Any = x27.args;
        switch (z27) {
            case "put": {
                this.channel.setRestorationDataOnly(a28);
                y27.success(null);
                break;
            }
            case "get": {
                this.channel.frameworkHasRequestedData = true;
                if (this.channel.engineHasProvidedData || !this.channel.waitForRestorationData) {
                    y27.success(RestorationChannelMethodCallHandler.packageData(this.channel.getRestorationData()));
                }
                else {
                    this.channel.pendingFrameworkRestorationChannelRequest = y27;
                }
                break;
            }
            default: {
                y27.notImplemented();
                break;
            }
        }
    }
    static packageData(v27: Uint8Array): Map<string, Any> {
        const w27: Map<string, Any> = new Map();
        w27.set("enabled", true);
        w27.set("data", v27);
        return w27;
    }
}
