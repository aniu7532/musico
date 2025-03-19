import type FlutterEngine from '../embedding/engine/FlutterEngine';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import { DVModel, DVModelChildren, DVModelEvents, DVModelParameters } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicView";
import display from "@ohos:display";
import FlutterManager from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterManager";
import window from "@ohos:window";
import KeyboardManager from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/KeyboardManager";
import MouseCursorPlugin from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/mouse/MouseCursorPlugin";
import Settings from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/Settings";
import ArrayList from "@ohos:util.ArrayList";
import { EmbeddingNodeController } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/EmbeddingNodeController";
import type PlatformView from '../plugin/platform/PlatformView';
import type { Params } from '../plugin/platform/PlatformView';
import JSON from "@ohos:util.json";
import accessibility from "@ohos:accessibility";
import TextInputPlugin from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/editing/TextInputPlugin";
const TAG = "FlutterViewTag";
export class ViewportMetrics {
    devicePixelRatio: number = 1.0;
    physicalWidth: number = 0;
    physicalHeight: number = 0;
    physicalViewPaddingTop: number = 0;
    physicalViewPaddingRight: number = 0;
    physicalViewPaddingBottom: number = 0;
    physicalViewPaddingLeft: number = 0;
    physicalViewInsetTop: number = 0;
    physicalViewInsetRight: number = 0;
    physicalViewInsetBottom: number = 0;
    physicalViewInsetLeft: number = 0;
    systemGestureInsetTop: number = 0;
    systemGestureInsetRight: number = 0;
    systemGestureInsetBottom: number = 0;
    systemGestureInsetLeft: number = 0;
    physicalTouchSlop: number = -1;
    clone(): ViewportMetrics {
        const n88 = new ViewportMetrics();
        n88.devicePixelRatio = this.devicePixelRatio;
        n88.physicalWidth = this.physicalWidth;
        n88.physicalHeight = this.physicalHeight;
        n88.physicalViewPaddingTop = this.physicalViewPaddingTop;
        n88.physicalViewPaddingRight = this.physicalViewPaddingRight;
        n88.physicalViewPaddingBottom = this.physicalViewPaddingBottom;
        n88.physicalViewPaddingLeft = this.physicalViewPaddingLeft;
        n88.physicalViewInsetTop = this.physicalViewInsetTop;
        n88.physicalViewInsetRight = this.physicalViewInsetRight;
        n88.physicalViewInsetBottom = this.physicalViewInsetBottom;
        n88.physicalViewInsetLeft = this.physicalViewInsetLeft;
        n88.systemGestureInsetTop = this.systemGestureInsetTop;
        n88.systemGestureInsetRight = this.systemGestureInsetRight;
        n88.systemGestureInsetBottom = this.systemGestureInsetBottom;
        n88.systemGestureInsetLeft = this.systemGestureInsetLeft;
        n88.physicalTouchSlop = this.physicalTouchSlop;
        return n88;
    }
    isEqual(m88: ViewportMetrics): boolean {
        return this.devicePixelRatio === m88.devicePixelRatio &&
            this.physicalWidth === m88.physicalWidth &&
            this.physicalHeight === m88.physicalHeight &&
            this.physicalViewPaddingTop === m88.physicalViewPaddingTop &&
            this.physicalViewPaddingRight === m88.physicalViewPaddingRight &&
            this.physicalViewPaddingBottom === m88.physicalViewPaddingBottom &&
            this.physicalViewPaddingLeft === m88.physicalViewPaddingLeft &&
            this.physicalViewInsetTop === m88.physicalViewInsetTop &&
            this.physicalViewInsetRight === m88.physicalViewInsetRight &&
            this.physicalViewInsetBottom === m88.physicalViewInsetBottom &&
            this.physicalViewInsetLeft === m88.physicalViewInsetLeft &&
            this.systemGestureInsetTop === m88.systemGestureInsetTop &&
            this.systemGestureInsetRight === m88.systemGestureInsetRight &&
            this.systemGestureInsetBottom === m88.systemGestureInsetBottom &&
            this.systemGestureInsetLeft === m88.systemGestureInsetLeft &&
            this.physicalTouchSlop === m88.physicalTouchSlop;
    }
}
export class PlatformViewParas {
    width: number = 0.0;
    height: number = 0.0;
    top: number = 0.0;
    left: number = 0.0;
    direction: Direction = Direction.Auto;
    setValue(i88: number, j88: number, k88: number, l88: number): void {
        this.width = i88;
        this.height = j88;
        this.top = k88;
        this.left = l88;
    }
    setOffset(g88: number, h88: number): void {
        this.top = g88;
        this.left = h88;
    }
}
export class FlutterView {
    private flutterEngine: FlutterEngine | null = null;
    private id: string = "";
    private dVModel: DVModel = new DVModel("Stack", new DVModelParameters(), new DVModelEvents(), new DVModelChildren(), null);
    private wrapBuilder: WrappedBuilder<[
        Params
    ]> | undefined = undefined;
    private platformView: PlatformView | undefined = undefined;
    private isSurfaceAvailableForRendering: boolean = false;
    private viewportMetrics = new ViewportMetrics();
    private displayInfo?: display.Display;
    private keyboardManager: KeyboardManager | null = null;
    private mainWindow: window.Window | null = null;
    private mouseCursorPlugin?: MouseCursorPlugin;
    private textInputPlugin?: TextInputPlugin;
    private uiContext?: UIContext | undefined;
    private settings?: Settings;
    private mFirstFrameListeners: ArrayList<FirstFrameListener>;
    private isFlutterUiDisplayed: boolean = false;
    private surfaceId: string = "0";
    private nodeController: EmbeddingNodeController = new EmbeddingNodeController();
    private platformViewSize: PlatformViewParas = new PlatformViewParas();
    private checkFullScreen: boolean = true;
    private checkKeyboard: boolean = true;
    private checkGesture: boolean = true;
    private systemAvoidArea: window.AvoidArea;
    private navigationAvoidArea: window.AvoidArea;
    private gestureAvoidArea: window.AvoidArea;
    private keyboardAvoidArea: window.AvoidArea;
    private needSetViewport: boolean = false;
    constructor(c88: string, d88: Context) {
        this.id = c88;
        this.displayInfo = display.getDefaultDisplaySync();
        this.viewportMetrics.devicePixelRatio = this.displayInfo?.densityPixels;
        this.mainWindow = FlutterManager.getInstance()
            .getWindowStage(FlutterManager.getInstance().getUIAbility(d88))
            .getMainWindowSync();
        this.mFirstFrameListeners = new ArrayList<FirstFrameListener>();
        this.mainWindow?.on('windowSizeChange', this.windowSizeChangeCallback);
        this.mainWindow?.on('avoidAreaChange', this.avoidAreaChangeCallback);
        this.mainWindow?.on('windowStatusChange', this.windowStatusChangeCallback);
        accessibility.on('accessibilityStateChange', (f88: boolean) => {
            Log.i(TAG, `subscribe accessibility state change, result: ${JSON.stringify(f88)}`);
            this.flutterEngine?.getFlutterNapi()?.accessibilityStateChange(f88);
        });
        this.mainWindow?.on('keyboardHeightChange', this.keyboardHeightChangeCallback);
        this.systemAvoidArea = this.mainWindow?.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
        this.navigationAvoidArea = this.mainWindow?.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
        this.gestureAvoidArea = this.mainWindow?.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM_GESTURE);
        this.keyboardAvoidArea = this.mainWindow?.getWindowAvoidArea(window.AvoidAreaType.TYPE_KEYBOARD);
        try {
            display.on("change", () => {
                this.displayInfo = display.getDefaultDisplaySync();
                if (this.viewportMetrics.devicePixelRatio != this.displayInfo?.densityPixels) {
                    this.viewportMetrics.devicePixelRatio = this.displayInfo?.densityPixels;
                    Log.i(TAG, "Display on: " + JSON.stringify(this.displayInfo));
                    this.updateViewportMetrics();
                }
            });
        }
        catch (e88) {
            Log.e(TAG, "displayInfo error" + JSON.stringify(e88));
        }
    }
    private windowSizeChangeCallback = (b88: window.Size) => {
        Log.i(TAG, "windowSizeChangeCallback w:" + b88.width + ", h:" + b88.height);
        if (this.isAttachedToFlutterEngine()) {
            this.onAreaChange(null);
        }
    };
    private avoidAreaChangeCallback = (a88: window.AvoidAreaOptions) => {
        Log.i(TAG, "avoidAreaChangeCallback, type=" + a88.type);
        if (a88.type == window.AvoidAreaType.TYPE_SYSTEM) {
            this.systemAvoidArea = a88.area;
        }
        else if (a88.type == window.AvoidAreaType.TYPE_SYSTEM_GESTURE) {
            this.gestureAvoidArea = a88.area;
        }
        else if (a88.type == window.AvoidAreaType.TYPE_KEYBOARD) {
            this.keyboardAvoidArea = a88.area;
        }
        else if (a88.type == window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR) {
            this.navigationAvoidArea = a88.area;
        }
        if (this.isAttachedToFlutterEngine()) {
            this.onAreaChange(null);
        }
    };
    private windowStatusChangeCallback = (z87: window.WindowStatusType) => {
        Log.i(TAG, "windowStatusChangeCallback " + z87);
        if (this.isAttachedToFlutterEngine()) {
            FlutterManager.getInstance().getFullScreenListener().onScreenStateChanged(z87);
        }
    };
    private keyboardHeightChangeCallback = (y87: number) => {
        Log.i(TAG, "keyboardHeightChangeCallback " + y87);
        this.keyboardAvoidArea.bottomRect.height = y87;
        if (this.isAttachedToFlutterEngine()) {
            this.onAreaChange(null);
        }
    };
    getId(): string {
        return this.id;
    }
    setSurfaceId(x87: string): void {
        this.surfaceId = x87;
    }
    getSurfaceId(): string {
        return this.surfaceId;
    }
    getEmbeddingNodeController(): EmbeddingNodeController {
        return this.nodeController;
    }
    setWrappedBuilder(w87: WrappedBuilder<[
        Params
    ]>) {
        this.wrapBuilder = w87;
    }
    getWrappedBuilder(): WrappedBuilder<[
        Params
    ]> | undefined {
        return this.wrapBuilder;
    }
    setPlatformView(v87: PlatformView) {
        this.platformView = v87;
    }
    getPlatformView(): PlatformView | undefined {
        return this.platformView;
    }
    getPlatformViewSize(): PlatformViewParas {
        return this.platformViewSize;
    }
    getDVModel() {
        return this.dVModel;
    }
    getKeyboardHeight() {
        return this.keyboardAvoidArea.bottomRect.height;
    }
    onDestroy() {
        try {
            this.mainWindow?.off('windowSizeChange', this.windowSizeChangeCallback);
            this.mainWindow?.off('avoidAreaChange', this.avoidAreaChangeCallback);
            this.mainWindow?.off('windowStatusChange', this.windowStatusChangeCallback);
            accessibility.off('accessibilityStateChange', (u87: boolean) => {
                Log.i(TAG, `unsubscribe accessibility state change, result: ${JSON.stringify(u87)}`);
            });
            this.mainWindow?.off('keyboardHeightChange', this.keyboardHeightChangeCallback);
        }
        catch (t87) {
            Log.e(TAG, "mainWindow off error: " + JSON.stringify(t87));
        }
        this.mainWindow = null;
        try {
            display.off("change", () => {
                this.displayInfo = display.getDefaultDisplaySync();
                this.viewportMetrics.devicePixelRatio = this.displayInfo?.densityPixels;
                Log.i(TAG, "Display Info: " + JSON.stringify(this.displayInfo));
                this.updateViewportMetrics();
            });
        }
        catch (s87) {
            Log.e(TAG, "displayInfo off error" + JSON.stringify(s87));
        }
    }
    attachToFlutterEngine(p87: FlutterEngine): void {
        if (this.isAttachedToFlutterEngine()) {
            if (p87 == this.flutterEngine) {
                Log.i(TAG, "Already attached to this engine. Doing nothing.");
                return;
            }
            Log.i(TAG, "Currently attached to a different engine. Detaching and then attaching"
                + " to new engine.");
            this.detachFromFlutterEngine();
        }
        Log.i(TAG, "attachToFlutterEngine");
        this.flutterEngine = p87;
        if (this.isSurfaceAvailableForRendering) {
            this.flutterEngine.getFlutterNapi().xComponentAttachFlutterEngine(this.id);
        }
        this.flutterEngine?.getFlutterNapi()?.updateRefreshRate(this.displayInfo!.refreshRate);
        p87.getPlatformViewsController()?.attachToView(this);
        this.updateViewportMetrics();
        let q87: Area | null = {
            width: px2vp(this.displayInfo!.width),
            height: px2vp(this.displayInfo!.height),
            position: { x: 0, y: 0 },
            globalPosition: { x: 0, y: 0 }
        };
        if (this.viewportMetrics.physicalWidth != 0 || this.viewportMetrics.physicalHeight != 0) {
            q87 = null;
        }
        this.onAreaChange(q87, true);
        let r87 = this.mainWindow?.getWindowProperties()?.id ?? 0;
        this.mouseCursorPlugin = new MouseCursorPlugin(r87, this.flutterEngine?.getMouseCursorChannel()!);
        this.textInputPlugin = new TextInputPlugin(this.flutterEngine?.getTextInputChannel()!);
        this.keyboardManager = new KeyboardManager(p87, this.textInputPlugin!);
        this.settings = new Settings(this.flutterEngine.getSettingsChannel()!);
        this.sendSettings();
        this.isFlutterUiDisplayed = this.flutterEngine.getFlutterNapi().isDisplayingFlutterUi;
        if (this.isFlutterUiDisplayed) {
            this.onFirstFrame();
        }
    }
    detachFromFlutterEngine(): void {
        Log.i(TAG, "detachFromFlutterEngine");
        if (!this.isAttachedToFlutterEngine()) {
            Log.d(TAG, "FlutterView not attached to an engine. Not detaching.");
            return;
        }
        if (this.isSurfaceAvailableForRendering) {
            this.flutterEngine!!.getFlutterNapi().xComponentDetachFlutterEngine(this.id);
        }
        this.flutterEngine?.getPlatformViewsController()?.detachFromView();
        this.flutterEngine = null;
        this.keyboardManager = null;
        this.textInputPlugin?.destroy();
    }
    onWindowCreated() {
        Log.d(TAG, "received onwindowCreated.");
        let o87 = this.mainWindow?.getUIContext();
        this.uiContext = o87;
        this.sendSettings();
        Log.d(TAG, "uiContext init and sendSettings finished.");
    }
    sendSettings(): void {
        if (this.uiContext != undefined && this.isAttachedToFlutterEngine()) {
            this.settings?.sendSettings(this.uiContext.getMediaQuery());
        }
        else {
            Log.e(TAG, "UIContext is null, cannot send Settings!");
        }
    }
    onSurfaceCreated() {
        this.isSurfaceAvailableForRendering = true;
        if (this.isAttachedToFlutterEngine()) {
            this.flutterEngine!!.getFlutterNapi().xComponentAttachFlutterEngine(this.id);
        }
    }
    onSurfaceDestroyed() {
        this.isSurfaceAvailableForRendering = false;
        if (this.isAttachedToFlutterEngine()) {
            this.flutterEngine!!.getFlutterNapi().xComponentDetachFlutterEngine(this.id);
        }
    }
    onAreaChange(l87: Area | null, m87: boolean = false) {
        const n87 = this.viewportMetrics.clone();
        if (l87 != null) {
            this.viewportMetrics.physicalWidth = vp2px(l87.width as number);
            this.viewportMetrics.physicalHeight = vp2px(l87.height as number);
        }
        if (this.checkFullScreen && (m87 || this.mainWindow?.getWindowProperties().isLayoutFullScreen)) {
            this.viewportMetrics.physicalViewPaddingTop = this.systemAvoidArea?.topRect.height ?? 0;
            this.viewportMetrics.physicalViewPaddingBottom = this.navigationAvoidArea?.bottomRect.height ?? 0;
        }
        else {
            this.viewportMetrics.physicalViewPaddingTop = 0;
            this.viewportMetrics.physicalViewPaddingBottom = 0;
        }
        this.viewportMetrics.physicalViewPaddingLeft = this.systemAvoidArea?.leftRect.width ?? 0;
        this.viewportMetrics.physicalViewPaddingRight = this.systemAvoidArea?.rightRect.width ?? 0;
        this.onKeyboardAreaChange();
        this.onGestureAreaChange();
        if (!this.viewportMetrics.isEqual(n87) || this.needSetViewport) {
            if (!this.updateViewportMetrics()) {
                this.needSetViewport = true;
            }
        }
    }
    private onKeyboardAreaChange() {
        if (this.checkKeyboard) {
            this.viewportMetrics.physicalViewInsetTop = this.keyboardAvoidArea?.topRect.height ?? 0;
            this.viewportMetrics.physicalViewInsetLeft = this.keyboardAvoidArea?.leftRect.width ?? 0;
            this.viewportMetrics.physicalViewInsetBottom = this.keyboardAvoidArea?.bottomRect.height ?? 0;
            this.viewportMetrics.physicalViewInsetRight = this.keyboardAvoidArea?.rightRect.width ?? 0;
        }
        else {
            this.viewportMetrics.physicalViewInsetTop = 0;
            this.viewportMetrics.physicalViewInsetLeft = 0;
            this.viewportMetrics.physicalViewInsetBottom = 0;
            this.viewportMetrics.physicalViewInsetRight = 0;
        }
    }
    private onGestureAreaChange() {
        if (this.checkGesture) {
            this.viewportMetrics.systemGestureInsetTop = this.gestureAvoidArea?.topRect.height ?? 0;
            this.viewportMetrics.systemGestureInsetLeft = this.gestureAvoidArea?.leftRect.width ?? 0;
            this.viewportMetrics.systemGestureInsetBottom = this.gestureAvoidArea?.bottomRect.height ?? 0;
            this.viewportMetrics.systemGestureInsetRight = this.gestureAvoidArea?.rightRect.width ?? 0;
        }
        else {
            this.viewportMetrics.systemGestureInsetTop = 0;
            this.viewportMetrics.systemGestureInsetLeft = 0;
            this.viewportMetrics.systemGestureInsetBottom = 0;
            this.viewportMetrics.systemGestureInsetRight = 0;
        }
    }
    public isAttachedToFlutterEngine(): boolean {
        return this.flutterEngine != null;
    }
    private updateViewportMetrics(): boolean {
        if (this.isAttachedToFlutterEngine()) {
            Log.i(TAG, 'updateViewportMetrics devicePixelRatio:' + this.viewportMetrics.devicePixelRatio);
            this?.flutterEngine?.getFlutterNapi()?.setViewportMetrics(this.viewportMetrics.devicePixelRatio, this.viewportMetrics.physicalWidth, this.viewportMetrics.physicalHeight, this.viewportMetrics.physicalViewPaddingTop, this.viewportMetrics.physicalViewPaddingRight, this.viewportMetrics.physicalViewPaddingBottom, this.viewportMetrics.physicalViewPaddingLeft, this.viewportMetrics.physicalViewInsetTop, this.viewportMetrics.physicalViewInsetRight, this.viewportMetrics.physicalViewInsetBottom, this.viewportMetrics.physicalViewInsetLeft, this.viewportMetrics.systemGestureInsetTop, this.viewportMetrics.systemGestureInsetRight, this.viewportMetrics.systemGestureInsetBottom, this.viewportMetrics.systemGestureInsetLeft, this.viewportMetrics.physicalTouchSlop, new Array(0), new Array(0), new Array(0));
            return true;
        }
        return false;
    }
    onKeyPreIme(k87: KeyEvent): boolean {
        return this.keyboardManager?.onKeyPreIme(k87) ?? false;
    }
    onKeyEvent(j87: KeyEvent): boolean {
        return this.keyboardManager?.onKeyEvent(j87) ?? false;
    }
    onMouseWheel(h87: string, i87: PanGestureEvent) {
        this.flutterEngine?.getFlutterNapi()?.xComponentDisPatchMouseWheel(this.id, h87, i87);
    }
    addFirstFrameListener(g87: FirstFrameListener) {
        this.mFirstFrameListeners.add(g87);
    }
    removeFirstFrameListener(f87: FirstFrameListener) {
        this.mFirstFrameListeners.remove(f87);
    }
    hasRenderedFirstFrame(): boolean {
        return this.isFlutterUiDisplayed;
    }
    onFirstFrame() {
        let d87 = this.mFirstFrameListeners.clone();
        d87.forEach((e87) => {
            e87.onFirstFrame();
        });
    }
    setCheckFullScreen(c87: boolean) {
        this.checkFullScreen = c87;
    }
    setCheckKeyboard(b87: boolean) {
        this.checkKeyboard = b87;
    }
    setCheckGesture(a87: boolean) {
        this.checkGesture = a87;
    }
}
export interface FirstFrameListener {
    onFirstFrame(): void;
}
