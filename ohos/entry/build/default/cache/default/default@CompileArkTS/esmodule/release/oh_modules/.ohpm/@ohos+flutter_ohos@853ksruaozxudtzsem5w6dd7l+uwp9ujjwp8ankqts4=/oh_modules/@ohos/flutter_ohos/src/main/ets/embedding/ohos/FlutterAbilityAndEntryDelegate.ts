import type common from "@ohos:app.ability.common";
import type FlutterEngineConfigurator from './FlutterEngineConfigurator';
import type FlutterEngineProvider from './FlutterEngineProvider';
import type FlutterEngine from '../engine/FlutterEngine';
import type PlatformPlugin from '../../plugin/PlatformPlugin';
import type { PlatformPluginDelegate } from '../../plugin/PlatformPlugin';
import type Want from "@ohos:app.ability.Want";
import FlutterShellArgs from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterShellArgs";
import { DartEntrypoint } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/dart/DartExecutor";
import FlutterAbilityLaunchConfigs from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterAbilityLaunchConfigs";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import FlutterInjector from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/FlutterInjector";
import type UIAbility from "@ohos:app.ability.UIAbility";
import type ExclusiveAppComponent from './ExclusiveAppComponent';
import AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type { FlutterPlugin } from '../engine/plugins/FlutterPlugin';
import FlutterEngineCache from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterEngineCache";
import FlutterEngineGroupCache from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterEngineGroupCache";
import FlutterEngineGroup, { Options } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterEngineGroup";
import type FlutterNapi from '../engine/FlutterNapi';
import type { FlutterView } from '../../view/FlutterView';
import FlutterManager from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterManager";
import type Any from '../../plugin/common/Any';
import inputMethod from "@ohos:inputMethod";
const TAG = "FlutterAbilityDelegate";
const PLUGINS_RESTORATION_BUNDLE_KEY = "plugins";
const FRAMEWORK_RESTORATION_BUNDLE_KEY = "framework";
const EVENT_BACK_PRESS = 'EVENT_BACK_PRESS';
class FlutterAbilityAndEntryDelegate implements ExclusiveAppComponent<UIAbility> {
    protected host?: Host | null;
    flutterEngine?: FlutterEngine | null;
    platformPlugin?: PlatformPlugin;
    protected context?: common.Context;
    protected isFlutterEngineFromHostOrCache: boolean = false;
    private engineGroup?: FlutterEngineGroup;
    private isHost: boolean = false;
    private flutterView?: FlutterView;
    private inputMethodController: inputMethod.InputMethodController = inputMethod.getController();
    constructor(v35?: Host) {
        this.host = v35;
        if (this.host) {
            this.isHost = true;
        }
    }
    isAttached = false;
    async onAttach(u35: common.Context): Promise<void> {
        this.context = u35;
        this.ensureAlive();
        if (this.flutterEngine == null) {
            await this.setupFlutterEngine();
        }
        if (this.host?.shouldAttachEngineToAbility()) {
            Log.d(TAG, "Attaching FlutterEngine to the Ability that owns this delegate.");
            this.flutterEngine?.getAbilityControlSurface()?.attachToAbility(this);
        }
        this.platformPlugin = this.host?.providePlatformPlugin(this.flutterEngine!);
        this.isAttached = true;
        if (this.flutterEngine) {
            this.flutterEngine.getSystemLanguages();
        }
        if (this.flutterEngine && this.flutterView && this.host?.attachToEngineAutomatically()) {
            this.flutterView.attachToFlutterEngine(this.flutterEngine!!);
        }
        this.host?.configureFlutterEngine(this.flutterEngine!!);
        this.context.eventHub.on(EVENT_BACK_PRESS, () => {
            if (this.flutterView?.getKeyboardHeight() == 0) {
                this.flutterEngine?.getNavigationChannel()?.popRoute();
                this.flutterEngine?.getPlatformViewsController()?.setBackNodeControllers();
            }
            else {
                this.inputMethodController.detach();
            }
        });
    }
    private doInitialFlutterViewRun(): void {
        let q35 = this.host?.getInitialRoute();
        if (q35 == null && this.host != null) {
            q35 = this.maybeGetInitialRouteFromIntent(this.host.getWant());
        }
        if (q35 == null) {
            q35 = FlutterAbilityLaunchConfigs.DEFAULT_INITIAL_ROUTE;
        }
        const r35 = this.host?.getDartEntrypointLibraryUri();
        Log.d(TAG, "Executing Dart entrypoint: " + this.host?.getDartEntrypointFunctionName() + ", library uri: " + r35 == null ? "\"\"" : r35 + ", and sending initial route: " + q35);
        this.flutterEngine?.getNavigationChannel()?.setInitialRoute(q35 ?? '');
        let s35 = this.host?.getAppBundlePath();
        if (s35 == null || s35 == '') {
            s35 = FlutterInjector.getInstance().getFlutterLoader().findAppBundlePath();
        }
        const t35: DartEntrypoint = new DartEntrypoint(s35, this.host?.getDartEntrypointLibraryUri() ?? '', this.host?.getDartEntrypointFunctionName() ?? '');
        this.flutterEngine?.dartExecutor.executeDartEntrypoint(t35, this.host?.getDartEntrypointArgs());
    }
    private maybeGetInitialRouteFromIntent(p35: Want): string {
        return '';
    }
    onRestoreInstanceState(n35: Want) {
        let o35: Uint8Array = this.getRestorationData(n35.parameters as Record<string, Object>);
        if (this.host?.shouldRestoreAndSaveState()) {
            this.flutterEngine?.getRestorationChannel()?.setRestorationData(o35);
        }
    }
    private getRestorationData(i35: Record<string, Object>): Uint8Array {
        let j35: Uint8Array = new Uint8Array(1).fill(0);
        if (i35 == null) {
            return j35;
        }
        if (i35[FRAMEWORK_RESTORATION_BUNDLE_KEY] == undefined) {
            return j35;
        }
        if (typeof i35[FRAMEWORK_RESTORATION_BUNDLE_KEY] == 'object') {
            let k35: Record<string, Any> = i35[FRAMEWORK_RESTORATION_BUNDLE_KEY] as Record<string, Any>;
            let l35: Array<number> = new Array;
            Object.keys(k35).forEach(m35 => {
                l35.push(k35[m35]);
            });
            j35 = Uint8Array.from(l35);
        }
        return j35;
    }
    async setupFlutterEngine() {
        const d35 = this.host?.getCachedEngineId();
        Log.d(TAG, "cachedEngineId=" + d35);
        if (d35 && d35.length > 0) {
            this.flutterEngine = FlutterEngineCache.getInstance().get(d35);
            this.isFlutterEngineFromHostOrCache = true;
            if (this.flutterEngine == null) {
                throw new Error("The requested cached FlutterEngine did not exist in the FlutterEngineCache: '"
                    + d35
                    + "'");
            }
            return;
        }
        if (this.host && this.context) {
            this.flutterEngine = this.host.provideFlutterEngine(this.context);
        }
        if (this.flutterEngine != null) {
            this.isFlutterEngineFromHostOrCache = true;
            return;
        }
        const e35 = this.host?.getCachedEngineGroupId();
        Log.d(TAG, "cachedEngineGroupId=" + e35);
        if (e35 != null) {
            const h35 = FlutterEngineGroupCache.instance.get(e35);
            if (h35 == null) {
                throw new Error("The requested cached FlutterEngineGroup did not exist in the FlutterEngineGroupCache: '"
                    + e35
                    + "'");
            }
            if (this.context != null) {
                this.flutterEngine = await h35.createAndRunEngineByOptions(this.addEntrypointOptions(new Options(this.context)));
            }
            this.isFlutterEngineFromHostOrCache = false;
            return;
        }
        Log.d(TAG, "No preferred FlutterEngine was provided. Creating a new FlutterEngine for this FlutterAbility.");
        let f35 = this.engineGroup;
        if (f35 == null && this.context != null) {
            f35 = new FlutterEngineGroup();
            const g35 = this.host ? this.host.getFlutterShellArgs() : new FlutterShellArgs();
            await f35.checkLoader(this.context, g35.toArray() ?? []);
            this.engineGroup = f35;
        }
        if (this.context) {
            this.flutterEngine = await f35?.createAndRunEngineByOptions(this.addEntrypointOptions(new Options(this.context)
                .setWaitForRestorationData(this.host?.shouldRestoreAndSaveState() || false)));
        }
        this.isFlutterEngineFromHostOrCache = false;
    }
    addEntrypointOptions(z34: Options): Options {
        let a35 = this.host?.getAppBundlePath();
        if (a35 == null || a35.length == 0) {
            a35 = FlutterInjector.getInstance().getFlutterLoader().findAppBundlePath();
        }
        const b35 = new DartEntrypoint(a35 ?? '', '', this.host?.getDartEntrypointFunctionName() ?? '');
        let c35 = this.host?.getInitialRoute();
        if (c35 == null && this.host != null) {
            c35 = this.maybeGetInitialRouteFromIntent(this.host.getWant());
        }
        if (c35 == null) {
            c35 = FlutterAbilityLaunchConfigs.DEFAULT_INITIAL_ROUTE;
        }
        return z34.setDartEntrypoint(b35)
            .setInitialRoute(c35)
            .setDartEntrypointArgs(this.host?.getDartEntrypointArgs() ?? []);
    }
    createView(y34: Context): FlutterView {
        this.flutterView = FlutterManager.getInstance().createFlutterView(y34);
        if (this.flutterEngine && this.host?.attachToEngineAutomatically()) {
            this.flutterView.attachToFlutterEngine(this.flutterEngine!!);
        }
        return this.flutterView;
    }
    release() {
        this.host = null;
        this.flutterEngine = null;
        this.platformPlugin = undefined;
    }
    onDetach() {
        if (this.host?.shouldAttachEngineToAbility()) {
            Log.d(TAG, "Detaching FlutterEngine from the Ability");
            this.flutterEngine?.getAbilityControlSurface()?.detachFromAbility();
        }
        this.flutterView?.detachFromFlutterEngine();
        this.host?.cleanUpFlutterEngine(this.flutterEngine!!);
        if (this.host?.shouldDispatchAppLifecycleState() && this.flutterEngine != null) {
            this.flutterEngine?.getLifecycleChannel()?.appIsDetached();
        }
        if (this.platformPlugin) {
            this.platformPlugin.destroy();
        }
        if (this.host?.shouldDestroyEngineWithHost()) {
            this.flutterEngine?.destroy();
            if (this.host.getCachedEngineId() != null && this.host.getCachedEngineId().length > 0) {
                FlutterEngineCache.getInstance().remove(this.host.getCachedEngineId());
            }
            this.flutterEngine = null;
        }
        this.isAttached = false;
        this.context?.eventHub.off(EVENT_BACK_PRESS);
    }
    onLowMemory(): void {
        this.getFlutterNapi()?.notifyLowMemoryWarning();
        this.flutterEngine?.getSystemChannel()?.sendMemoryPressureWarning();
    }
    onCreate() {
        this.ensureAlive();
        if (this.shouldDispatchAppLifecycleState()) {
            this.flutterEngine?.getLifecycleChannel()?.appIsResumed();
        }
    }
    onWindowStageCreate() {
        this.ensureAlive();
        this.doInitialFlutterViewRun();
        if (this.shouldDispatchAppLifecycleState()) {
            this.flutterEngine?.getLifecycleChannel()?.appIsResumed();
        }
    }
    onWindowStageDestroy() {
    }
    onWindowFocusChanged(x34: boolean): void {
        if (this.shouldDispatchAppLifecycleState()) {
            this.flutterEngine?.getAbilityControlSurface()?.onWindowFocusChanged(x34);
            if (x34) {
                this.flutterEngine?.getLifecycleChannel()?.aWindowIsFocused();
            }
            else {
                this.flutterEngine?.getLifecycleChannel()?.noWindowsAreFocused();
            }
        }
    }
    onForeground() {
        this.ensureAlive();
        if (this.shouldDispatchAppLifecycleState()) {
            this.flutterEngine?.getLifecycleChannel()?.appIsResumed();
            this.flutterEngine?.getLifecycleChannel()?.aWindowIsFocused();
        }
    }
    onBackground() {
        if (this.shouldDispatchAppLifecycleState()) {
            this.flutterEngine?.getLifecycleChannel()?.noWindowsAreFocused();
            this.flutterEngine?.getLifecycleChannel()?.appIsPaused();
        }
    }
    shouldDispatchAppLifecycleState(): boolean {
        if (!this.isHost) {
            return this.isAttached;
        }
        if (this.host == null) {
            return false;
        }
        return this.host.shouldDispatchAppLifecycleState() && this.isAttached;
    }
    ensureAlive() {
        if (this.isHost && this.host == null) {
            throw new Error("Cannot execute method on a destroyed FlutterAbilityDelegate.");
        }
    }
    getFlutterNapi(): FlutterNapi | null {
        return this.flutterEngine?.getFlutterNapi() ?? null;
    }
    getFlutterEngine(): FlutterEngine | null {
        return this.flutterEngine ?? null;
    }
    detachFromFlutterEngine() {
        if (this.host?.shouldDestroyEngineWithHost()) {
            throw new Error("The internal FlutterEngine created by "
                + this.host
                + " has been attached to by another Ability. To persist a FlutterEngine beyond the "
                + "ownership of this ablity, explicitly create a FlutterEngine");
        }
        this.host?.detachFromFlutterEngine();
    }
    getAppComponent(): UIAbility {
        const w34 = this.host?.getAbility();
        if (w34 == null) {
            throw new Error("FlutterAbilityAndFragmentDelegate's getAppComponent should only "
                + "be queried after onAttach, when the host's ability should always be non-null");
        }
        return w34;
    }
    onNewWant(t34: Want, u34: AbilityConstant.LaunchParam): void {
        this.ensureAlive();
        if (this.flutterEngine != null) {
            Log.i(TAG, "Forwarding onNewWant() to FlutterEngine and sending pushRouteInformation message.");
            this.flutterEngine?.getAbilityControlSurface()?.onNewWant(t34, u34);
            const v34 = this.maybeGetInitialRouteFromIntent(t34);
            if (v34 && v34.length > 0) {
                this.flutterEngine?.getNavigationChannel()?.pushRouteInformation(v34);
            }
        }
        else {
            Log.w(TAG, "onNewIntent() invoked before FlutterFragment was attached to an Ability.");
        }
    }
    onSaveState(p34: AbilityConstant.StateType, q34: Record<string, Object>): AbilityConstant.OnSaveResult {
        Log.i(TAG, "onSaveInstanceState. Giving framework and plugins an opportunity to save state.");
        this.ensureAlive();
        if (this.host?.shouldRestoreAndSaveState()) {
            q34[FRAMEWORK_RESTORATION_BUNDLE_KEY] = this.flutterEngine!.getRestorationChannel()!.getRestorationData();
        }
        if (this.host?.shouldAttachEngineToAbility()) {
            const r34: Record<string, Object> = {};
            const s34 = this.flutterEngine?.getAbilityControlSurface()?.onSaveState(p34, r34);
            q34[PLUGINS_RESTORATION_BUNDLE_KEY] = r34;
            return s34 ?? AbilityConstant.OnSaveResult.ALL_REJECT;
        }
        return AbilityConstant.OnSaveResult.ALL_REJECT;
    }
    addPlugin(o34: FlutterPlugin): void {
        this.flutterEngine?.getPlugins()?.add(o34);
    }
    removePlugin(n34: FlutterPlugin): void {
        this.flutterEngine?.getPlugins()?.remove(n34.getUniqueClassName());
    }
    isFlutterEngineFromHost(): boolean {
        return this.isFlutterEngineFromHostOrCache;
    }
    initWindow() {
        if (this.flutterEngine && this.isAttached) {
            this.platformPlugin?.initWindow();
        }
    }
}
interface Host extends FlutterEngineProvider, FlutterEngineConfigurator, PlatformPluginDelegate {
    getAbility(): UIAbility;
    shouldDispatchAppLifecycleState(): boolean;
    detachFromFlutterEngine(): void;
    shouldAttachEngineToAbility(): boolean;
    getCachedEngineId(): string;
    getCachedEngineGroupId(): string | null;
    shouldDestroyEngineWithHost(): boolean;
    getFlutterShellArgs(): FlutterShellArgs;
    getDartEntrypointArgs(): Array<string>;
    getDartEntrypointLibraryUri(): string;
    getAppBundlePath(): string;
    getDartEntrypointFunctionName(): string;
    getInitialRoute(): string;
    getWant(): Want;
    shouldRestoreAndSaveState(): boolean;
    getExclusiveAppComponent(): ExclusiveAppComponent<UIAbility> | null;
    providePlatformPlugin(flutterEngine: FlutterEngine): PlatformPlugin | undefined;
    attachToEngineAutomatically(): boolean;
}
export { FlutterAbilityAndEntryDelegate };
export type { Host };
