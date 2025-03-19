import type { FlutterView } from '../view/FlutterView';
import type common from "@ohos:app.ability.common";
import PlatformViewController from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/platform/PlatformViewsController";
export default class FlutterPluginRegistry {
    private mPlatformViewsController: PlatformViewController;
    private mFlutterView: FlutterView | null = null;
    private mContext: common.Context | null = null;
    constructor() {
        this.mPlatformViewsController = new PlatformViewController();
        this.mFlutterView = null;
        this.mContext = null;
    }
    attach(t: FlutterView, u: common.Context): void {
        this.mFlutterView = t;
        this.mContext = u;
    }
    detach(): void {
        this.mPlatformViewsController.detach();
        this.mPlatformViewsController.onDetachedFromNapi();
        this.mFlutterView = null;
        this.mContext = null;
    }
    destroy(): void {
        this.mPlatformViewsController.onDetachedFromNapi();
    }
    onPreEngineRestart(): void {
        this.mPlatformViewsController.onPreEngineRestart();
    }
}
