import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { BusinessError } from "@ohos:base";
import { Brightness, HapticFeedbackType, SystemUiMode, SystemUiOverlay } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/PlatformChannel";
import type PlatformChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/PlatformChannel";
import type { AppSwitcherDescription, PlatformMessageHandler, SoundType, SystemChromeStyle } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/PlatformChannel";
import FlutterManager from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterManager";
import pasteboard from "@ohos:pasteboard";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import vibrator from "@ohos:vibrator";
import window from "@ohos:window";
import type common from "@ohos:app.ability.common";
import type { MethodResult } from './common/MethodChannel';
import type Any from './common/Any';
import router from "@ohos:router";
export default class PlatformPlugin {
    private static TAG = "PlatformPlugin";
    callback = new PlatformPluginCallback();
    constructor(q75: PlatformChannel, r75: common.Context, s75?: PlatformPluginDelegate) {
        this.callback.platformChannel = q75;
        this.callback.context = r75;
        this.callback.applicationContext = r75?.getApplicationContext();
        this.callback.platform = this;
        this.callback.platformPluginDelegate = s75 ?? null;
        this.callback.platformChannel?.setPlatformMessageHandler(this.callback);
    }
    initWindow() {
        try {
            let l75 = this.callback.context!!;
            window.getLastWindow(l75, (o75, p75) => {
                if (o75.code) {
                    Log.e(PlatformPlugin.TAG, "Failed to obtain the top window. Cause: " + JSON.stringify(o75));
                    return;
                }
                this.callback.lastWindow = p75;
            });
            const m75 = FlutterManager.getInstance().getUIAbility(l75);
            const n75 = FlutterManager.getInstance().getWindowStage(m75);
            this.callback.mainWindow = n75.getMainWindowSync();
        }
        catch (k75) {
            Log.e(PlatformPlugin.TAG, "Failed to obtain the top window. Cause: " + JSON.stringify(k75));
        }
    }
    updateSystemUiOverlays(): void {
        this.callback.mainWindow?.setWindowSystemBarEnable(this.callback.showBarOrNavigation);
        if (this.callback.currentTheme != null) {
            this.callback.setSystemChromeSystemUIOverlayStyle(this.callback.currentTheme);
        }
    }
    setUIAbilityContext(j75: common.UIAbilityContext): void {
        this.callback.uiAbilityContext = j75;
    }
    setSystemChromeChangeListener(): void {
        if (this.callback.callbackId == null && this.callback.applicationContext != null) {
            let g75 = this;
            this.callback.callbackId = this.callback.applicationContext?.on('environment', {
                onConfigurationUpdated(i75) {
                    Log.d(PlatformPlugin.TAG, "onConfigurationUpdated: " + g75.callback.showBarOrNavigation);
                    g75.callback.platformChannel?.systemChromeChanged(g75.callback.showBarOrNavigation.includes('status'));
                },
                onMemoryLevel(h75) {
                }
            });
        }
    }
    public destroy() {
        this.callback.platformChannel?.setPlatformMessageHandler(null);
    }
}
export interface PlatformPluginDelegate {
    popSystemNavigator(): boolean;
}
export class PlatformPluginCallback implements PlatformMessageHandler {
    private static TAG = "PlatformPluginCallback";
    platform: PlatformPlugin | null = null;
    mainWindow: window.Window | null = null;
    lastWindow: window.Window | null = null;
    platformChannel: PlatformChannel | null = null;
    platformPluginDelegate: PlatformPluginDelegate | null = null;
    context: common.Context | null = null;
    showBarOrNavigation: ('status' | 'navigation')[] = ['status', 'navigation'];
    uiAbilityContext: common.UIAbilityContext | null = null;
    callbackId: number | null = null;
    applicationContext: common.ApplicationContext | null = null;
    currentTheme: SystemChromeStyle | null = null;
    playSystemSound(f75: SoundType) {
    }
    vibrateHapticFeedback(e75: HapticFeedbackType) {
        switch (e75) {
            case HapticFeedbackType.STANDARD:
                vibrator.startVibration({ type: 'time', duration: 75 }, { id: 0, usage: 'touch' });
                break;
            case HapticFeedbackType.LIGHT_IMPACT:
                vibrator.startVibration({ type: 'time', duration: 25 }, { id: 0, usage: 'touch' });
                break;
            case HapticFeedbackType.MEDIUM_IMPACT:
                vibrator.startVibration({ type: 'time', duration: 150 }, { id: 0, usage: 'touch' });
                break;
            case HapticFeedbackType.HEAVY_IMPACT:
                vibrator.startVibration({ type: 'time', duration: 300 }, { id: 0, usage: 'touch' });
                break;
            case HapticFeedbackType.SELECTION_CLICK:
                vibrator.startVibration({ type: 'time', duration: 100 }, { id: 0, usage: 'touch' });
                break;
        }
    }
    setPreferredOrientations(z74: number, a75: MethodResult) {
        try {
            Log.d(PlatformPluginCallback.TAG, "ohosOrientation: " + z74);
            this.mainWindow!.setPreferredOrientation(z74, (c75: BusinessError) => {
                const d75: number = c75.code;
                if (d75) {
                    Log.e(PlatformPluginCallback.TAG, "Failed to set window orientation:" + JSON.stringify(c75));
                    a75.error("error", JSON.stringify(c75), null);
                    return;
                }
                a75.success(null);
            });
        }
        catch (b75) {
            Log.e(PlatformPluginCallback.TAG, "Failed to set window orientation:" + JSON.stringify(b75));
            a75.error("error", JSON.stringify(b75), null);
        }
    }
    setApplicationSwitcherDescription(w74: AppSwitcherDescription) {
        Log.d(PlatformPluginCallback.TAG, "setApplicationSwitcherDescription: " + JSON.stringify(w74));
        try {
            let y74: string = w74?.label;
            this.uiAbilityContext?.setMissionLabel(y74).then(() => {
                Log.d(PlatformPluginCallback.TAG, "Succeeded in seting mission label");
            });
        }
        catch (x74) {
            Log.d(PlatformPluginCallback.TAG, "Failed to set mission label: " + JSON.stringify(x74));
        }
    }
    showSystemOverlays(v74: SystemUiOverlay[]) {
        this.setSystemChromeEnabledSystemUIOverlays(v74);
    }
    showSystemUiMode(u74: SystemUiMode) {
        this.setSystemChromeEnabledSystemUIMode(u74);
    }
    setSystemUiChangeListener() {
        this.platform?.setSystemChromeChangeListener();
    }
    restoreSystemUiOverlays() {
        this.platform?.updateSystemUiOverlays();
    }
    setSystemUiOverlayStyle(t74: SystemChromeStyle) {
        Log.d(PlatformPluginCallback.TAG, "systemUiOverlayStyle:" + JSON.stringify(t74));
        this.setSystemChromeSystemUIOverlayStyle(t74);
    }
    popSystemNavigator() {
        if (this.platformPluginDelegate != null && this.platformPluginDelegate?.popSystemNavigator()) {
            return;
        }
        router.back();
    }
    getClipboardData(h74: MethodResult): void {
        let i74 = abilityAccessCtrl.createAtManager();
        i74.requestPermissionsFromUser(this.uiAbilityContext, ['ohos.permission.READ_PASTEBOARD']).then((k74) => {
            enum l74 {
                NOT_CONFIGURED = -1,
                GRANTED = 0,
                INVALID_REQ = 2
            }
            let m74: string = 'Failed to request permissions from user.';
            let n74: number = k74.authResults[0];
            switch (n74) {
                case l74.GRANTED: {
                    let o74: pasteboard.SystemPasteboard = pasteboard.getSystemPasteboard();
                    o74.getData().then((q74: pasteboard.PasteData) => {
                        let r74: string = q74.getPrimaryText();
                        let s74: Any = new Map().set("text", r74);
                        h74.success(s74);
                    }).catch((p74: BusinessError) => {
                        Log.e(PlatformPluginCallback.TAG, "Failed to get PasteData. Cause: " + JSON.stringify(p74));
                        h74.error("error", JSON.stringify(p74), null);
                    });
                    break;
                }
                case l74.NOT_CONFIGURED: {
                    m74 += 'Cause: Not configured in Settings';
                    Log.e(PlatformPluginCallback.TAG, m74);
                    h74.error("error", m74, null);
                    break;
                }
                case l74.INVALID_REQ: {
                    m74 += 'Cause: Invalid request';
                    Log.e(PlatformPluginCallback.TAG, m74);
                    h74.error("error", m74, null);
                    break;
                }
                default: {
                    m74 += `Unknown error: authResult=${n74}`;
                    h74.error("error", m74, null);
                    break;
                }
            }
        }).catch((j74: BusinessError) => {
            Log.e(PlatformPluginCallback.TAG, "Failed to request permissions from user. Cause: " + JSON.stringify(j74));
            h74.error("error", JSON.stringify(j74), null);
        });
    }
    setClipboardData(b74: string, c74: MethodResult) {
        let d74 = pasteboard.createData(pasteboard.MIMETYPE_TEXT_PLAIN, b74);
        let e74: pasteboard.SystemPasteboard = pasteboard.getSystemPasteboard();
        e74.setData(d74).then((g74: void) => {
            c74.success(null);
        }).catch((f74: BusinessError) => {
            Log.d(PlatformPluginCallback.TAG, "Failed to set PasteData. Cause: " + JSON.stringify(f74));
            c74.error("error", JSON.stringify(f74), null);
        });
    }
    clipboardHasStrings(): boolean {
        return false;
    }
    setSystemChromeEnabledSystemUIMode(z73: SystemUiMode): void {
        Log.d(PlatformPluginCallback.TAG, "mode: " + z73);
        let a74: ('status' | 'navigation')[] = [];
        if (z73 == SystemUiMode.LEAN_BACK) {
            FlutterManager.getInstance().setUseFullScreen(true, null);
        }
        else if (z73 == SystemUiMode.IMMERSIVE) {
            FlutterManager.getInstance().setUseFullScreen(true, null);
        }
        else if (z73 == SystemUiMode.IMMERSIVE_STICKY) {
            FlutterManager.getInstance().setUseFullScreen(true, null);
        }
        else if (z73 == SystemUiMode.EDGE_TO_EDGE) {
            a74 = ['status', 'navigation'];
        }
        else {
            return;
        }
        this.showBarOrNavigation = a74;
        this.platform?.updateSystemUiOverlays();
    }
    setSystemChromeSystemUIOverlayStyle(r73: SystemChromeStyle): void {
        let s73: boolean = false;
        let t73: string | undefined = undefined;
        let u73: string | undefined = undefined;
        let v73: string | undefined = undefined;
        let w73: boolean = false;
        let x73: string | undefined = undefined;
        if (r73.statusBarIconBrightness != null) {
            switch (r73.statusBarIconBrightness) {
                case Brightness.DARK:
                    s73 = false;
                    u73 = '#000000';
                    break;
                case Brightness.LIGHT:
                    s73 = true;
                    u73 = '#FFFFFF';
                    break;
            }
        }
        if (r73.statusBarColor != null) {
            t73 = "#" + r73.statusBarColor.toString(16);
        }
        if (r73.systemStatusBarContrastEnforced != null) {
        }
        if (r73.systemNavigationBarIconBrightness != null) {
            switch (r73.systemNavigationBarIconBrightness) {
                case Brightness.DARK:
                    w73 = true;
                    break;
                case Brightness.LIGHT:
                    w73 = false;
            }
        }
        if (r73.systemNavigationBarColor != null) {
            v73 = "#" + r73.systemNavigationBarColor.toString(16);
        }
        if (r73.systemNavigationBarContrastEnforced != null) {
        }
        this.currentTheme = r73;
        let y73 = new SystemBarProperties();
        y73.statusBarColor = t73;
        y73.isStatusBarLightIcon = s73;
        y73.statusBarContentColor = u73;
        y73.navigationBarColor = v73;
        y73.isNavigationBarLightIcon = w73;
        y73.navigationBarContentColor = x73;
        Log.d(PlatformPluginCallback.TAG, "systemBarProperties: " + JSON.stringify(y73));
        this.mainWindow?.setWindowSystemBarProperties(y73);
    }
    setSystemChromeEnabledSystemUIOverlays(n73: SystemUiOverlay[]): void {
        let o73: ('status' | 'navigation')[] = [];
        if (n73.length == 0) {
        }
        for (let p73 = 0; p73 < n73.length; ++p73) {
            let q73 = n73[p73];
            switch (q73) {
                case SystemUiOverlay.TOP_OVERLAYS:
                    o73.push('status');
                    break;
                case SystemUiOverlay.BOTTOM_OVERLAYS:
                    o73.push('navigation');
                    break;
            }
        }
        this.showBarOrNavigation = o73;
        this.platform?.updateSystemUiOverlays();
    }
}
class SystemBarProperties {
    statusBarColor?: string;
    isStatusBarLightIcon?: boolean;
    statusBarContentColor?: string;
    navigationBarColor?: string;
    isNavigationBarLightIcon?: boolean;
    navigationBarContentColor?: string;
}
