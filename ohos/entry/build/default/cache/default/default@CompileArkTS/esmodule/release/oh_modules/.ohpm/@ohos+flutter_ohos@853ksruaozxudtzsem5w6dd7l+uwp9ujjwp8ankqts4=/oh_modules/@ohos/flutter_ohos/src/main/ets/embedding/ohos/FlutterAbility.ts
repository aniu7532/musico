import UIAbility from "@ohos:app.ability.UIAbility";
import window from "@ohos:window";
import { FlutterAbilityAndEntryDelegate } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterAbilityAndEntryDelegate";
import type { Host } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterAbilityAndEntryDelegate";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type FlutterEngine from '../engine/FlutterEngine';
import PlatformPlugin from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/PlatformPlugin";
import FlutterShellArgs from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterShellArgs";
import FlutterAbilityLaunchConfigs from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterAbilityLaunchConfigs";
import type common from "@ohos:app.ability.common";
import type Want from "@ohos:app.ability.Want";
import type { FlutterPlugin } from '../engine/plugins/FlutterPlugin';
import AbilityConstant from "@ohos:app.ability.AbilityConstant";
import I18n from "@ohos:i18n";
import { PlatformBrightness } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/SettingsChannel";
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import type { Configuration } from "@ohos:app.ability.Configuration";
import type ExclusiveAppComponent from './ExclusiveAppComponent';
import errorManager from "@ohos:app.ability.errorManager";
import appRecovery from "@ohos:app.ability.appRecovery";
import FlutterManager from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterManager";
import type { FlutterView } from '../../view/FlutterView';
import ApplicationInfoLoader from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/loader/ApplicationInfoLoader";
import accessibility from "@ohos:accessibility";
import type { AccessibilityManager } from '../../view/AccessibilityBridge';
const TAG = "FlutterAbility";
export class FlutterAbility extends UIAbility implements Host {
    private delegate?: FlutterAbilityAndEntryDelegate | null;
    private flutterView: FlutterView | null = null;
    private mainWindow?: window.Window | null;
    private errorManagerId: number = 0;
    private accessibilityManager?: AccessibilityManager | null;
    getFlutterView(): FlutterView | null {
        return this.flutterView;
    }
    pagePath(): string {
        return "pages/Index";
    }
    async onCreate(h34: Want, i34: AbilityConstant.LaunchParam) {
        AppStorage.setOrCreate('fontSizeScale', this.context.config.fontSizeScale);
        Log.i(TAG, "this.context.config.fontSizeScale = " + this.context.config.fontSizeScale);
        Log.i(TAG, "bundleCodeDir=" + this.context.bundleCodeDir);
        FlutterManager.getInstance().pushUIAbility(this);
        this.delegate = new FlutterAbilityAndEntryDelegate(this);
        await this?.delegate?.onAttach(this.context);
        Log.i(TAG, 'onAttach end');
        this?.delegate?.platformPlugin?.setUIAbilityContext(this.context);
        this?.delegate?.onRestoreInstanceState(h34);
        if (this.stillAttachedForEvent("onCreate")) {
            this.delegate?.onCreate();
        }
        if (this.stillAttachedForEvent("onWindowStageCreate")) {
            this?.delegate?.onWindowStageCreate();
        }
        Log.i(TAG, 'MyAbility onCreate');
        let j34: errorManager.ErrorObserver = {
            onUnhandledException(m34) {
                Log.e(TAG, "onUnhandledException, errorMsg:", m34);
                appRecovery.saveAppState();
                appRecovery.restartApp();
            }
        };
        this.errorManagerId = errorManager.on('error', j34);
        let k34 = ApplicationInfoLoader.load(this.context);
        if (k34.isDebugMode) {
            this.delegate?.initWindow();
        }
        let l34: boolean = accessibility.isOpenAccessibilitySync();
        if (l34) {
            this.delegate?.getFlutterNapi()?.accessibilityStateChange(l34);
        }
        Log.i(TAG, `accessibility isOpen state -> ${JSON.stringify(l34)}`);
    }
    onDestroy() {
        FlutterManager.getInstance().popUIAbility(this);
        errorManager.off('error', this.errorManagerId);
        if (this.flutterView != null) {
            this.flutterView.onDestroy();
            this.flutterView = null;
        }
        if (this.stillAttachedForEvent("onDestroy")) {
            this?.delegate?.onDetach();
        }
        this.release();
    }
    onSaveState(f34: AbilityConstant.StateType, g34: Record<string, Object>): AbilityConstant.OnSaveResult {
        return this?.delegate?.onSaveState(f34, g34) ?? AbilityConstant.OnSaveResult.ALL_REJECT;
    }
    onWindowStageCreate(y33: window.WindowStage) {
        FlutterManager.getInstance().pushWindowStage(this, y33);
        this.delegate?.initWindow();
        this.mainWindow = y33.getMainWindowSync();
        try {
            y33.on('windowStageEvent', (d34) => {
                let e34: window.WindowStageEventType = d34;
                switch (e34) {
                    case window.WindowStageEventType.SHOWN:
                        Log.i(TAG, 'windowStage foreground.');
                        break;
                    case window.WindowStageEventType.ACTIVE:
                        Log.i(TAG, 'windowStage active.');
                        if (this.stillAttachedForEvent("onWindowFocusChanged")) {
                            this.delegate?.getFlutterEngine()?.getTextInputChannel()?.textInputMethodHandler?.handleChangeFocus(true);
                            this?.delegate?.onWindowFocusChanged(true);
                        }
                        break;
                    case window.WindowStageEventType.INACTIVE:
                        Log.i(TAG, 'windowStage inactive.');
                        if (this.stillAttachedForEvent("onWindowFocusChanged")) {
                            this?.delegate?.onWindowFocusChanged(false);
                        }
                        break;
                    case window.WindowStageEventType.HIDDEN:
                        Log.i(TAG, 'windowStage background.');
                        break;
                }
            });
            this.flutterView = this.delegate!!.createView(this.context);
            Log.w(TAG, 'onWindowStageCreate:' + this.flutterView!!.getId());
            let a34: LocalStorage = new LocalStorage();
            a34.setOrCreate("viewId", this.flutterView!!.getId());
            y33.loadContent(this.pagePath(), a34, (b34, c34) => {
                if (b34.code) {
                    Log.e(TAG, 'Failed to load the content. Cause: %{public}s', JSON.stringify(b34) ?? '');
                    return;
                }
                this.flutterView?.onWindowCreated();
                Log.i(TAG, 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(c34) ?? '');
            });
            FlutterManager.getInstance().setUseFullScreen(true, this.context);
        }
        catch (z33) {
            Log.e(TAG, 'Failed to enable the listener for window stage event changes. Cause:' + JSON.stringify(z33));
        }
    }
    onNewWant(w33: Want, x33: AbilityConstant.LaunchParam): void {
        this?.delegate?.onNewWant(w33, x33);
    }
    onWindowStageDestroy() {
        FlutterManager.getInstance().popWindowStage(this);
        if (this.stillAttachedForEvent("onWindowStageDestroy")) {
            this?.delegate?.onWindowStageDestroy();
        }
    }
    onForeground() {
        if (this.stillAttachedForEvent("onForeground")) {
            this?.delegate?.onForeground();
        }
    }
    onBackground() {
        if (this.stillAttachedForEvent("onBackground")) {
            this?.delegate?.onBackground();
        }
    }
    release() {
        if (this?.delegate != null) {
            this?.delegate?.release();
            this.delegate = null;
        }
    }
    getAbility(): UIAbility {
        return this;
    }
    getFlutterAbilityAndEntryDelegate(): FlutterAbilityAndEntryDelegate | null {
        return this.delegate ?? null;
    }
    shouldDispatchAppLifecycleState(): boolean {
        return true;
    }
    provideFlutterEngine(v33: common.Context): FlutterEngine | null {
        return null;
    }
    providePlatformPlugin(u33: FlutterEngine): PlatformPlugin | undefined {
        return new PlatformPlugin(u33.getPlatformChannel()!, this.context, this);
    }
    configureFlutterEngine(t33: FlutterEngine) {
    }
    cleanUpFlutterEngine(s33: FlutterEngine) {
    }
    getFlutterShellArgs(): FlutterShellArgs {
        return FlutterShellArgs.fromWant(this.getWant());
    }
    getDartEntrypointArgs(): Array<string> {
        if (this.launchWant.parameters![FlutterAbilityLaunchConfigs.EXTRA_DART_ENTRYPOINT_ARGS]) {
            return this.launchWant.parameters![FlutterAbilityLaunchConfigs.EXTRA_DART_ENTRYPOINT_ARGS] as Array<string>;
        }
        return new Array<string>();
    }
    detachFromFlutterEngine() {
        if (this?.delegate != null) {
            this?.delegate?.onDetach();
        }
    }
    popSystemNavigator(): boolean {
        return false;
    }
    shouldAttachEngineToAbility(): boolean {
        return true;
    }
    getDartEntrypointLibraryUri(): string {
        return "";
    }
    getAppBundlePath(): string {
        return "";
    }
    getDartEntrypointFunctionName(): string {
        if (this.launchWant.parameters![FlutterAbilityLaunchConfigs.EXTRA_DART_ENTRYPOINT]) {
            return this.launchWant.parameters![FlutterAbilityLaunchConfigs.EXTRA_DART_ENTRYPOINT] as string;
        }
        return FlutterAbilityLaunchConfigs.DEFAULT_DART_ENTRYPOINT;
    }
    getInitialRoute(): string {
        if (this.launchWant.parameters![FlutterAbilityLaunchConfigs.EXTRA_INITIAL_ROUTE]) {
            return this.launchWant.parameters![FlutterAbilityLaunchConfigs.EXTRA_INITIAL_ROUTE] as string;
        }
        return "";
    }
    getWant(): Want {
        return this.launchWant;
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
    shouldRestoreAndSaveState(): boolean {
        if (this.launchWant.parameters![FlutterAbilityLaunchConfigs.EXTRA_CACHED_ENGINE_ID] != undefined) {
            return this.launchWant.parameters![FlutterAbilityLaunchConfigs.EXTRA_CACHED_ENGINE_ID] as boolean;
        }
        if (this.getCachedEngineId() != null) {
            return false;
        }
        return true;
    }
    getExclusiveAppComponent(): ExclusiveAppComponent<UIAbility> | null {
        return this.delegate ? this.delegate : null;
    }
    getCachedEngineId(): string {
        return this.launchWant.parameters![FlutterAbilityLaunchConfigs.EXTRA_CACHED_ENGINE_ID] as string;
    }
    getCachedEngineGroupId(): string | null {
        return this.launchWant.parameters![FlutterAbilityLaunchConfigs.EXTRA_CACHED_ENGINE_GROUP_ID] as string;
    }
    private stillAttachedForEvent(r33: string) {
        Log.i(TAG, 'Ability ' + r33);
        if (this?.delegate == null) {
            Log.w(TAG, "FlutterAbility " + r33 + " call after release.");
            return false;
        }
        if (!this?.delegate?.isAttached) {
            Log.w(TAG, "FlutterAbility " + r33 + " call after detach.");
            return false;
        }
        return true;
    }
    addPlugin(q33: FlutterPlugin): void {
        if (this?.delegate != null) {
            this?.delegate?.addPlugin(q33);
        }
    }
    removePlugin(p33: FlutterPlugin): void {
        if (this?.delegate != null) {
            this?.delegate?.removePlugin(p33);
        }
    }
    onMemoryLevel(o33: AbilityConstant.MemoryLevel): void {
        Log.i(TAG, 'onMemoryLevel: ' + o33);
        if (o33 === AbilityConstant.MemoryLevel.MEMORY_LEVEL_CRITICAL) {
            this?.delegate?.onLowMemory();
        }
    }
    onConfigurationUpdated(n33: Configuration) {
        Log.i(TAG, 'onConfigurationUpdated config:' + JSON.stringify(n33));
        this?.delegate?.flutterEngine?.getSettingsChannel()?.startMessage()
            .setNativeSpellCheckServiceDefined(false)
            .setBrieflyShowPassword(false)
            .setAlwaysUse24HourFormat(I18n.System.is24HourClock())
            .setPlatformBrightness(n33.colorMode != ConfigurationConstant.ColorMode.COLOR_MODE_DARK
            ? PlatformBrightness.LIGHT : PlatformBrightness.DARK)
            .setTextScaleFactor(n33.fontSizeScale == undefined ? 1.0 : n33.fontSizeScale)
            .send();
        this.delegate?.getFlutterNapi()?.setFontWeightScale(n33.fontWeightScale == undefined ? 1.0 : n33.fontWeightScale);
        Log.i(TAG, 'fontWeightScale: ' + JSON.stringify(n33.fontWeightScale));
        if (n33.language != '') {
            this.getFlutterEngine()?.getLocalizationPlugin()?.sendLocaleToFlutter();
        }
    }
    getFlutterEngine(): FlutterEngine | null {
        return this.delegate?.flutterEngine || null;
    }
}
