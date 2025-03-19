import FlutterApplicationInfo from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/loader/FlutterApplicationInfo";
import type common from "@ohos:app.ability.common";
export default class ApplicationInfoLoader {
    static load(j14: common.Context) {
        let k14 = new FlutterApplicationInfo(null, null, null, null, null, j14.bundleCodeDir + '/libs/arm64', true);
        return k14;
    }
}
