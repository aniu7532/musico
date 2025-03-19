import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import JSONMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMessageCodec";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
export enum PlatformBrightness {
    LIGHT = "light",
    DARK = "dark"
}
const TAG = "SettingsChannel";
const TEXT_SCALE_FACTOR = "textScaleFactor";
const NATIVE_SPELL_CHECK_SERVICE_DEFINED = "nativeSpellCheckServiceDefined";
const BRIEFLY_SHOW_PASSWORD = "brieflyShowPassword";
const ALWAYS_USE_24_HOUR_FORMAT = "alwaysUse24HourFormat";
const PLATFORM_BRIGHTNESS = "platformBrightness";
export default class SettingsChannel {
    private static CHANNEL_NAME = "flutter/settings";
    private channel: BasicMessageChannel<Object>;
    constructor(v28: DartExecutor) {
        this.channel = new BasicMessageChannel<Object>(v28, SettingsChannel.CHANNEL_NAME, JSONMessageCodec.INSTANCE);
    }
    startMessage(): MessageBuilder {
        return new MessageBuilder(this.channel);
    }
}
class MessageBuilder {
    private channel: BasicMessageChannel<Object>;
    private settingsMessage: SettingsMessage = new SettingsMessage();
    constructor(u28: BasicMessageChannel<Object>) {
        this.channel = u28;
    }
    setTextScaleFactor(t28: Number): MessageBuilder {
        this.settingsMessage.setTextScaleFactor(t28);
        return this;
    }
    setNativeSpellCheckServiceDefined(s28: boolean): MessageBuilder {
        this.settingsMessage.setNativeSpellCheckServiceDefined(s28);
        return this;
    }
    setBrieflyShowPassword(r28: boolean): MessageBuilder {
        this.settingsMessage.setBrieflyShowPassword(r28);
        return this;
    }
    setAlwaysUse24HourFormat(q28: boolean): MessageBuilder {
        this.settingsMessage.setAlwaysUse24HourFormat(q28);
        return this;
    }
    setPlatformBrightness(p28: PlatformBrightness): MessageBuilder {
        this.settingsMessage.setPlatformBrightness(p28);
        return this;
    }
    send(): void {
        Log.i(TAG, "Sending message: "
            + TEXT_SCALE_FACTOR + " : "
            + this.settingsMessage.getTextScaleFactor()
            + ", " + NATIVE_SPELL_CHECK_SERVICE_DEFINED + " : "
            + this.settingsMessage.getNativeSpellCheckServiceDefined()
            + ", " + BRIEFLY_SHOW_PASSWORD + " : "
            + this.settingsMessage.getBrieflyShowPassword()
            + ", " + ALWAYS_USE_24_HOUR_FORMAT + " : "
            + this.settingsMessage.getAlwaysUse24HourFormat()
            + ", " + PLATFORM_BRIGHTNESS + " : "
            + this.settingsMessage.getPlatformBrightness());
        this.channel.send(this.settingsMessage);
    }
}
class SettingsMessage {
    private textScaleFactor: Number = 1.0;
    private nativeSpellCheckServiceDefined: boolean = false;
    private brieflyShowPassword: boolean = false;
    private alwaysUse24HourFormat: boolean = false;
    private platformBrightness: PlatformBrightness = PlatformBrightness.LIGHT;
    setTextScaleFactor(o28: Number): void {
        this.textScaleFactor = o28;
    }
    setNativeSpellCheckServiceDefined(n28: boolean): void {
        this.nativeSpellCheckServiceDefined = n28;
    }
    setBrieflyShowPassword(m28: boolean): void {
        this.brieflyShowPassword = m28;
    }
    setAlwaysUse24HourFormat(l28: boolean): void {
        this.alwaysUse24HourFormat = l28;
    }
    setPlatformBrightness(k28: PlatformBrightness): void {
        this.platformBrightness = k28;
    }
    getTextScaleFactor(): Number {
        return this.textScaleFactor;
    }
    getNativeSpellCheckServiceDefined(): boolean {
        return this.nativeSpellCheckServiceDefined;
    }
    getBrieflyShowPassword(): boolean {
        return this.brieflyShowPassword;
    }
    getAlwaysUse24HourFormat(): boolean {
        return this.alwaysUse24HourFormat;
    }
    getPlatformBrightness(): PlatformBrightness {
        return this.platformBrightness;
    }
}
