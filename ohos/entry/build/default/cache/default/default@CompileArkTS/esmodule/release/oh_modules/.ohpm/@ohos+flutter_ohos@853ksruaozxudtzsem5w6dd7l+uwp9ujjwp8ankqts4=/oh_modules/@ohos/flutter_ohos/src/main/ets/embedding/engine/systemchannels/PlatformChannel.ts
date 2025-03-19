import JSONMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMethodCodec";
import type MethodCall from '../../../plugin/common/MethodCall';
import MethodChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type { MethodCallHandler, MethodResult } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
import pasteboard from "@ohos:pasteboard";
import bundleManager from "@ohos:bundle.bundleManager";
import window from "@ohos:window";
import type Any from '../../../plugin/common/Any';
export default class PlatformChannel {
    private static TAG = "PlatformChannel";
    private static CHANNEL_NAME = "flutter/platform";
    channel: MethodChannel;
    platformMessageHandler: PlatformMessageHandler | null = null;
    constructor(m24: DartExecutor) {
        this.channel = new MethodChannel(m24, PlatformChannel.CHANNEL_NAME, JSONMethodCodec.INSTANCE);
        let n24 = new PlatformMethodCallback(this);
        this.channel.setMethodCallHandler(n24);
    }
    setPlatformMessageHandler(l24: PlatformMessageHandler | null): void {
        this.platformMessageHandler = l24;
    }
    systemChromeChanged(k24: boolean): void {
        Log.d(PlatformChannel.TAG, "Sending 'systemUIChange' message.");
        this.channel.invokeMethod("SystemChrome.systemUIChange", [k24]);
    }
    decodeOrientations(e24: string[]): number {
        let f24 = 0x00;
        let g24 = 0x00;
        for (let h24 = 0; h24 < e24.length; h24 += 1) {
            let i24 = e24[h24];
            Log.d(PlatformChannel.TAG, "encodedOrientation[" + h24 + "]: " + i24);
            let j24 = this.getDeviceOrientationFromValue(i24);
            switch (j24) {
                case DeviceOrientation.PORTRAIT_UP:
                    f24 |= 0x01;
                    break;
                case DeviceOrientation.PORTRAIT_DOWN:
                    f24 |= 0x04;
                    break;
                case DeviceOrientation.LANDSCAPE_LEFT:
                    f24 |= 0x08;
                    break;
                case DeviceOrientation.LANDSCAPE_RIGHT:
                    f24 |= 0x02;
                    break;
            }
            if (g24 == 0x00) {
                g24 = f24;
            }
        }
        switch (f24) {
            case 0x00:
                return window.Orientation.UNSPECIFIED;
            case 0x01:
                return window.Orientation.PORTRAIT;
            case 0x02:
                return window.Orientation.LANDSCAPE_INVERTED;
            case 0x03:
            case 0x04:
                return window.Orientation.PORTRAIT_INVERTED;
            case 0x05:
                return window.Orientation.AUTO_ROTATION_PORTRAIT;
            case 0x06:
            case 0x07:
            case 0x08:
                return window.Orientation.LANDSCAPE;
            case 0x09:
            case 0x0a:
                return window.Orientation.AUTO_ROTATION_LANDSCAPE;
            case 0x0b:
                return window.Orientation.LOCKED;
            case 0x0c:
            case 0x0d:
            case 0x0e:
                switch (g24) {
                    case 0x01:
                        return bundleManager.DisplayOrientation.PORTRAIT;
                    case 0x02:
                        return bundleManager.DisplayOrientation.LANDSCAPE_INVERTED;
                    case 0x04:
                        return bundleManager.DisplayOrientation.PORTRAIT_INVERTED;
                    case 0x08:
                        return bundleManager.DisplayOrientation.LANDSCAPE;
                }
            case 0x0f:
                return window.Orientation.AUTO_ROTATION_RESTRICTED;
        }
        return bundleManager.DisplayOrientation.PORTRAIT;
    }
    getFeedbackTypeFromValue(c24: string): HapticFeedbackType {
        if (c24 == null) {
            return HapticFeedbackType.STANDARD;
        }
        let d24: string[] = [
            HapticFeedbackType.STANDARD,
            HapticFeedbackType.LIGHT_IMPACT,
            HapticFeedbackType.MEDIUM_IMPACT,
            HapticFeedbackType.HEAVY_IMPACT,
            HapticFeedbackType.SELECTION_CLICK
        ];
        if (d24.includes(c24 as HapticFeedbackType)) {
            return c24 as HapticFeedbackType;
        }
        else {
            Log.e(PlatformChannel.TAG, "No such HapticFeedbackType:" + c24);
            return HapticFeedbackType.STANDARD;
        }
    }
    getClipboardContentFormatFromValue(a24: string): ClipboardContentFormat {
        let b24: string[] = [ClipboardContentFormat.PLAIN_TEXT];
        if (b24.includes(a24 as ClipboardContentFormat)) {
            return a24 as ClipboardContentFormat;
        }
        return ClipboardContentFormat.PLAIN_TEXT;
    }
    getSystemUiOverlayFromValue(y23: string): SystemUiOverlay {
        let z23: string[] = [SystemUiOverlay.TOP_OVERLAYS, SystemUiOverlay.BOTTOM_OVERLAYS];
        if (z23.includes(y23 as SystemUiOverlay)) {
            return y23 as SystemUiOverlay;
        }
        throw new Error("No such SystemUiOverlay: " + y23);
    }
    getSystemUiModeFromValue(w23: string): SystemUiMode {
        let x23: string[] = [
            SystemUiMode.LEAN_BACK, SystemUiMode.IMMERSIVE,
            SystemUiMode.IMMERSIVE_STICKY, SystemUiMode.EDGE_TO_EDGE
        ];
        if (x23.includes(w23 as SystemUiMode)) {
            return w23 as SystemUiMode;
        }
        throw new Error("No such SystemUiOverlay: " + w23);
    }
    getBrightnessFromValue(u23: string): Brightness {
        let v23: string[] = [Brightness.LIGHT, Brightness.DARK];
        if (v23.includes(u23 as Brightness)) {
            return u23 as Brightness;
        }
        throw new Error("No such Brightness: " + u23);
    }
    getDeviceOrientationFromValue(s23: string): DeviceOrientation {
        let t23: DeviceOrientation[] = [
            DeviceOrientation.PORTRAIT_UP, DeviceOrientation.PORTRAIT_DOWN,
            DeviceOrientation.LANDSCAPE_LEFT, DeviceOrientation.LANDSCAPE_RIGHT
        ];
        if (t23.includes(s23 as DeviceOrientation)) {
            return s23 as DeviceOrientation;
        }
        throw new Error("No such DeviceOrientation: " + s23);
    }
}
export enum HapticFeedbackType {
    STANDARD = "STANDARD",
    LIGHT_IMPACT = "HapticFeedbackType.lightImpact",
    MEDIUM_IMPACT = "HapticFeedbackType.mediumImpact",
    HEAVY_IMPACT = "HapticFeedbackType.heavyImpact",
    SELECTION_CLICK = "HapticFeedbackType.selectionClick"
}
export interface PlatformMessageHandler {
    playSystemSound(soundType: SoundType): void;
    vibrateHapticFeedback(feedbackType: HapticFeedbackType): void;
    setPreferredOrientations(ohosOrientation: number, result: MethodResult): void;
    setApplicationSwitcherDescription(description: AppSwitcherDescription): void;
    showSystemOverlays(overlays: SystemUiOverlay[]): void;
    showSystemUiMode(mode: SystemUiMode): void;
    setSystemUiChangeListener(): void;
    restoreSystemUiOverlays(): void;
    setSystemUiOverlayStyle(systemUiOverlayStyle: SystemChromeStyle): void;
    popSystemNavigator(): void;
    getClipboardData(result: MethodResult): void;
    setClipboardData(text: string, result: MethodResult): void;
    clipboardHasStrings(): boolean;
}
export enum ClipboardContentFormat {
    PLAIN_TEXT = "text/plain"
}
export enum SoundType {
    CLICK = "SystemSoundType.click",
    ALERT = "SystemSoundType.alert"
}
export class AppSwitcherDescription {
    public readonly color: number;
    public readonly label: string;
    constructor(q23: number, r23: string) {
        this.color = q23;
        this.label = r23;
    }
}
export enum SystemUiOverlay {
    TOP_OVERLAYS = "SystemUiOverlay.top",
    BOTTOM_OVERLAYS = "SystemUiOverlay.bottom"
}
export enum SystemUiMode {
    LEAN_BACK = "SystemUiMode.leanBack",
    IMMERSIVE = "SystemUiMode.immersive",
    IMMERSIVE_STICKY = "SystemUiMode.immersiveSticky",
    EDGE_TO_EDGE = "SystemUiMode.edgeToEdge"
}
export enum Brightness {
    LIGHT = "Brightness.light",
    DARK = "Brightness.dark"
}
export class SystemChromeStyle {
    public readonly statusBarColor: number | null;
    public readonly statusBarIconBrightness: Brightness | null;
    public readonly systemStatusBarContrastEnforced: boolean | null;
    public readonly systemNavigationBarColor: number | null;
    public readonly systemNavigationBarIconBrightness: Brightness | null;
    public readonly systemNavigationBarDividerColor: number | null;
    public readonly systemNavigationBarContrastEnforced: boolean | null;
    constructor(j23: number | null, k23: Brightness | null, l23: boolean | null, m23: number | null, n23: Brightness | null, o23: number | null, p23: boolean | null) {
        this.statusBarColor = j23;
        this.statusBarIconBrightness = k23;
        this.systemStatusBarContrastEnforced = l23;
        this.systemNavigationBarColor = m23;
        this.systemNavigationBarIconBrightness = n23;
        this.systemNavigationBarDividerColor = o23;
        this.systemNavigationBarContrastEnforced = p23;
    }
}
export enum DeviceOrientation {
    PORTRAIT_UP = "DeviceOrientation.portraitUp",
    PORTRAIT_DOWN = "DeviceOrientation.portraitDown",
    LANDSCAPE_LEFT = "DeviceOrientation.landscapeLeft",
    LANDSCAPE_RIGHT = "DeviceOrientation.landscapeRight"
}
class PlatformMethodCallback implements MethodCallHandler {
    private static TAG = "PlatformMethodCallback";
    platform: PlatformChannel;
    constructor(i23: PlatformChannel) {
        this.platform = i23;
    }
    onMethodCall(n22: MethodCall, o22: MethodResult) {
        if (this.platform.platformMessageHandler == null) {
            Log.w(PlatformMethodCallback.TAG, "platformMessageHandler is null");
            return;
        }
        let p22: string = n22.method;
        let q22: Any = n22.args;
        Log.d(PlatformMethodCallback.TAG, "Received '" + p22 + "' message.");
        try {
            switch (p22) {
                case "SystemSound.play":
                    break;
                case "HapticFeedback.vibrate":
                    try {
                        Log.d(PlatformMethodCallback.TAG, "HapticFeedback: " + q22 as string);
                        let h23 = this.platform.getFeedbackTypeFromValue(q22 as string);
                        this.platform.platformMessageHandler.vibrateHapticFeedback(h23);
                        o22.success(null);
                    }
                    catch (g23) {
                        Log.e(PlatformMethodCallback.TAG, "HapticFeedback.vibrate error:" + JSON.stringify(g23));
                    }
                    break;
                case "SystemChrome.setPreferredOrientations":
                    Log.d(PlatformMethodCallback.TAG, "setPreferredOrientations: " + JSON.stringify(q22));
                    let s22 = this.platform.decodeOrientations(q22 as string[]);
                    this.platform.platformMessageHandler.setPreferredOrientations(s22, o22);
                    break;
                case "SystemChrome.setApplicationSwitcherDescription":
                    Log.d(PlatformMethodCallback.TAG, "setApplicationSwitcherDescription: " + JSON.stringify(q22));
                    try {
                        let f23: AppSwitcherDescription = this.decodeAppSwitcherDescription(q22);
                        this.platform.platformMessageHandler.setApplicationSwitcherDescription(f23);
                        o22.success(null);
                    }
                    catch (e23) {
                        Log.e(PlatformMethodCallback.TAG, "setApplicationSwitcherDescription err:" + JSON.stringify(e23));
                        o22.error("error", JSON.stringify(e23), null);
                    }
                    break;
                case "SystemChrome.setEnabledSystemUIOverlays":
                    try {
                        let d23: SystemUiOverlay[] = this.decodeSystemUiOverlays(q22);
                        Log.d(PlatformMethodCallback.TAG, "overlays: " + d23);
                        this.platform.platformMessageHandler.showSystemOverlays(d23);
                        o22.success(null);
                    }
                    catch (c23) {
                        Log.e(PlatformMethodCallback.TAG, "setEnabledSystemUIOverlays err:" + JSON.stringify(c23));
                        o22.error("error", JSON.stringify(c23), null);
                    }
                    break;
                case "SystemChrome.setEnabledSystemUIMode":
                    try {
                        Log.d(PlatformMethodCallback.TAG, "setEnabledSystemUIMode args:" + q22 as string);
                        let b23: SystemUiMode = this.decodeSystemUiMode(q22 as string);
                        this.platform.platformMessageHandler.showSystemUiMode(b23);
                    }
                    catch (a23) {
                        Log.e(PlatformMethodCallback.TAG, "setEnabledSystemUIMode err:" + JSON.stringify(a23));
                        o22.error("error", JSON.stringify(a23), null);
                    }
                    break;
                case "SystemChrome.setSystemUIChangeListener":
                    this.platform.platformMessageHandler.setSystemUiChangeListener();
                    o22.success(null);
                    break;
                case "SystemChrome.restoreSystemUIOverlays":
                    this.platform.platformMessageHandler.restoreSystemUiOverlays();
                    o22.success(null);
                    break;
                case "SystemChrome.setSystemUIOverlayStyle":
                    try {
                        Log.d(PlatformMethodCallback.TAG, "setSystemUIOverlayStyle asrgs: " + JSON.stringify(q22));
                        let z22: SystemChromeStyle = this.decodeSystemChromeStyle(q22);
                        this.platform.platformMessageHandler.setSystemUiOverlayStyle(z22);
                        o22.success(null);
                    }
                    catch (y22) {
                        Log.e(PlatformMethodCallback.TAG, "setSystemUIOverlayStyle err:" + JSON.stringify(y22));
                        o22.error("error", JSON.stringify(y22), null);
                    }
                    break;
                case "SystemNavigator.pop":
                    this.platform.platformMessageHandler.popSystemNavigator();
                    o22.success(null);
                    break;
                case "Clipboard.getData":
                    this.platform.platformMessageHandler.getClipboardData(o22);
                    break;
                case "Clipboard.setData":
                    let t22: string = q22.get('text');
                    this.platform.platformMessageHandler.setClipboardData(t22, o22);
                    break;
                case "Clipboard.hasStrings":
                    let u22: Any = new Map().set("value", false);
                    let v22 = pasteboard.getSystemPasteboard();
                    v22.hasData().then((x22) => {
                        u22.set("value", x22);
                        o22.success(u22);
                    }).catch((w22: Any) => {
                        Log.e(PlatformMethodCallback.TAG, "systemPasteboard.hasData err: " + JSON.stringify(w22));
                    });
                    break;
                default:
                    o22.notImplemented();
                    break;
            }
        }
        catch (r22) {
            o22.error("error", JSON.stringify(r22), null);
        }
    }
    private decodeAppSwitcherDescription(k22: Map<string, Object>): AppSwitcherDescription {
        let l22: number = k22.get('color') as number;
        let m22: string = k22.get('label') as string;
        return new AppSwitcherDescription(l22, m22);
    }
    private decodeSystemUiOverlays(f22: string[]): SystemUiOverlay[] {
        let g22: SystemUiOverlay[] = [];
        for (let h22 = 0; h22 < f22.length; h22++) {
            const i22 = f22[h22];
            const j22 = this.platform.getSystemUiOverlayFromValue(i22);
            switch (j22) {
                case SystemUiOverlay.TOP_OVERLAYS:
                    g22.push(SystemUiOverlay.TOP_OVERLAYS);
                    break;
                case SystemUiOverlay.BOTTOM_OVERLAYS:
                    g22.push(SystemUiOverlay.BOTTOM_OVERLAYS);
                    break;
            }
        }
        return g22;
    }
    private decodeSystemUiMode(d22: string): SystemUiMode {
        let e22: SystemUiMode = this.platform.getSystemUiModeFromValue(d22);
        switch (e22) {
            case SystemUiMode.LEAN_BACK:
                return SystemUiMode.LEAN_BACK;
            case SystemUiMode.IMMERSIVE:
                return SystemUiMode.IMMERSIVE;
            case SystemUiMode.IMMERSIVE_STICKY:
                return SystemUiMode.IMMERSIVE_STICKY;
            case SystemUiMode.EDGE_TO_EDGE:
            default:
                return SystemUiMode.EDGE_TO_EDGE;
        }
    }
    private decodeSystemChromeStyle(v21: Map<string, Object> | null): SystemChromeStyle {
        let w21: number | null = null;
        let x21: Brightness | null = null;
        let y21: boolean | null = null;
        let z21: number | null = null;
        let a22: Brightness | null = null;
        let b22: number | null = null;
        let c22: boolean | null = null;
        if (v21?.get('statusBarColor') != null) {
            w21 = v21.get('statusBarColor') as number;
        }
        if (v21?.get('statusBarIconBrightness') != null) {
            x21 = this.platform.getBrightnessFromValue(v21.get('statusBarIconBrightness') as string);
        }
        if (v21?.get('systemStatusBarContrastEnforced') != null) {
            y21 = v21.get('systemStatusBarContrastEnforced') as boolean;
        }
        if (v21?.get('systemNavigationBarColor') != null) {
            z21 = v21.get('systemNavigationBarColor') as number;
        }
        if (v21?.get('systemNavigationBarIconBrightness') != null) {
            a22 = this.platform.getBrightnessFromValue(v21.get('systemNavigationBarIconBrightness') as string);
        }
        if (v21?.get('systemNavigationBarDividerColor') != null) {
            b22 = v21.get('systemNavigationBarDividerColor') as number;
        }
        if (v21?.get('systemNavigationBarContrastEnforced') != null) {
            c22 = v21.get('systemNavigationBarContrastEnforced') as boolean;
        }
        return new SystemChromeStyle(w21, x21, y21, z21, a22, b22, c22);
    }
}
