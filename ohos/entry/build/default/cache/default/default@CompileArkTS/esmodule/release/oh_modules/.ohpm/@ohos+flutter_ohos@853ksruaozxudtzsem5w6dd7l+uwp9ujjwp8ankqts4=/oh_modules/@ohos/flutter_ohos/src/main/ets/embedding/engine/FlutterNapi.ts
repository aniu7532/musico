import flutter from "@app:com.example.beat/entry/flutter";
import type common from "@ohos:app.ability.common";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type resourceManager from "@ohos:resourceManager";
import type { PlatformMessageHandler } from './dart/PlatformMessageHandler';
import { FlutterCallbackInformation } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/FlutterCallbackInformation";
import image from "@ohos:multimedia.image";
import type { EngineLifecycleListener } from './FlutterEngine';
import type { ByteBuffer } from '../../util/ByteBuffer';
import type { AccessibilityManager, Action } from '../../view/AccessibilityBridge';
import type LocalizationPlugin from '../../plugin/localization/LocalizationPlugin';
import i18n from "@ohos:i18n";
import type Any from '../../plugin/common/Any';
import FlutterManager from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterManager";
import deviceInfo from "@ohos:deviceInfo";
import TouchEventProcessor from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/TouchEventProcessor";
import BuildProfile from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/BuildProfile";
const TAG = "FlutterNapi";
enum ContextType {
    APP_LIFECYCLE = 0,
    JS_PAGE_LIFECYCLE = 1
}
export default class FlutterNapi {
    private static hasInit: boolean = false;
    hasImplemented: boolean = false;
    nativeShellHolderId: number | null = null;
    platformMessageHandler: PlatformMessageHandler | null = null;
    private engineLifecycleListeners = new Set<EngineLifecycleListener>();
    accessibilityDelegate: AccessibilityDelegate | null = null;
    localizationPlugin: LocalizationPlugin | null = null;
    isDisplayingFlutterUi: boolean = false;
    accessibilityManager: AccessibilityManager | null = null;
    updateRefreshRate(u13: number) {
        flutter.nativeUpdateRefreshRate(u13);
    }
    init(n13: common.Context, o13: Array<string>, p13: string, q13: string, r13: string, s13: number) {
        if (FlutterNapi.hasInit) {
            Log.e(TAG, "the engine has init");
            return;
        }
        Log.w(TAG, "HAR_VERSION=" + BuildProfile.HAR_VERSION);
        Log.d(TAG, JSON.stringify({
            "name": "init, initTimeMillis=" + s13,
            "bundlePath": p13,
            "appStoragePath": q13,
            "engineCachesPath": r13,
            "args": o13,
        }));
        let t13: number | null = flutter.nativeInit(n13, o13, p13, q13, r13, s13, deviceInfo.productModel);
        FlutterNapi.hasInit = t13 == 0;
        Log.d(TAG, "init code=" + t13 + ", FlutterNapi.hasInit" + FlutterNapi.hasInit);
    }
    static prefetchDefaultFontManager(): void {
        flutter.nativePrefetchDefaultFontManager();
    }
    attachToNative(): void {
        if (!FlutterNapi.hasInit) {
            Log.e(TAG, "attachToNative fail, FlutterNapi.hasInit=" + FlutterNapi.hasInit);
            return;
        }
        this.nativeShellHolderId = flutter.nativeAttach(this);
        Log.d(TAG, "nativeShellHolderId=" + this.nativeShellHolderId);
    }
    runBundleAndSnapshotFromLibrary(i13: string, j13: string | undefined, k13: string | undefined, l13: resourceManager.ResourceManager, m13: Array<string>) {
        if (!FlutterNapi.hasInit) {
            Log.e(TAG, "runBundleAndSnapshotFromLibrary fail, FlutterNapi.hasInit=" + FlutterNapi.hasInit);
            return;
        }
        Log.d(TAG, "init: bundlePath=" + i13 + "  entrypointFunctionName=" + j13 + "  pathToEntrypointFunction=" + k13 + "  entrypointArgs=" + JSON.stringify(m13));
        if (!this.isAttached()) {
            Log.e(TAG, "runBundleAndSnapshotFromLibrary this.nativeShellHolderId:" + this.nativeShellHolderId);
            return;
        }
        flutter.nativeRunBundleAndSnapshotFromLibrary(this.nativeShellHolderId!, i13, j13 as string, k13 as string, l13, m13);
    }
    ;
    checkImplemented(h13: string = ""): boolean {
        if (!this.hasImplemented) {
            Log.e(TAG, "this method has not implemented -> " + h13);
        }
        return this.hasImplemented;
    }
    setPlatformMessageHandler(g13: PlatformMessageHandler | null): void {
        this.ensureRunningOnMainThread();
        this.platformMessageHandler = g13;
    }
    private nativeNotifyLowMemoryWarning(f13: number): void {
    }
    static nativeLookupCallbackInformation(c13: number): FlutterCallbackInformation | null {
        let d13 = new FlutterCallbackInformation();
        let e13: number = flutter.nativeLookupCallbackInformation(d13, c13);
        if (e13 == 0) {
            return d13;
        }
        return null;
    }
    notifyLowMemoryWarning(): void {
        this.ensureRunningOnMainThread();
        if (!this.isAttached()) {
            Log.e(TAG, "notifyLowMemoryWarning this.nativeShellHolderId:" + this.nativeShellHolderId);
            return;
        }
        this.nativeNotifyLowMemoryWarning(this.nativeShellHolderId!);
    }
    isAttached(): boolean {
        return this.nativeShellHolderId != null;
    }
    private ensureRunningOnMainThread(): void {
    }
    dispatchEmptyPlatformMessage(a13: String, b13: number): void {
        this.ensureRunningOnMainThread();
        if (this.isAttached()) {
            flutter.nativeDispatchEmptyPlatformMessage(this.nativeShellHolderId!, a13, b13);
        }
        else {
            Log.w(TAG, "Tried to send a platform message to Flutter, but FlutterNapi was detached from native C++. Could not send. Channel: "
                + a13
                + ". Response ID: "
                + b13);
        }
    }
    dispatchPlatformMessage(w12: String, x12: ArrayBuffer, y12: number, z12: number): void {
        this.ensureRunningOnMainThread();
        if (this.isAttached()) {
            flutter.nativeDispatchPlatformMessage(this.nativeShellHolderId!, w12, x12, y12, z12);
        }
        else {
            Log.w(TAG, "Tried to send a platform message to Flutter, but FlutterNapi was detached from native C++. Could not send. Channel: "
                + w12
                + ". Response ID: "
                + z12);
        }
    }
    invokePlatformMessageEmptyResponseCallback(v12: number): void {
        if (this.isAttached()) {
            flutter.nativeInvokePlatformMessageEmptyResponseCallback(this.nativeShellHolderId!, v12);
        }
        else {
            Log.w(TAG, "Tried to send a platform message response, but FlutterNapi was detached from native C++. Could not send. Response ID: "
                + v12);
        }
    }
    invokePlatformMessageResponseCallback(s12: number, t12: ArrayBuffer, u12: number) {
        if (this.isAttached()) {
            flutter.nativeInvokePlatformMessageResponseCallback(this.nativeShellHolderId!, s12, t12, u12);
        }
        else {
            Log.w(TAG, "Tried to send a platform message response, but FlutterNapi was detached from native C++. Could not send. Response ID: "
                + s12);
        }
    }
    setViewportMetrics(z11: number, a12: number, b12: number, c12: number, d12: number, e12: number, f12: number, g12: number, h12: number, i12: number, j12: number, k12: number, l12: number, m12: number, n12: number, o12: number, p12: Array<number>, q12: Array<number>, r12: Array<number>): void {
        if (this.isAttached()) {
            flutter.nativeSetViewportMetrics(this.nativeShellHolderId!, z11, a12, b12, c12, d12, e12, f12, g12, h12, i12, j12, k12, l12, m12, n12, o12, p12, q12, r12);
        }
    }
    spawn(t11: string, u11: string, v11: string, w11: Array<string>): FlutterNapi {
        let x11 = new FlutterNapi();
        let y11: number = flutter.nativeSpawn(this.nativeShellHolderId, t11, u11, v11, w11, x11);
        x11.nativeShellHolderId = y11;
        return x11;
    }
    addEngineLifecycleListener(s11: EngineLifecycleListener): void {
        this.engineLifecycleListeners.add(s11);
    }
    removeEngineLifecycleListener(r11: EngineLifecycleListener) {
        this.engineLifecycleListeners.delete(r11);
    }
    handlePlatformMessageResponse(p11: number, q11: ArrayBuffer): void {
        Log.d(TAG, "called handlePlatformMessageResponse Response ID: " + p11);
        if (this.platformMessageHandler != null) {
            this.platformMessageHandler.handlePlatformMessageResponse(p11, q11);
        }
    }
    handlePlatformMessage(l11: string, m11: ArrayBuffer, n11: number, o11: number): void {
        Log.d(TAG, "called handlePlatformMessage Channel: " + l11 + ". Response ID: " + n11);
        if (this.platformMessageHandler != null) {
            this.platformMessageHandler.handleMessageFromDart(l11, m11, n11, o11);
        }
    }
    onFirstFrame(): void {
        this.isDisplayingFlutterUi = true;
        Log.d(TAG, "called onFirstFrame");
        FlutterManager.getInstance().getFlutterViewList().forEach((k11) => {
            k11.onFirstFrame();
        });
    }
    onPreEngineRestart(): void {
        Log.d(TAG, "called onPreEngineRestart");
        this.engineLifecycleListeners.forEach(j11 => j11.onPreEngineRestart());
    }
    computePlatformResolvedLocale(i11: Array<string>): Array<string> {
        Log.d(TAG, "called computePlatformResolvedLocale " + JSON.stringify(i11));
        return [];
    }
    decodeImage(b11: ArrayBuffer, c11: number): void {
        if (b11) {
            Log.d(TAG, "called decodeImage=" + b11.byteLength);
            const d11 = image.createImageSource(b11);
            let e11: image.PixelMap | null = null;
            d11.createPixelMap({
                desiredPixelFormat: image.PixelMapFormat.RGBA_8888
            }).then(h11 => {
                Log.d(TAG, "called createPixelMap end " + h11.getPixelBytesNumber());
                e11 = h11;
                return h11.getImageInfo();
            }).then(g11 => {
                Log.d(TAG, `nativeImageHeaderCallback width=${g11.size.width}  height=${g11.size.height} imageGeneratorAddress=${c11}`);
                flutter.nativeImageDecodeCallback(g11.size.width, g11.size.height, c11, e11);
            }).catch((f11: Any) => {
                Log.d(TAG, "decodeImage error=" + JSON.stringify(f11));
                flutter.nativeImageDecodeCallback(0, 0, c11, null);
            });
        }
        else {
            flutter.nativeImageDecodeCallback(0, 0, c11, null);
        }
    }
    setSemanticsEnabledWithRespId(z10: boolean, a11: number): void {
        this.ensureRunningOnMainThread();
        if (this.isAttached()) {
            flutter.nativeSetSemanticsEnabled(this.nativeShellHolderId!, z10);
        }
        else {
            Log.w(TAG, "Tried to send a platform message response, but FlutterNapi was detached from native C++. Could not send. Response ID: "
                + a11);
        }
    }
    setSemanticsEnabled(y10: boolean): void {
        this.ensureRunningOnMainThread();
        if (this.isAttached()) {
            flutter.nativeSetSemanticsEnabled(this.nativeShellHolderId!, y10);
        }
        else {
            Log.e(TAG, "Tried to send a platform message response, but FlutterNapi was detached from native C++. Could not send.");
        }
    }
    setAccessibilityFeatures(w10: number, x10: number): void {
        if (this.isAttached()) {
            flutter.nativeSetAccessibilityFeatures(w10, x10);
        }
        else {
            Log.w(TAG, "Tried to send a platform message response, but FlutterNapi was detached from native C++. Could not send. Response ID: "
                + x10);
        }
    }
    nativeSetAccessibilityFeatures(u10: number, v10: number): void { }
    dispatchSemanticsAction(r10: number, s10: Action, t10: number): void {
        if (this.isAttached()) {
            this.nativeDispatchSemanticsAction(r10, s10, t10);
        }
        else {
            Log.w(TAG, "Tried to send a platform message response, but FlutterNapi was detached from native C++. Could not send. Response ID: "
                + t10);
        }
    }
    nativeDispatchSemanticsAction(o10: number, p10: Action, q10: number): void { }
    setAccessibilityDelegate(m10: AccessibilityDelegate, n10: number): void {
        if (this.isAttached()) {
            this.accessibilityDelegate = m10;
        }
        else {
            Log.w(TAG, "Tried to send a platform message response, but FlutterNapi was detached from native C++. Could not send. Response ID: "
                + n10);
        }
    }
    accessibilityStateChange(l10: Boolean): void {
        this.ensureRunningOnMainThread();
        if (this.accessibilityDelegate != null) {
            this.accessibilityDelegate.accessibilityStateChange(l10);
        }
        Log.d(TAG, "accessibilityStateChange is called");
        flutter.nativeAccessibilityStateChange(this.nativeShellHolderId!, l10);
    }
    setLocalizationPlugin(k10: LocalizationPlugin | null): void {
        this.localizationPlugin = k10;
    }
    getSystemLanguages() {
        Log.d(TAG, "called getSystemLanguages ");
        let i10: number;
        let j10 = i18n.System.getPreferredLanguageList();
        for (i10 = 0; i10 < j10.length; i10++) {
            Log.d(TAG, "systemlanguages " + i10 + ":" + j10[i10]);
        }
        if (!this.isAttached()) {
            Log.e(TAG, "getSystemLanguages this.nativeShellHolderId:" + this.nativeShellHolderId);
            return;
        }
        flutter.nativeGetSystemLanguages(this.nativeShellHolderId!, j10);
    }
    xComponentAttachFlutterEngine(h10: string) {
        flutter.nativeXComponentAttachFlutterEngine(h10, this.nativeShellHolderId!);
    }
    xComponentDetachFlutterEngine(g10: string) {
        flutter.nativeXComponentDetachFlutterEngine(g10, this.nativeShellHolderId!);
    }
    xComponentDisPatchMouseWheel(b10: string, c10: string, d10: PanGestureEvent) {
        if (d10.source !== SourceType.Mouse) {
            return;
        }
        const e10 = d10.fingerList?.find(f10 => f10.globalX && f10.globalY);
        if (!e10) {
            return;
        }
        flutter.nativeXComponentDispatchMouseWheel(this.nativeShellHolderId!!, b10, c10, e10?.id, e10?.localX, e10?.localY, d10.offsetY, d10.timestamp);
    }
    detachFromNativeAndReleaseResources() {
        if (!this.isAttached()) {
            Log.e(TAG, "detachFromNativeAndReleaseResources this.nativeShellHolderId:" + this.nativeShellHolderId);
            return;
        }
        flutter.nativeDestroy(this.nativeShellHolderId!);
        this.nativeShellHolderId = null;
    }
    initNativeImage(z9: number, a10: image.Image) {
        Log.d(TAG, "called initNativeImage ");
        if (!this.isAttached()) {
            Log.e(TAG, "initNativeImage this.nativeShellHolderId:" + this.nativeShellHolderId);
            return;
        }
        flutter.nativeInitNativeImage(this.nativeShellHolderId!, z9, a10);
    }
    unregisterTexture(y9: number): void {
        Log.d(TAG, "called unregisterTexture ");
        if (!this.isAttached()) {
            Log.e(TAG, "unregisterTexture this.nativeShellHolderId:" + this.nativeShellHolderId);
            return;
        }
        flutter.nativeUnregisterTexture(this.nativeShellHolderId!, y9);
    }
    registerPixelMap(w9: number, x9: PixelMap): void {
        Log.d(TAG, "called registerPixelMap ");
        if (!this.isAttached()) {
            Log.e(TAG, "registerPixelMap this.nativeShellHolderId:" + this.nativeShellHolderId);
            return;
        }
        flutter.nativeRegisterPixelMap(this.nativeShellHolderId!, w9, x9);
    }
    setTextureBackGroundPixelMap(u9: number, v9: PixelMap): void {
        Log.d(TAG, "called setTextureBackGroundPixelMap ");
        flutter.nativeSetTextureBackGroundPixelMap(this.nativeShellHolderId!, u9, v9);
    }
    registerTexture(t9: number): number {
        Log.d(TAG, "called registerTexture ");
        if (!this.isAttached()) {
            Log.e(TAG, "registerTexture this.nativeShellHolderId:" + this.nativeShellHolderId);
            return 0;
        }
        return flutter.nativeRegisterTexture(this.nativeShellHolderId!, t9);
    }
    setTextureBufferSize(q9: number, r9: number, s9: number): void {
        Log.d(TAG, "called setTextureBufferSize ");
        if (!this.isAttached()) {
            Log.e(TAG, "setTextureBufferSize this.nativeShellHolderId:" + this.nativeShellHolderId);
            return;
        }
        flutter.nativeSetTextureBufferSize(this.nativeShellHolderId!, q9, r9, s9);
    }
    onTouchEvent(p9: Array<string>): void {
        if (this.isAttached()) {
            TouchEventProcessor.getInstance().postTouchEvent(p9);
        }
    }
    getShellHolderId(): void {
        this.ensureRunningOnMainThread();
        if (this.isAttached()) {
            flutter.nativeGetShellHolderId(this.nativeShellHolderId!);
        }
    }
    setFontWeightScale(o9: number): void {
        this.ensureRunningOnMainThread();
        if (this.isAttached()) {
            Log.i(TAG, "setFontWeightScale: " + o9);
            flutter.nativeSetFontWeightScale(this.nativeShellHolderId!, o9);
        }
        else {
            Log.w(TAG, "setFontWeightScale is detached !");
        }
    }
    setFlutterNavigationAction(n9: boolean): void {
        this.ensureRunningOnMainThread();
        if (this.isAttached()) {
            Log.i(TAG, "setFlutterNavigationAction: " + n9);
            flutter.nativeGetFlutterNavigationAction(n9);
        }
        else {
            Log.w(TAG, "setFlutterNavigationAction is detached !");
        }
    }
    static unicodeIsEmoji(m9: number): boolean {
        return Boolean(flutter.nativeUnicodeIsEmoji(m9));
    }
    static unicodeIsEmojiModifier(l9: number): boolean {
        return Boolean(flutter.nativeUnicodeIsEmojiModifier(l9));
    }
    static unicodeIsEmojiModifierBase(k9: number): boolean {
        return Boolean(flutter.nativeUnicodeIsEmojiModifierBase(k9));
    }
    static unicodeIsVariationSelector(j9: number): boolean {
        return Boolean(flutter.nativeUnicodeIsVariationSelector(j9));
    }
    static unicodeIsRegionalIndicatorSymbol(i9: number): boolean {
        return Boolean(flutter.nativeUnicodeIsRegionalIndicatorSymbol(i9));
    }
}
export interface AccessibilityDelegate {
    updateCustomAccessibilityActions(buffer: ByteBuffer, strings: string[]): void;
    updateSemantics(buffer: ByteBuffer, strings: string[], stringAttributeArgs: ByteBuffer[]): void;
    accessibilityStateChange(state: Boolean): void;
}
