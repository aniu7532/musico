import FlutterNapi from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterNapi";
import FlutterLoader from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/loader/FlutterLoader";
/**
 * flutter相关主要类的单例持有，帮助实现自身和其他类的实例化管理
 */
export default class FlutterInjector {
    private static instance: FlutterInjector;
    private flutterLoader: FlutterLoader;
    static getInstance(): FlutterInjector {
        if (FlutterInjector.instance == null) {
            FlutterInjector.instance = new FlutterInjector();
        }
        return FlutterInjector.instance;
    }
    /**
     * 初始化
     */
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
