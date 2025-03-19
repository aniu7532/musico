import { PlatformBrightness } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/SettingsChannel";
import type SettingsChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/SettingsChannel";
import I18n from "@ohos:i18n";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type { MediaQuery } from "@ohos:arkui.UIContext";
const TAG = "Settings";
export default class Settings {
    settingsChannel: SettingsChannel | null;
    constructor(settingsChannel: SettingsChannel | null) {
        this.settingsChannel = settingsChannel;
    }
    sendSettings(mediaQuery: MediaQuery): void {
        this.settingsChannel?.startMessage()
            .setAlwaysUse24HourFormat(I18n.System.is24HourClock())
            .setNativeSpellCheckServiceDefined(false)
            .setBrieflyShowPassword(false)
            .setPlatformBrightness(this.getThemeMode(mediaQuery))
            .setTextScaleFactor(this.getTextScaleFactor())
            .send();
    }
    getThemeMode(mediaQuery: MediaQuery): PlatformBrightness {
        let listener = mediaQuery.matchMediaSync('(dark-mode: true)');
        if (listener.matches) {
            Log.i(TAG, "return dark");
            return PlatformBrightness.DARK;
        }
        else {
            Log.i(TAG, "return light");
            return PlatformBrightness.LIGHT;
        }
    }
    getTextScaleFactor(): number {
        let sysTextScaleFactor = AppStorage.get<number>('fontSizeScale');
        if (sysTextScaleFactor == undefined) {
            sysTextScaleFactor = 1.0;
            Log.e(TAG, 'get textScaleFactor error, it is assigned to ' + JSON.stringify(sysTextScaleFactor));
        }
        Log.i(TAG, "return textScaleFactor = " + JSON.stringify(sysTextScaleFactor));
        return sysTextScaleFactor;
    }
}
