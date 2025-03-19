import type { PlatformViewsAccessibilityDelegate } from './PlatformViewsAccessibilityDelegate';
import PlatformViewsChannel, { PlatformViewBufferSize } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/PlatformViewsChannel";
import type { PlatformViewBufferResized, PlatformViewCreationRequest, PlatformViewResizeRequest, PlatformViewsHandler, PlatformViewTouch } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/PlatformViewsChannel";
import type PlatformView from './PlatformView';
import type { Params } from './PlatformView';
import type { DVModelParameters } from '../../view/DynamicView/dynamicView';
import { createDVModelFromJson } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicViewJson";
import display from "@ohos:display";
import { FlutterView } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/FlutterView";
import type { TextureRegistry } from '../../view/TextureRegistry';
import type TextInputPlugin from '../editing/TextInputPlugin';
import type { PlatformOverlayView } from './PlatformOverlayView';
import { PlatformViewWrapper } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/platform/PlatformViewWrapper";
import { FlutterOverlaySurface } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterOverlaySurface";
import HashSet from "@ohos:util.HashSet";
import type PlatformViewRegistry from './PlatformViewRegistry';
import PlatformViewRegistryImpl from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/platform/PlatformViewRegistryImpl";
import type DartExecutor from '../../embedding/engine/dart/DartExecutor';
import { AccessibilityEventsDelegate } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/platform/AccessibilityEventsDelegate";
import type AccessibilityBridge from '../../view/AccessibilityBridge';
import type { FlutterMutatorView } from '../../embedding/engine/mutatorsstack/FlutterMutatorView';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type PlatformViewFactory from './PlatformViewFactory';
import type { ByteBuffer } from '../../util/ByteBuffer';
import type Any from '../common/Any';
import Stack from "@ohos:util.Stack";
import type { CustomTouchEvent } from './CustomTouchEvent';
import { NodeRenderType } from "@ohos:arkui.node";
import { EmbeddingNodeController } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/EmbeddingNodeController";
class DVModelJson {
    compType: string;
    children: Array<any>;
    attributes: any;
    events: any;
    build: any;
    constructor(w72: string, x72: Array<any>, y72: any, z72: any, a73?: any) {
        this.compType = w72;
        this.children = x72;
        this.attributes = y72;
        this.events = z72;
        this.build = a73;
    }
}
const TAG = "PlatformViewsController";
export default class PlatformViewsController implements PlatformViewsAccessibilityDelegate, PlatformViewsHandler {
    private registry: PlatformViewRegistryImpl;
    private context: Context | null = null;
    private flutterView: FlutterView | null = null;
    private textureRegistry: TextureRegistry | null = null;
    private textInputPlugin: TextInputPlugin | null = null;
    private platformViewsChannel: PlatformViewsChannel | null = null;
    private accessibilityEventsDelegate: AccessibilityEventsDelegate;
    private nextOverlayLayerId: number = 0;
    private usesSoftwareRendering: boolean = false;
    private platformViews: Map<number, PlatformView>;
    private viewIdWithTextureId: Map<number, number>;
    private viewIdWithNodeController: Map<number, EmbeddingNodeController>;
    private overlayLayerViews: Map<number, PlatformOverlayView>;
    private viewWrappers: Map<number, PlatformViewWrapper>;
    private currentFrameUsedOverlayLayerIds: HashSet<number>;
    private currentFrameUsedPlatformViewIds: HashSet<number>;
    private platformViewParent: Map<number, FlutterMutatorView>;
    private nodeControllers: Stack<EmbeddingNodeController>;
    constructor() {
        this.registry = new PlatformViewRegistryImpl();
        this.accessibilityEventsDelegate = new AccessibilityEventsDelegate();
        this.overlayLayerViews = new Map<number, PlatformOverlayView>();
        this.currentFrameUsedOverlayLayerIds = new HashSet();
        this.currentFrameUsedPlatformViewIds = new HashSet();
        this.viewWrappers = new Map();
        this.platformViews = new Map();
        this.viewIdWithTextureId = new Map();
        this.viewIdWithNodeController = new Map();
        this.platformViewParent = new Map();
        this.nodeControllers = new Stack<EmbeddingNodeController>();
    }
    getPlatformViewById(v72: number): Object {
        throw new Error('Method not implemented.');
    }
    usesVirtualDisplay(u72: number): boolean {
        throw new Error('Method not implemented.');
    }
    attachAccessibilityBridge(t72: AccessibilityBridge): void {
        this.accessibilityEventsDelegate.setAccessibilityBridge(t72);
    }
    detachAccessibilityBridge(): void {
        this.accessibilityEventsDelegate.setAccessibilityBridge(null);
    }
    createForPlatformViewLayer(r72: PlatformViewCreationRequest): void {
        Log.i(TAG, "Enter createForPlatformViewLayer");
        this.ensureValidRequest(r72);
        let s72: PlatformView = this.createPlatformView(r72);
        this.configureForHybridComposition(s72, r72);
    }
    dispose(l72: number): void {
        let m72: PlatformView | null = this.platformViews.get(l72) || null;
        if (m72 == null) {
            Log.e(TAG, "Disposing unknown platform view with id: " + l72);
            return;
        }
        this.platformViews.delete(l72);
        let n72 = this.viewIdWithTextureId.get(l72);
        if (n72 != undefined) {
            this.textureRegistry!.unregisterTexture(n72);
        }
        let o72: PlatformViewWrapper | null = this.viewWrappers.get(l72) || null;
        if (o72 != null) {
            this.viewIdWithNodeController.get(l72)?.removeBuilderNode();
            this.viewIdWithNodeController.get(l72)?.disposeFrameNode();
            this.viewIdWithNodeController.delete(l72);
            if (this.flutterView) {
                let q72 = this.flutterView.getDVModel().children.indexOf(o72.getDvModel()!);
                this.flutterView.getDVModel().children.splice(q72, 1);
            }
            this.viewWrappers.delete(l72);
        }
        try {
            m72.dispose();
        }
        catch (p72) {
            Log.e(TAG, "Disposing platform view threw an exception", p72);
        }
    }
    setParams: (params: DVModelParameters, key: string, element: Any) => void = (h72: DVModelParameters, i72: string, j72: Any): void => {
        let k72 = h72 as Record<string, Any>;
        k72[i72] = j72;
    };
    getParams: (params: DVModelParameters, key: string) => number = (e72: DVModelParameters, f72: string): number => {
        let g72 = e72 as Record<string, Any>;
        return g72[f72];
    };
    resize(x71: PlatformViewResizeRequest, y71: PlatformViewBufferResized): void {
        let z71: number = this.toPhysicalPixels(x71.newLogicalWidth);
        let a72: number = this.toPhysicalPixels(x71.newLogicalHeight);
        let b72: number = x71.viewId;
        Log.i(TAG, `Resize viewId ${b72}, pw:${z71}, ph:${a72},lw:${x71.newLogicalWidth}, lh:${x71.newLogicalHeight}`);
        let c72 = this.viewWrappers.get(x71.viewId);
        let d72: DVModelParameters | undefined = c72?.getDvModel()!.params;
        this.setParams(d72!, "width", z71);
        this.setParams(d72!, "height", a72);
        y71.run(new PlatformViewBufferSize(z71, a72));
    }
    offset(s71: number, t71: number, u71: number): void {
        Log.i(TAG, `Offset is id${s71}, t:${t71}, l:${u71}`);
        let v71 = this.viewWrappers.get(s71);
        if (v71 != undefined) {
            let w71: DVModelParameters | undefined = v71?.getDvModel()!.params;
            this.setParams(w71!, "left", u71);
            this.setParams(w71!, "top", t71);
        }
    }
    onTouch(l71: PlatformViewTouch): void {
        let m71: undefined | PlatformViewWrapper = this.viewWrappers.get(l71.viewId);
        if (m71 != undefined) {
            let n71 = m71.getDvModel();
            let o71 = n71.getLayoutParams() as Record<string, Any>;
            if (l71.action == 0) {
                o71['down'] = true;
                let p71: Array<CustomTouchEvent> | undefined = o71['touchEvent'] as Array<CustomTouchEvent>;
                if (p71 != undefined) {
                    let q71 = o71['nodeController'] as EmbeddingNodeController;
                    for (let r71 of p71) {
                        q71.postEvent(r71);
                    }
                    o71['touchEvent'] = undefined;
                }
            }
            else if (l71.action == 1) {
                o71['down'] = false;
            }
        }
    }
    setDirection(i71: number, j71: Direction): void {
        let k71 = this.viewIdWithNodeController.get(i71);
        if (k71 != undefined) {
            k71?.setRenderOption(this.flutterView!.getPlatformView()!, this.flutterView!.getSurfaceId(), NodeRenderType.RENDER_TYPE_TEXTURE, j71);
            k71?.rebuild();
        }
    }
    validateDirection(h71: number): boolean {
        return h71 == Direction.Ltr || h71 == Direction.Rtl || h71 == Direction.Auto;
    }
    clearFocus(e71: number): void {
        const f71 = this.platformViews.get(e71);
        if (f71 == null) {
            Log.e(TAG, "Setting direction to an unknown view with id: " + e71);
            return;
        }
        const g71 = f71.getView();
        if (g71 == null) {
            Log.e(TAG, "Setting direction to a null view with id: " + e71);
            return;
        }
        focusControl.requestFocus('emptyFocusText' + this.flutterView?.getId());
    }
    synchronizeToNativeViewHierarchy(d71: boolean): void {
        throw new Error('Method not implemented.');
    }
    public createForTextureLayer(a71: PlatformViewCreationRequest): number {
        Log.i(TAG, "Enter createForTextureLayer");
        this.ensureValidRequest(a71);
        let b71: PlatformView = this.createPlatformView(a71);
        let c71 = this.configureForTextureLayerComposition(b71, a71);
        this.viewIdWithTextureId.set(a71.viewId, c71);
        return c71;
    }
    private ensureValidRequest(z70: PlatformViewCreationRequest): void {
        if (!this.validateDirection(z70.direction)) {
            throw new Error("Trying to create a view with unknown direction value: "
                + z70.direction
                + "(view id: "
                + z70.viewId
                + ")");
        }
    }
    private createPlatformView(t70: PlatformViewCreationRequest): PlatformView {
        Log.i(TAG, "begin createPlatformView");
        const u70: PlatformViewFactory = this.registry.getFactory(t70.viewType);
        if (u70 == null) {
            throw new Error("Trying to create a platform view of unregistered type: " + t70.viewType);
        }
        let v70: Any = null;
        if (t70.params != null) {
            let y70: ByteBuffer = t70.params as ByteBuffer;
            v70 = u70.getCreateArgsCodec().decodeMessage(y70.buffer);
        }
        if (this.context == null) {
            throw new Error('PlatformView#context is null.');
        }
        let w70 = u70.create(this.context, t70.viewId, v70);
        let x70: WrappedBuilder<[
            Params
        ]> = w70.getView();
        if (x70 == null) {
            throw new Error("PlatformView#getView() returned null, but an WrappedBuilder reference was expected.");
        }
        this.platformViews.set(t70.viewId, w70);
        return w70;
    }
    private configureForHybridComposition(r70: PlatformView, s70: PlatformViewCreationRequest): void {
        Log.i(TAG, "Using hybrid composition for platform view: " + s70.viewId);
    }
    private configureForTextureLayerComposition(h70: PlatformView, i70: PlatformViewCreationRequest): number {
        Log.i(TAG, "Hosting view in view hierarchy for platform view: " + i70.viewId);
        let j70: string = '0';
        let k70: number = 0;
        if (this.textureRegistry != null) {
            k70 = this.textureRegistry!.getTextureId();
            j70 = this.textureRegistry!.registerTexture(k70).getSurfaceId().toString();
            Log.i(TAG, "nodeController getSurfaceId: " + j70);
            this.flutterView!.setSurfaceId(j70);
        }
        let l70: WrappedBuilder<[
            Params
        ]> = h70.getView();
        this.flutterView?.setWrappedBuilder(l70);
        this.flutterView?.setPlatformView(h70);
        let m70: number = this.toPhysicalPixels(i70.logicalWidth);
        let n70: number = this.toPhysicalPixels(i70.logicalHeight);
        let o70 = new EmbeddingNodeController();
        o70.setRenderOption(h70, j70, NodeRenderType.RENDER_TYPE_TEXTURE, i70.direction);
        this.viewIdWithNodeController.set(i70.viewId, o70);
        this.nodeControllers.push(o70);
        let p70 = createDVModelFromJson(new DVModelJson("NodeContainer", [], {
            "width": m70,
            "height": n70,
            "nodeController": o70,
            "left": i70.logicalLeft,
            "top": i70.logicalTop
        }, {}, undefined));
        let q70: PlatformViewWrapper = new PlatformViewWrapper();
        q70.addDvModel(p70);
        this.viewWrappers.set(i70.viewId, q70);
        this.flutterView?.getDVModel().children.push(q70.getDvModel());
        Log.i(TAG, "Create platform view success");
        return k70;
    }
    public attach(e70: Context, f70: TextureRegistry | null, g70: DartExecutor): void {
        if (this.context != null) {
        }
        this.context = e70;
        this.textureRegistry = f70;
        this.platformViewsChannel = new PlatformViewsChannel(g70);
        this.platformViewsChannel.setPlatformViewsHandler(this);
    }
    public detach(): void {
        if (this.platformViewsChannel != null) {
            this.platformViewsChannel.setPlatformViewsHandler(null);
        }
        this.destroyOverlaySurfaces();
        this.platformViewsChannel = null;
        this.context = null;
        this.textureRegistry = null;
    }
    public attachToView(a70: FlutterView) {
        this.flutterView = a70;
        for (let d70 of this.viewWrappers.values()) {
            this.flutterView?.getDVModel().children.push(d70.getDvModel()!);
        }
        for (let c70 of this.platformViewParent.values()) {
            this.flutterView?.getDVModel().children.push(c70.getDvModel()!);
        }
        for (let b70 of this.platformViews.values()) {
            b70.onFlutterViewAttached(this.flutterView?.getDVModel());
        }
    }
    public detachFromView(): void {
        for (let z69 = 0; z69 < this.viewWrappers.size; z69++) {
            this.flutterView?.getDVModel().children.pop();
        }
        for (let y69 = 0; y69 < this.platformViewParent.size; y69++) {
            this.flutterView?.getDVModel().children.pop();
        }
        this.destroyOverlaySurfaces();
        this.removeOverlaySurfaces();
        this.flutterView = null;
        for (let x69 of this.platformViews.values()) {
            x69.onFlutterViewDetached();
        }
    }
    public getFlutterView(): FlutterView | null {
        return this.flutterView;
    }
    public attachTextInputPlugin(w69: TextInputPlugin): void {
        this.textInputPlugin = w69;
    }
    public detachTextInputPlugin(): void {
        this.textInputPlugin = null;
    }
    public getRegistry(): PlatformViewRegistry {
        return this.registry;
    }
    public setBackNodeControllers(): void { }
    public onDetachedFromNapi(): void {
        this.diposeAllViews();
    }
    public onPreEngineRestart(): void {
        this.diposeAllViews();
    }
    private getDisplayDensity(): number {
        return display.getDefaultDisplaySync().densityPixels;
    }
    private toPhysicalPixels(v69: number): number {
        return Math.round(px2vp(v69 * this.getDisplayDensity()));
    }
    private toLogicalPixelsByDensity(t69: number, u69: number): number {
        return Math.round(t69 / u69);
    }
    private toLogicalPixels(s69: number): number {
        return this.toLogicalPixelsByDensity(s69, this.getDisplayDensity());
    }
    private diposeAllViews(): void {
        let q69 = this.platformViews.keys();
        for (let r69 of q69) {
            this.dispose(r69);
        }
    }
    private initializeRootImageViewIfNeeded(): void {
    }
    public onDisplayOverlaySurface(l69: number, m69: number, n69: number, o69: number, p69: number): void {
    }
    public onBeginFrame(): void {
        this.currentFrameUsedOverlayLayerIds.clear();
        this.currentFrameUsedPlatformViewIds.clear();
    }
    public onEndFrame(): void {
    }
    private finishFrame(k69: boolean): void {
    }
    public createOverlaySurfaceByPlatformOverlayView(i69: PlatformOverlayView) {
        let j69 = this.nextOverlayLayerId++;
        this.overlayLayerViews.set(j69, i69);
        return new FlutterOverlaySurface(this.nextOverlayLayerId++);
    }
    public createOverlaySurface(): FlutterOverlaySurface {
        return new FlutterOverlaySurface(this.nextOverlayLayerId++);
    }
    private destroyOverlaySurfaces(): void {
    }
    private removeOverlaySurfaces(): void {
        if (!(this.flutterView instanceof FlutterView)) {
            return;
        }
    }
    public render(w68: number, x68: PlatformView, y68: number, z68: number, a69: number, b69: number) {
        let c69 = this.viewWrappers.get(w68);
        if (c69 != null) {
            let h69: DVModelParameters | undefined = c69?.getDvModel()!.params;
            this.setParams(h69!, "width", y68);
            this.setParams(h69!, "height", z68);
            this.setParams(h69!, "left", a69);
            this.setParams(h69!, "top", b69);
            return;
        }
        this.flutterView!.setSurfaceId(w68.toString());
        let d69: WrappedBuilder<[
            Params
        ]> = x68.getView();
        this.flutterView?.setWrappedBuilder(d69);
        this.flutterView?.setPlatformView(x68);
        let e69 = new EmbeddingNodeController();
        e69.setRenderOption(x68, w68.toString(), NodeRenderType.RENDER_TYPE_TEXTURE, Direction.Auto);
        this.viewIdWithNodeController.set(w68, e69);
        let f69 = createDVModelFromJson(new DVModelJson("NodeContainer", [], {
            "width": y68,
            "height": z68,
            "nodeController": e69,
            "left": a69,
            "top": b69
        }, {}, undefined));
        let g69: PlatformViewWrapper = new PlatformViewWrapper();
        g69.addDvModel(f69);
        this.viewWrappers.set(w68, g69);
        this.flutterView?.getDVModel().children.push(g69.getDvModel());
        this.platformViews.set(w68, x68!);
    }
}
