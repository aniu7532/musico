import type common from "@ohos:app.ability.common";
import fs from "@ohos:file.fs";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
const TAG: string = "PathUtils";
export default class PathUtils {
    static getFilesDir(q82: common.Context): string {
        return q82.filesDir;
    }
    static getCacheDirectory(p82: common.Context): string {
        return p82.cacheDir;
    }
    static getDataDirectory(l82: common.Context): string | null {
        const m82 = "flutter";
        const n82 = l82.filesDir + "/" + m82;
        if (!fs.accessSync(n82)) {
            try {
                fs.mkdirSync(n82);
            }
            catch (o82) {
                Log.e(TAG, "mkdirSync failed err:" + o82);
                return null;
            }
        }
        return n82;
    }
}
