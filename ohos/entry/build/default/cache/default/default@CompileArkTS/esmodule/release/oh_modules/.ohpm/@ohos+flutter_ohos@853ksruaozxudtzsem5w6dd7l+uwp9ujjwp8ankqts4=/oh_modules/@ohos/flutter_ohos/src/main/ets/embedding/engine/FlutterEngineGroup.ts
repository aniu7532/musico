import FlutterEngine from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterEngine";
import type { EngineLifecycleListener } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterEngine";
import type common from "@ohos:app.ability.common";
import type FlutterLoader from './loader/FlutterLoader';
import FlutterInjector from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/FlutterInjector";
import { DartEntrypoint } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/dart/DartExecutor";
import PlatformViewsController from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/platform/PlatformViewsController";
import ArrayList from "@ohos:util.ArrayList";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
const TAG = "FlutterEngineGroup";
export default class FlutterEngineGroup {
    private activeEngines: ArrayList<FlutterEngine> = new ArrayList<FlutterEngine>();
    constructor() {
    }
    async checkLoader(b9: common.Context, c9: Array<string>) {
        let d9: FlutterLoader = FlutterInjector.getInstance().getFlutterLoader();
        if (!d9.initialized) {
            await d9.startInitialization(b9);
            d9.ensureInitializationComplete(c9);
        }
    }
    async createAndRunEngineByOptions(r8: Options) {
        let s8: FlutterEngine | null = null;
        let t8: common.Context = r8.getContext();
        let u8: DartEntrypoint | null = r8.getDartEntrypoint();
        let v8: string = r8.getInitialRoute();
        let w8: Array<string> = r8.getDartEntrypointArgs();
        let x8: PlatformViewsController | null = r8.getPlatformViewsController();
        let y8: boolean = r8.getWaitForRestorationData();
        if (u8 == null) {
            u8 = DartEntrypoint.createDefault();
        }
        if (x8 == null) {
            x8 = new PlatformViewsController();
        }
        Log.i(TAG, "shellHolder, this.activeEngines.length=" + this.activeEngines.length);
        if (this.activeEngines.length == 0) {
            s8 = this.createEngine(t8, x8);
            await s8.init(t8, null, y8);
            if (v8 != null) {
                s8.getNavigationChannel()?.setInitialRoute(v8);
            }
            s8.getDartExecutor().executeDartEntrypoint(u8, w8);
        }
        else {
            s8 = await this.activeEngines[0]
                .spawn(t8, u8, v8, w8, x8, y8);
        }
        this.activeEngines.add(s8);
        const z8 = s8;
        let a9: EngineLifecycleListener = new EngineLifecycleListenerImpl(x8, this.activeEngines, z8);
        s8?.addEngineLifecycleListener(a9);
        return s8;
    }
    createEngine(p8: common.Context, q8: PlatformViewsController): FlutterEngine {
        return new FlutterEngine(p8, null, null, q8);
    }
}
class EngineLifecycleListenerImpl implements EngineLifecycleListener {
    private platformViewsController: PlatformViewsController;
    private activeEngines: ArrayList<FlutterEngine> = new ArrayList();
    private engine: FlutterEngine | null;
    constructor(m8: PlatformViewsController, n8: ArrayList<FlutterEngine>, o8: FlutterEngine | null) {
        this.platformViewsController = m8;
        this.activeEngines = n8;
        this.engine = o8;
    }
    onPreEngineRestart(): void {
        this.platformViewsController.onPreEngineRestart();
    }
    onEngineWillDestroy(): void {
        this.activeEngines.remove(this.engine);
    }
}
export class Options {
    private context: common.Context;
    private dartEntrypoint: DartEntrypoint | null = null;
    private initialRoute: string = '';
    private dartEntrypointArgs: Array<string> = [];
    private platformViewsController: PlatformViewsController | null = null;
    private waitForRestorationData: boolean = false;
    constructor(l8: common.Context) {
        this.context = l8;
    }
    getContext(): common.Context {
        return this.context;
    }
    getDartEntrypoint(): DartEntrypoint | null {
        return this.dartEntrypoint;
    }
    getInitialRoute(): string {
        return this.initialRoute;
    }
    getDartEntrypointArgs(): Array<string> {
        return this.dartEntrypointArgs;
    }
    getWaitForRestorationData(): boolean {
        return this.waitForRestorationData;
    }
    getPlatformViewsController(): PlatformViewsController | null {
        return this.platformViewsController;
    }
    setDartEntrypoint(k8: DartEntrypoint): Options {
        this.dartEntrypoint = k8;
        return this;
    }
    setInitialRoute(j8: string): Options {
        this.initialRoute = j8;
        return this;
    }
    setDartEntrypointArgs(i8: Array<string>): Options {
        this.dartEntrypointArgs = i8;
        return this;
    }
    setWaitForRestorationData(h8: boolean): Options {
        this.waitForRestorationData = h8;
        return this;
    }
    setPlatformViewsController(g8: PlatformViewsController): Options {
        this.platformViewsController = g8;
        return this;
    }
}
