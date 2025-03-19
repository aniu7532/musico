import HiLog from "@ohos:hilog";
import BuildProfile from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/BuildProfile";
const DOMAIN: number = 0x00FF;
const TAG = "Flutter";
const SYMBOL = " --> ";
export default class Log {
    private static _logLevel = HiLog.LogLevel.WARN;
    public static setLogLevel(g82: HiLog.LogLevel) {
        Log._logLevel = g82;
    }
    static d(d82: string, e82: string, ...f82: Object[]) {
        if (Log.isLoggable(HiLog.LogLevel.DEBUG)) {
            HiLog.debug(DOMAIN, TAG, d82 + SYMBOL + e82, f82);
        }
    }
    static i(a82: string, b82: string, ...c82: Object[]) {
        if (Log.isLoggable(HiLog.LogLevel.INFO)) {
            HiLog.info(DOMAIN, TAG, a82 + SYMBOL + b82, c82);
        }
    }
    static w(x81: string, y81: string, ...z81: Object[]) {
        if (Log.isLoggable(HiLog.LogLevel.WARN)) {
            HiLog.warn(DOMAIN, TAG, x81 + SYMBOL + y81, z81);
        }
    }
    static e(s81: string, t81: string, ...u81: Object[]) {
        if (Log.isLoggable(HiLog.LogLevel.ERROR)) {
            u81.forEach((v81: Object, w81: number) => {
                if (v81 instanceof Error) {
                    u81[w81] = v81.message + v81.stack;
                }
                t81 += "%{public}s";
            });
            HiLog.error(DOMAIN, TAG, s81 + SYMBOL + t81, u81);
        }
    }
    static f(p81: string, q81: string, ...r81: Object[]) {
        if (Log.isLoggable(HiLog.LogLevel.FATAL)) {
            HiLog.fatal(DOMAIN, TAG, p81 + SYMBOL + q81, r81);
        }
    }
    private static isLoggable(n81: HiLog.LogLevel): boolean {
        let o81: string = BuildProfile.BUILD_MODE_NAME.toLowerCase();
        if (o81 == 'release' || o81 == 'profile') {
            return n81 >= Log._logLevel && HiLog.isLoggable(DOMAIN, TAG, n81);
        }
        return HiLog.isLoggable(DOMAIN, TAG, n81);
    }
}
