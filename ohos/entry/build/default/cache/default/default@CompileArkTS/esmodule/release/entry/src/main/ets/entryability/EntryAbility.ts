import { FlutterAbility } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/index";
import type { FlutterEngine } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/index";
import { GeneratedPluginRegistrant } from "@bundle:com.example.beat/entry/ets/plugins/GeneratedPluginRegistrant";
export default class EntryAbility extends FlutterAbility {
    configureFlutterEngine(a: FlutterEngine) {
        super.configureFlutterEngine(a);
        GeneratedPluginRegistrant.registerWith(a);
    }
}
