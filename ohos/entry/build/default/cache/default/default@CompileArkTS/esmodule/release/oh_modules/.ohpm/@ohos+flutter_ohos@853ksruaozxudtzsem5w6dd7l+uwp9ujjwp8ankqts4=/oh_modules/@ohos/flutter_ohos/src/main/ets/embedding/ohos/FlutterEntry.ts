import type FlutterEngine from '../engine/FlutterEngine';
import PlatformPlugin from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/PlatformPlugin";
import Want from "@ohos:app.ability.Want";
import FlutterShellArgs from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterShellArgs";
import type UIAbility from "@ohos:app.ability.UIAbility";
import type ExclusiveAppComponent from './ExclusiveAppComponent';
import { FlutterAbilityAndEntryDelegate } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterAbilityAndEntryDelegate";
import type { Host } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterAbilityAndEntryDelegate";
import FlutterAbilityLaunchConfigs from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterAbilityLaunchConfigs";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type { FlutterView } from '../../view/FlutterView';
import FlutterManager from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterManager";
import window from "@ohos:window";
import type FlutterEngineConfigurator from './FlutterEngineConfigurator';
import type { FlutterPlugin } from '../engine/plugins/FlutterPlugin';
const TAG = "FlutterEntry";
export default class FlutterEntry implements Host {
    private static ARG_SHOULD_ATTACH_ENGINE_TO_ABILITY: string = "should_attach_engine_to_ability";
    protected uiAbility: UIAbility | null = null;
    protected delegate: FlutterAbilityAndEntryDelegate | null = null;
    protected flutterView: FlutterView | null = null;
    protected context: Context;
    protected windowStage: window.WindowStage | null = null;
    private parameters: Record<string, Object> = {};
    protected engineConfigurator: FlutterEngineConfigurator | null = null;
    protected hasInit: boolean = false;
    constructor(g36: Context, h36: Record<string, Object> = {}) {
        this.context = g36;
        this.uiAbility = FlutterManager.getInstance().getUIAbility(g36);
        this.parameters = h36;
        this.windowStage = FlutterManager.getInstance().getWindowStage(this.uiAbility);
        this.hasInit = false;
    }
    async aboutToAppear() {
        Log.i(TAG, 'aboutToAppear');
        if (this.hasInit == false) {
            this.delegate = new FlutterAbilityAndEntryDelegate(this);
            this.flutterView = this.delegate?.createView(this.context);
            this.flutterView?.onWindowCreated();
            await this?.delegate?.onAttach(this.context);
            Log.i(TAG, 'onAttach end');
            this?.delegate?.platformPlugin?.setUIAbilityContext(this.uiAbility!!.context);
            this.delegate?.onCreate();
            this.delegate?.onWindowStageCreate();
            this.windowStage?.on('windowStageEvent', this.windowStageEventCallback);
            this.hasInit = true;
            this.delegate?.initWindow();
        }
    }
    protected windowStageEventCallback = (e36: window.WindowStageEventType) => {
        let f36: window.WindowStageEventType = e36;
        switch (f36) {
            case window.WindowStageEventType.SHOWN:
                Log.i(TAG, 'windowStage foreground.');
                break;
            case window.WindowStageEventType.ACTIVE:
                Log.i(TAG, 'windowStage active.');
                this.delegate?.getFlutterEngine()?.getTextInputChannel()?.textInputMethodHandler?.handleChangeFocus(true);
                this?.delegate?.onWindowFocusChanged(true);
                break;
            case window.WindowStageEventType.INACTIVE:
                Log.i(TAG, 'windowStage inactive.');
                this?.delegate?.onWindowFocusChanged(false);
                break;
            case window.WindowStageEventType.HIDDEN:
                Log.i(TAG, 'windowStage background.');
                break;
        }
    };
    setFlutterEngineConfigurator(d36: FlutterEngineConfigurator) {
        this.engineConfigurator = d36;
    }
    getFlutterView(): FlutterView {
        return this.flutterView!!;
    }
    getFlutterEngine(): FlutterEngine | null {
        return this.delegate?.flutterEngine!;
    }
    aboutToDisappear() {
        Log.d(TAG, "FlutterEntry aboutToDisappear===");
        try {
            this.windowStage?.off('windowStageEvent', this.windowStageEventCallback);
        }
        catch (c36) {
        }
        if (this.flutterView != null) {
            this.flutterView.onDestroy();
            this.flutterView = null;
        }
        if (this.delegate != null) {
            this.delegate?.onDetach();
            this.delegate?.release();
        }
    }
    onPageShow() {
        Log.d(TAG, "FlutterEntry onPageShow===");
        this?.delegate?.onForeground();
    }
    onPageHide() {
        Log.d(TAG, "FlutterEntry onPageHide===");
        this?.delegate?.onBackground();
    }
    onBackPress() {
        Log.d(TAG, "FlutterEntry onBackPress===");
        this?.delegate?.flutterEngine?.getNavigationChannel()?.popRoute();
        this?.delegate?.flutterEngine?.getTextInputChannel()?.textInputMethodHandler?.hide();
    }
    shouldDispatchAppLifecycleState(): boolean {
        return true;
    }
    detachFromFlutterEngine() {
        if (this?.delegate != null) {
            this?.delegate?.onDetach();
        }
    }
    getAbility(): UIAbility {
        return this.uiAbility!!;
    }
    loadContent() {
    }
    shouldAttachEngineToAbility(): boolean {
        return this.parameters![FlutterEntry.ARG_SHOULD_ATTACH_ENGINE_TO_ABILITY] as boolean;
    }
    getCachedEngineId(): string {
        return this.parameters![FlutterAbilityLaunchConfigs.EXTRA_CACHED_ENGINE_ID] as string;
    }
    getCachedEngineGroupId(): string | null {
        return this.parameters![FlutterAbilityLaunchConfigs.EXTRA_CACHED_ENGINE_GROUP_ID] as string;
    }
    shouldDestroyEngineWithHost(): boolean {
        if ((this.getCachedEngineId() != null && this.getCachedEngineId().length > 0) || this.delegate!!.isFlutterEngineFromHost()) {
            return false;
        }
        return true;
    }
    attachToEngineAutomatically(): boolean {
        return true;
    }
    getFlutterShellArgs(): FlutterShellArgs {
        return new FlutterShellArgs();
    }
    getDartEntrypointArgs(): string[] {
        if (this.parameters![FlutterAbilityLaunchConfigs.EXTRA_DART_ENTRYPOINT_ARGS]) {
            return this.parameters![FlutterAbilityLaunchConfigs.EXTRA_DART_ENTRYPOINT_ARGS] as Array<string>;
        }
        return new Array<string>();
    }
    getDartEntrypointLibraryUri(): string {
        return "";
    }
    getAppBundlePath(): string {
        return "";
    }
    getDartEntrypointFunctionName(): string {
        if (this.parameters![FlutterAbilityLaunchConfigs.EXTRA_DART_ENTRYPOINT]) {
            return this.parameters![FlutterAbilityLaunchConfigs.EXTRA_DART_ENTRYPOINT] as string;
        }
        return FlutterAbilityLaunchConfigs.DEFAULT_DART_ENTRYPOINT;
    }
    getInitialRoute(): string {
        if (this.parameters![FlutterAbilityLaunchConfigs.EXTRA_INITIAL_ROUTE]) {
            return this.parameters![FlutterAbilityLaunchConfigs.EXTRA_INITIAL_ROUTE] as string;
        }
        return "";
    }
    getWant(): Want {
        return new Want();
    }
    shouldRestoreAndSaveState(): boolean {
        if (this.parameters![FlutterAbilityLaunchConfigs.EXTRA_CACHED_ENGINE_ID] != undefined) {
            return this.parameters![FlutterAbilityLaunchConfigs.EXTRA_CACHED_ENGINE_ID] as boolean;
        }
        if (this.getCachedEngineId() != null && this.getCachedEngineId().length > 0) {
            return false;
        }
        return true;
    }
    getExclusiveAppComponent(): ExclusiveAppComponent<UIAbility> | null {
        return this.delegate ? this.delegate : null;
    }
    provideFlutterEngine(b36: Context): FlutterEngine | null {
        return null;
    }
    providePlatformPlugin(a36: FlutterEngine): PlatformPlugin | undefined {
        return new PlatformPlugin(a36.getPlatformChannel()!, this.context, this);
    }
    configureFlutterEngine(z35: FlutterEngine) {
        if (this.engineConfigurator) {
            this.engineConfigurator.configureFlutterEngine(z35);
        }
    }
    cleanUpFlutterEngine(y35: FlutterEngine) {
        if (this.engineConfigurator) {
            this.engineConfigurator.cleanUpFlutterEngine(y35);
        }
    }
    popSystemNavigator(): boolean {
        return false;
    }
    addPlugin(x35: FlutterPlugin): void {
        this.delegate?.addPlugin(x35);
    }
    removePlugin(w35: FlutterPlugin): void {
        this.delegate?.removePlugin(w35);
    }
}
