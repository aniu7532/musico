import LifecycleChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/LifecycleChannel";
import DartExecutor from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/dart/DartExecutor";
import type { DartEntrypoint } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/dart/DartExecutor";
import FlutterInjector from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/FlutterInjector";
import type FlutterLoader from './loader/FlutterLoader';
import type common from "@ohos:app.ability.common";
import type resourceManager from "@ohos:resourceManager";
import type FlutterNapi from './FlutterNapi';
import NavigationChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/NavigationChannel";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import TestChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/TestChannel";
import FlutterEngineConnectionRegistry from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterEngineConnectionRegistry";
import type PluginRegistry from './plugins/PluginRegistry';
import type AbilityControlSurface from './plugins/ability/AbilityControlSurface';
import TextInputChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/TextInputChannel";
import type TextInputPlugin from '../../plugin/editing/TextInputPlugin';
import PlatformChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/PlatformChannel";
import SystemChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/SystemChannel";
import MouseCursorChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/MouseCursorChannel";
import RestorationChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/RestorationChannel";
import LocalizationChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/LocalizationChannel";
import AccessibilityChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/AccessibilityChannel";
import LocalizationPlugin from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/localization/LocalizationPlugin";
import SettingsChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/SettingsChannel";
import PlatformViewsController from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/platform/PlatformViewsController";
import { FlutterRenderer } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/renderer/FlutterRenderer";
const TAG = "FlutterEngine";
export default class FlutterEngine implements EngineLifecycleListener {
    private engineLifecycleListeners = new Set<EngineLifecycleListener>();
    dartExecutor: DartExecutor;
    private flutterLoader: FlutterLoader;
    private assetManager: resourceManager.ResourceManager;
    private lifecycleChannel: LifecycleChannel | null = null;
    private navigationChannel: NavigationChannel | null = null;
    private textInputChannel: TextInputChannel | null = null;
    private testChannel: TestChannel | null = null;
    private platformChannel: PlatformChannel | null = null;
    private systemChannel: SystemChannel | null = null;
    private mouseCursorChannel: MouseCursorChannel | null = null;
    private restorationChannel: RestorationChannel | null = null;
    private accessibilityChannel: AccessibilityChannel | null = null;
    private localeChannel: LocalizationChannel | null = null;
    private flutterNapi: FlutterNapi;
    private renderer: FlutterRenderer;
    private pluginRegistry: FlutterEngineConnectionRegistry | null = null;
    private textInputPlugin: TextInputPlugin | null = null;
    private localizationPlugin: LocalizationPlugin | null = null;
    private settingsChannel: SettingsChannel | null = null;
    private platformViewsController: PlatformViewsController;
    constructor(z5: common.Context, a6: FlutterLoader | null, b6: FlutterNapi | null, c6: PlatformViewsController | null) {
        const d6: FlutterInjector = FlutterInjector.getInstance();
        if (b6 == null) {
            b6 = FlutterInjector.getInstance().getFlutterNapi();
        }
        this.flutterNapi = b6;
        this.assetManager = z5.resourceManager;
        this.dartExecutor = new DartExecutor(this.flutterNapi, this.assetManager);
        this.dartExecutor.onAttachedToNAPI();
        if (a6 == null) {
            a6 = d6.getFlutterLoader();
        }
        this.flutterLoader = a6;
        this.renderer = new FlutterRenderer(this.flutterNapi);
        if (c6 == null) {
            c6 = new PlatformViewsController();
        }
        this.platformViewsController = c6;
        this.platformViewsController.attach(z5, this.renderer, this.dartExecutor);
    }
    async init(w5: common.Context, x5: Array<string> | null, y5: boolean) {
        if (!this.flutterNapi.isAttached()) {
            await this.flutterLoader.startInitialization(w5);
            this.flutterLoader.ensureInitializationComplete(x5);
        }
        this.lifecycleChannel = new LifecycleChannel(this.dartExecutor);
        this.navigationChannel = new NavigationChannel(this.dartExecutor);
        this.textInputChannel = new TextInputChannel(this.dartExecutor);
        this.testChannel = new TestChannel(this.dartExecutor);
        this.platformChannel = new PlatformChannel(this.dartExecutor);
        this.systemChannel = new SystemChannel(this.dartExecutor);
        this.mouseCursorChannel = new MouseCursorChannel(this.dartExecutor);
        this.restorationChannel = new RestorationChannel(this.dartExecutor, y5);
        this.settingsChannel = new SettingsChannel(this.dartExecutor);
        this.localeChannel = new LocalizationChannel(this.dartExecutor);
        this.accessibilityChannel = new AccessibilityChannel(this.dartExecutor, this.flutterNapi);
        this.flutterNapi.addEngineLifecycleListener(this);
        this.localizationPlugin = new LocalizationPlugin(w5, this.localeChannel);
        if (!this.flutterNapi.isAttached()) {
            this.attachToNapi();
        }
        this.pluginRegistry = new FlutterEngineConnectionRegistry(w5.getApplicationContext(), this, this.flutterLoader);
        this.localizationPlugin.sendLocaleToFlutter();
        Log.d(TAG, "Call init finished.");
    }
    private attachToNapi(): void {
        Log.d(TAG, "Attaching to NAPI.");
        this.flutterNapi.attachToNative();
        if (!this.isAttachedToNapi()) {
            throw new Error("FlutterEngine failed to attach to its native Object reference.");
        }
        this.flutterNapi.setLocalizationPlugin(this.localizationPlugin);
    }
    async spawn(o5: common.Context, p5: DartEntrypoint, q5: string, r5: Array<string>, s5: PlatformViewsController, t5: boolean) {
        if (!this.isAttachedToNapi()) {
            throw new Error("Spawn can only be called on a fully constructed FlutterEngine");
        }
        const u5 = this.flutterNapi.spawn(p5.dartEntrypointFunctionName, p5.dartEntrypointLibrary, q5, r5);
        const v5 = new FlutterEngine(o5, null, u5, s5);
        await v5.init(o5, null, t5);
        return v5;
    }
    private isAttachedToNapi(): boolean {
        return this.flutterNapi.isAttached();
    }
    getLifecycleChannel(): LifecycleChannel | null {
        return this.lifecycleChannel;
    }
    getNavigationChannel(): NavigationChannel | null {
        return this.navigationChannel;
    }
    getTextInputChannel(): TextInputChannel | null {
        return this.textInputChannel;
    }
    getPlatformChannel(): PlatformChannel | null {
        return this.platformChannel;
    }
    getSystemChannel(): SystemChannel | null {
        return this.systemChannel;
    }
    getLocaleChannel(): LocalizationChannel | null {
        return this.localeChannel;
    }
    getMouseCursorChannel(): MouseCursorChannel | null {
        return this.mouseCursorChannel;
    }
    getFlutterNapi(): FlutterNapi {
        return this.flutterNapi;
    }
    getFlutterRenderer(): FlutterRenderer {
        return this.renderer;
    }
    getDartExecutor(): DartExecutor {
        return this.dartExecutor;
    }
    getPlugins(): PluginRegistry | null {
        return this.pluginRegistry;
    }
    getAbilityControlSurface(): AbilityControlSurface | null {
        return this.pluginRegistry;
    }
    getSettingsChannel() {
        return this.settingsChannel;
    }
    getFlutterLoader() {
        return this.flutterLoader;
    }
    onPreEngineRestart(): void {
        this.engineLifecycleListeners.forEach(n5 => n5.onPreEngineRestart());
    }
    onEngineWillDestroy(): void {
    }
    addEngineLifecycleListener(m5: EngineLifecycleListener): void {
        this.engineLifecycleListeners.add(m5);
    }
    removeEngineLifecycleListener(l5: EngineLifecycleListener): void {
        this.engineLifecycleListeners.delete(l5);
    }
    destroy(): void {
        Log.d(TAG, "Destroying.");
        this.engineLifecycleListeners.forEach(k5 => k5.onEngineWillDestroy());
        this.flutterNapi.removeEngineLifecycleListener(this);
        this.pluginRegistry?.detachFromAbility();
        this.platformViewsController?.onDetachedFromNapi();
        this.pluginRegistry?.destroy();
        this.dartExecutor.onDetachedFromNAPI();
        this.flutterNapi.detachFromNativeAndReleaseResources();
    }
    getRestorationChannel(): RestorationChannel | null {
        return this.restorationChannel;
    }
    getAccessibilityChannel(): AccessibilityChannel | null {
        return this.accessibilityChannel;
    }
    getLocalizationPlugin(): LocalizationPlugin | null {
        return this.localizationPlugin;
    }
    getSystemLanguages(): void {
        return this.flutterNapi.getSystemLanguages();
    }
    getPlatformViewsController(): PlatformViewsController | null {
        return this.platformViewsController;
    }
}
export interface EngineLifecycleListener {
    onPreEngineRestart(): void;
    onEngineWillDestroy(): void;
}
