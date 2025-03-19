import type PluginRegistry from './plugins/PluginRegistry';
import { FlutterPluginBinding } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/plugins/FlutterPlugin";
import type { FlutterAssets, FlutterPlugin } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/plugins/FlutterPlugin";
import type FlutterEngine from './FlutterEngine';
import type AbilityAware from './plugins/ability/AbilityAware';
import type UIAbility from "@ohos:app.ability.UIAbility";
import type { AbilityPluginBinding, WindowFocusChangedListener, OnSaveStateListener, NewWantListener } from './plugins/ability/AbilityPluginBinding';
import HashSet from "@ohos:util.HashSet";
import type Want from "@ohos:app.ability.Want";
import AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type common from "@ohos:app.ability.common";
import type FlutterLoader from './loader/FlutterLoader';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import ToolUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/ToolUtils";
import type AbilityControlSurface from './plugins/ability/AbilityControlSurface';
import type ExclusiveAppComponent from '../ohos/ExclusiveAppComponent';
import type Any from '../../plugin/common/Any';
const TAG = "FlutterEngineCxnRegistry";
export default class FlutterEngineConnectionRegistry implements PluginRegistry, AbilityControlSurface {
    private plugins = new Map<string, FlutterPlugin>();
    private defaultPlugin: FlutterPlugin = new EmptyPlugin();
    private flutterEngine: FlutterEngine;
    private pluginBinding: FlutterPluginBinding;
    private abilityAwarePlugins = new Map<string, AbilityAware>();
    private exclusiveAbility: ExclusiveAppComponent<UIAbility> | null = null;
    private abilityPluginBinding: FlutterEngineAbilityPluginBinding | null = null;
    constructor(d8: common.Context, e8: FlutterEngine, f8: FlutterLoader) {
        this.flutterEngine = e8;
        this.pluginBinding = new FlutterPluginBinding(d8, e8, e8.getDartExecutor(), new DefaultFlutterAssets(f8), e8.getFlutterRenderer(), e8.getPlatformViewsController()?.getRegistry());
    }
    add(b8: FlutterPlugin): void {
        try {
            if (this.has(b8.getUniqueClassName())) {
                Log.w(TAG, "Attempted to register plugin ("
                    + b8
                    + ") but it was "
                    + "already registered with this FlutterEngine ("
                    + this.flutterEngine
                    + ").");
                return;
            }
            Log.w(TAG, "Adding plugin: " + b8.getUniqueClassName());
            this.plugins.set(b8.getUniqueClassName(), b8);
            b8.onAttachedToEngine(this.pluginBinding);
            if (ToolUtils.implementsInterface(b8, "onAttachedToAbility")) {
                const c8: Any = b8;
                this.abilityAwarePlugins.set(b8.getUniqueClassName(), c8);
                if (this.isAttachedToAbility()) {
                    c8.onAttachedToAbility(this.abilityPluginBinding);
                }
            }
        }
        finally {
        }
    }
    addList(z7: Set<FlutterPlugin>): void {
        z7.forEach(a8 => this.add(a8));
    }
    has(y7: string): boolean {
        return this.plugins.has(y7);
    }
    get(x7: string): FlutterPlugin {
        return this.plugins.get(x7) ?? this.defaultPlugin;
    }
    remove(u7: string): void {
        const v7 = this.plugins.get(u7);
        if (v7 == null) {
            return;
        }
        if (ToolUtils.implementsInterface(v7, "onAttachedToAbility")) {
            if (this.isAttachedToAbility()) {
                const w7: Any = v7;
                w7.onDetachedFromAbility();
            }
            this.abilityAwarePlugins.delete(u7);
        }
        v7.onDetachedFromEngine(this.pluginBinding);
        this.plugins.delete(u7);
    }
    removeList(s7: Set<string>): void {
        s7.forEach(t7 => this.remove(t7));
    }
    removeAll(): void {
        this.removeList(new Set(this.plugins.keys()));
        this.plugins.clear();
    }
    private isAttachedToAbility(): boolean {
        return this.exclusiveAbility != null;
    }
    attachToAbility(r7: ExclusiveAppComponent<UIAbility>): void {
        if (this.exclusiveAbility != null) {
            this.exclusiveAbility.detachFromFlutterEngine();
        }
        this.detachFromAppComponent();
        this.exclusiveAbility = r7;
        this.attachToAbilityInternal(r7.getAppComponent());
    }
    detachFromAbility(): void {
        if (this.isAttachedToAbility()) {
            try {
                this.abilityAwarePlugins.forEach(q7 => q7.onDetachedFromAbility());
            }
            catch (p7) {
                Log.e(TAG, "abilityAwarePlugins DetachedFromAbility failed, msg:" + p7);
            }
            this.detachFromAbilityInternal();
        }
        else {
            Log.e(TAG, "Attempted to detach plugins from an Ability when no Ability was attached.");
        }
    }
    onNewWant(n7: Want, o7: AbilityConstant.LaunchParam): void {
        this.abilityPluginBinding?.onNewWant(n7, o7);
    }
    onWindowFocusChanged(m7: boolean): void {
        this.abilityPluginBinding?.onWindowFocusChanged(m7);
    }
    onSaveState(k7: AbilityConstant.StateType, l7: Record<string, Object>): AbilityConstant.OnSaveResult {
        return this.abilityPluginBinding?.onSaveState(k7, l7) ?? AbilityConstant.OnSaveResult.ALL_REJECT;
    }
    private detachFromAppComponent(): void {
        if (this.isAttachedToAbility()) {
            this.detachFromAbility();
        }
    }
    private attachToAbilityInternal(i7: UIAbility): void {
        this.abilityPluginBinding = new FlutterEngineAbilityPluginBinding(i7);
        this.abilityAwarePlugins.forEach(j7 => j7.onAttachedToAbility(this.abilityPluginBinding!));
    }
    private detachFromAbilityInternal(): void {
        this.exclusiveAbility = null;
        this.abilityPluginBinding = null;
    }
    destroy(): void {
        this.detachFromAppComponent();
        this.removeAll();
    }
}
class FlutterEngineAbilityPluginBinding implements AbilityPluginBinding {
    private ability: UIAbility;
    private onNewWantListeners = new HashSet<NewWantListener>();
    private onWindowFocusChangedListeners = new HashSet<WindowFocusChangedListener>();
    private onSaveStateListeners = new HashSet<OnSaveStateListener>();
    constructor(h7: UIAbility) {
        this.ability = h7;
    }
    getAbility(): UIAbility {
        return this.ability;
    }
    addOnNewWantListener(g7: NewWantListener): void {
        this.onNewWantListeners.add(g7);
    }
    removeOnNewWantListener(f7: NewWantListener): void {
        this.onNewWantListeners.remove(f7);
    }
    addOnWindowFocusChangedListener(e7: WindowFocusChangedListener): void {
        this.onWindowFocusChangedListeners.add(e7);
    }
    removeOnWindowFocusChangedListener(d7: WindowFocusChangedListener): void {
        this.onWindowFocusChangedListeners.remove(d7);
    }
    addOnSaveStateListener(c7: OnSaveStateListener) {
        this.onSaveStateListeners.add(c7);
    }
    removeOnSaveStateListener(b7: OnSaveStateListener) {
        this.onSaveStateListeners.remove(b7);
    }
    onNewWant(x6: Want, y6: AbilityConstant.LaunchParam): void {
        this.onNewWantListeners.forEach((z6, a7) => {
            z6?.onNewWant(x6, y6);
        });
    }
    onWindowFocusChanged(u6: boolean): void {
        this.onWindowFocusChangedListeners.forEach((v6, w6) => {
            v6?.onWindowFocusChanged(u6);
        });
    }
    onSaveState(q6: AbilityConstant.StateType, r6: Record<string, Object>): AbilityConstant.OnSaveResult {
        this.onSaveStateListeners.forEach((s6, t6) => {
            s6?.onSaveState(q6, r6);
        });
        return AbilityConstant.OnSaveResult.ALL_AGREE;
    }
}
class DefaultFlutterAssets implements FlutterAssets {
    private flutterLoader: FlutterLoader;
    constructor(p6: FlutterLoader) {
        this.flutterLoader = p6;
    }
    getAssetFilePathByName(n6: string, o6?: string): string {
        return this.flutterLoader.getLookupKeyForAsset(n6, o6);
    }
    getAssetFilePathBySubpath(l6: string, m6?: string) {
        return this.flutterLoader.getLookupKeyForAsset(l6, m6);
    }
}
class EmptyPlugin implements FlutterPlugin {
    getUniqueClassName(): string {
        return '';
    }
    onAttachedToEngine(k6: FlutterPluginBinding) {
    }
    onDetachedFromEngine(j6: FlutterPluginBinding) {
    }
}
