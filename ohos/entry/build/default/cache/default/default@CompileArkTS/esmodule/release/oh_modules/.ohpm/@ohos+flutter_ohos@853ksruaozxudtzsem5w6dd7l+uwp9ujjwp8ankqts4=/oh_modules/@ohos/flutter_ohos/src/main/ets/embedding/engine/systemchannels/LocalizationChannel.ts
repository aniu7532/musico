import type DartExecutor from '../dart/DartExecutor';
import MethodChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type { MethodCallHandler, MethodResult } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type MethodCall from '../../../plugin/common/MethodCall';
import JSONMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMethodCodec";
import intl from "@ohos:intl";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
const TAG = "LocalizationChannel";
export default class LocalizationChannel implements MethodCallHandler {
    private static TAG = "LocalizationChannel";
    private static CHANNEL_NAME = "flutter/localization";
    private channel: MethodChannel;
    private localizationMessageHandler: LocalizationMessageHandler | null = null;
    onMethodCall(y20: MethodCall, z20: MethodResult): void {
        if (this.localizationMessageHandler == null) {
            Log.e(TAG, "localizationMessageHandler is null");
            return;
        }
        let a21: string = y20.method;
        switch (a21) {
            case "Localization.getStringResource": {
                Log.i(TAG, "Localization.getStringResource enter");
                let b21: string = y20.argument("key");
                let c21: string = "";
                if (y20.hasArgument("locale")) {
                    c21 = y20.argument("locale");
                }
                z20.success(this.localizationMessageHandler?.getStringResource(b21, c21));
                break;
            }
            default: {
                z20.notImplemented();
                break;
            }
        }
    }
    constructor(x20: DartExecutor) {
        this.channel = new MethodChannel(x20, LocalizationChannel.CHANNEL_NAME, JSONMethodCodec.INSTANCE);
        this.channel.setMethodCallHandler(this);
    }
    setLocalizationMessageHandler(w20: LocalizationMessageHandler): void {
        this.localizationMessageHandler = w20;
    }
    sendLocales(s20: Array<string>): void {
        let t20: Array<string> = [];
        for (let u20 = 0; u20 < s20.length; u20++) {
            let v20 = new intl.Locale(s20[u20]);
            t20.push(v20.language);
            t20.push(v20.region);
            t20.push(v20.script);
            t20.push('');
        }
        this.channel.invokeMethod("setLocale", t20);
    }
}
export interface LocalizationMessageHandler {
    getStringResource(key: string, local: string): void;
}
