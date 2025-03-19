import { Log } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/index";
import type { FlutterEngine } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/index";
import AudioplayersPlugin from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/index";
import PathProviderPlugin from "@package:pkg_modules/.ohpm/path_provider_ohos@2tfoif7r9m9lvtbyv3j7hzyr7wmahpiqbwu9dwlcftu=/pkg_modules/path_provider_ohos/index";
const TAG = "GeneratedPluginRegistrant";
export class GeneratedPluginRegistrant {
    static registerWith(r: FlutterEngine) {
        try {
            r.getPlugins()?.add(new AudioplayersPlugin());
            r.getPlugins()?.add(new PathProviderPlugin());
        }
        catch (s) {
            Log.e(TAG, "Tried to register plugins with FlutterEngine ("
                + r
                + ") failed.");
            Log.e(TAG, "Received exception while registering", s);
        }
    }
}
