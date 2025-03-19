import type LocalizationChannel from '../../embedding/engine/systemchannels/LocalizationChannel';
import type { LocalizationMessageHandler } from '../../embedding/engine/systemchannels/LocalizationChannel';
import type common from "@ohos:app.ability.common";
import intl from "@ohos:intl";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import i18n from "@ohos:i18n";
const TAG = "LocalizationPlugin";
export default class LocalizationPlugin {
    private localizationChannel: LocalizationChannel;
    private context: common.Context;
    localeFromString(u66: string): intl.Locale {
        u66 = u66.replace('_', '-');
        let v66: string[] = u66.split('-', -1);
        let w66 = v66[0];
        let x66 = "";
        let y66 = "";
        let z66: number = 1;
        if (v66.length > z66 && v66[z66].length == 4) {
            x66 = v66[z66];
            z66++;
        }
        if (v66.length > z66 && v66[z66].length >= 2 && v66[z66].length <= 3) {
            y66 = v66[z66];
            z66++;
        }
        return new intl.Locale(w66 + '-' + y66 + '-' + x66);
    }
    private localizationMessageHandler: LocalizationMessageHandler = new enterGetStringResource((m66: string, n66: string | null) => {
        Log.i(TAG, "getStringResource,key: " + m66 + ",localeString: " + n66);
        let o66: common.Context = this.context;
        let p66: string | null = null;
        let q66 = o66.resourceManager;
        try {
            if (n66) {
                let s66 = q66.getOverrideConfiguration();
                s66.locale = n66;
                let t66 = q66.getOverrideResourceManager(s66);
                p66 = t66.getStringByNameSync(m66);
            }
            else {
                p66 = q66.getStringByNameSync(m66);
            }
        }
        catch (r66) {
            Log.e(TAG, r66);
            return null;
        }
        return p66;
    });
    constructor(k66: common.Context, l66: LocalizationChannel) {
        this.context = k66;
        this.localizationChannel = l66;
        this.localizationChannel.setLocalizationMessageHandler(this.localizationMessageHandler);
    }
    sendLocaleToFlutter(): void {
        let i66: string = i18n.System.getSystemLocale();
        let j66: Array<string> = [];
        j66.push(i66);
        this.localizationChannel.sendLocales(j66);
    }
}
class enterGetStringResource {
    getStringResource: (key: string, localeString: string | null) => string | null;
    constructor(h66: (key: string, localeString: string | null) => string | null) {
        this.getStringResource = h66;
    }
}
