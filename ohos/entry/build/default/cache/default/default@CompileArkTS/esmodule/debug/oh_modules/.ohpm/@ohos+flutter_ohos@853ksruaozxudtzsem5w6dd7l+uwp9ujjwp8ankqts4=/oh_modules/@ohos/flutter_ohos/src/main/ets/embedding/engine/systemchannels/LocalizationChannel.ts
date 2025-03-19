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
    onMethodCall(call: MethodCall, result: MethodResult): void {
        if (this.localizationMessageHandler == null) {
            Log.e(TAG, "localizationMessageHandler is null");
            return;
        }
        let method: string = call.method;
        switch (method) {
            case "Localization.getStringResource": {
                Log.i(TAG, "Localization.getStringResource enter");
                let key: string = call.argument("key");
                let localeString: string = "";
                if (call.hasArgument("locale")) {
                    localeString = call.argument("locale");
                }
                result.success(this.localizationMessageHandler?.getStringResource(key, localeString));
                break;
            }
            default: {
                result.notImplemented();
                break;
            }
        }
    }
    constructor(dartExecutor: DartExecutor) {
        this.channel = new MethodChannel(dartExecutor, LocalizationChannel.CHANNEL_NAME, JSONMethodCodec.INSTANCE);
        this.channel.setMethodCallHandler(this);
    }
    setLocalizationMessageHandler(localizationMessageHandler: LocalizationMessageHandler): void {
        this.localizationMessageHandler = localizationMessageHandler;
    }
    sendLocales(locales: Array<string>): void {
        let data: Array<string> = [];
        for (let i = 0; i < locales.length; i++) {
            let locale = new intl.Locale(locales[i]);
            data.push(locale.language);
            data.push(locale.region);
            data.push(locale.script);
            data.push(''); // locale.getVariant locale的一种变体
        }
        this.channel.invokeMethod("setLocale", data);
    }
}
export interface LocalizationMessageHandler {
    getStringResource(key: string, local: string): void;
}
