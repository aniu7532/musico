import FlutterNapi from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterNapi";
import FlutterLoader from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/loader/FlutterLoader";
export default class FlutterInjector {
    private static instance: FlutterInjector;
    private flutterLoader: FlutterLoader;
    static getInstance(): FlutterInjector {
        if (FlutterInjector.instance == null) {
            FlutterInjector.instance = new FlutterInjector();
        }
        return FlutterInjector.instance;
    }
    private constructor() {
        this.flutterLoader = new FlutterLoader(this.getFlutterNapi());
    }
    getFlutterLoader(): FlutterLoader {
        return this.flutterLoader;
    }
    getFlutterNapi(): FlutterNapi {
        return new FlutterNapi();
    }
}
