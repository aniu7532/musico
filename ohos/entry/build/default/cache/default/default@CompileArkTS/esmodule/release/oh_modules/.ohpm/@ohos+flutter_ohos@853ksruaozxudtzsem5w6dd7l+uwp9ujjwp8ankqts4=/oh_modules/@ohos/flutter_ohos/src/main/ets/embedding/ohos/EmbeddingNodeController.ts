import { BuilderNode, FrameNode, NodeController, NodeRenderType } from "@ohos:arkui.node";
import type PlatformView from '../../plugin/platform/PlatformView';
import type { Params } from '../../plugin/platform/PlatformView';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
declare class nodeControllerParams {
    surfaceId: string;
    type: string;
    renderType: NodeRenderType;
    embedId: string;
    width: number;
    height: number;
}
const TAG = 'EmbeddingNodeController';
export class EmbeddingNodeController extends NodeController {
    private rootNode: FrameNode | null = null;
    private builderNode: BuilderNode<[
        Params
    ]> | undefined | null = null;
    private wrappedBuilder: WrappedBuilder<[
        Params
    ]> | null = null;
    private platformView: PlatformView | undefined = undefined;
    private embedId: string = "";
    private surfaceId: string = "";
    private renderType: NodeRenderType = NodeRenderType.RENDER_TYPE_DISPLAY;
    private direction: Direction = Direction.Auto;
    private isDestroy: boolean = false;
    setRenderOption(j33: PlatformView, k33: string, l33: NodeRenderType, m33: Direction) {
        if (j33 == undefined) {
            Log.e(TAG, "platformView undefined");
        }
        else {
            this.wrappedBuilder = j33.getView();
        }
        this.platformView = j33;
        this.surfaceId = k33;
        this.renderType = l33;
        this.direction = m33;
    }
    makeNode(i33: UIContext): FrameNode | null {
        this.rootNode = new FrameNode(i33);
        this.builderNode = new BuilderNode(i33, { surfaceId: this.surfaceId, type: this.renderType });
        if (this.wrappedBuilder) {
            this.builderNode.build(this.wrappedBuilder, { direction: this.direction, platformView: this.platformView });
        }
        return this.builderNode.getFrameNode();
    }
    setBuilderNode(h33: BuilderNode<Params[]> | null): void {
        this.builderNode = h33;
    }
    getBuilderNode(): BuilderNode<[
        Params
    ]> | undefined | null {
        return this.builderNode;
    }
    updateNode(g33: Object): void {
        this.builderNode?.update(g33);
    }
    getEmbedId(): string {
        return this.embedId;
    }
    setDestroy(f33: boolean): void {
        this.isDestroy = f33;
        if (this.isDestroy) {
            this.rootNode?.dispose();
            this.rootNode = null;
        }
    }
    disposeFrameNode() {
        if (this.rootNode !== null && this.builderNode !== null) {
            this.rootNode.removeChild(this.builderNode?.getFrameNode());
            this.builderNode?.dispose();
            this.rootNode.dispose();
        }
    }
    removeBuilderNode() {
        const e33 = this.rootNode!.getRenderNode();
        if (e33 !== null && this.builderNode !== null && this.builderNode?.getFrameNode() !== null) {
            e33.removeChild(this.builderNode!.getFrameNode()!.getRenderNode());
        }
    }
    postEvent(y32: TouchEvent | undefined, z32: boolean = false): boolean {
        if (y32 == undefined) {
            return false;
        }
        if (!z32) {
            let a33 = y32.changedTouches.length;
            for (let d33 = 0; d33 < a33; d33++) {
                y32.changedTouches[d33].displayX = vp2px(y32.changedTouches[d33].displayX);
                y32.changedTouches[d33].displayY = vp2px(y32.changedTouches[d33].displayY);
                y32.changedTouches[d33].windowX = vp2px(y32.changedTouches[d33].windowX);
                y32.changedTouches[d33].windowY = vp2px(y32.changedTouches[d33].windowY);
                y32.changedTouches[d33].screenX = vp2px(y32.changedTouches[d33].screenX);
                y32.changedTouches[d33].screenY = vp2px(y32.changedTouches[d33].screenY);
                y32.changedTouches[d33].x = vp2px(y32.changedTouches[d33].x);
                y32.changedTouches[d33].y = vp2px(y32.changedTouches[d33].y);
                Log.d(TAG, "changedTouches[" + d33 + "] displayX:" + y32.changedTouches[d33].displayX + " displayY:" +
                    y32.changedTouches[d33].displayY + " x:" + y32.changedTouches[d33].x + " y:" + y32.changedTouches[d33].y);
            }
            let b33 = y32.touches.length;
            for (let c33 = 0; c33 < b33; c33++) {
                y32.touches[c33].displayX = vp2px(y32.touches[c33].displayX);
                y32.touches[c33].displayY = vp2px(y32.touches[c33].displayY);
                y32.touches[c33].windowX = vp2px(y32.touches[c33].windowX);
                y32.touches[c33].windowY = vp2px(y32.touches[c33].windowY);
                y32.touches[c33].screenX = vp2px(y32.touches[c33].screenX);
                y32.touches[c33].screenY = vp2px(y32.touches[c33].screenY);
                y32.touches[c33].x = vp2px(y32.touches[c33].x);
                y32.touches[c33].y = vp2px(y32.touches[c33].y);
                Log.d(TAG, "touches[" + c33 + "] displayX:" + y32.touches[c33].displayX + " displayY:" +
                    y32.touches[c33].displayY + " x:" + y32.touches[c33].x + " y:" + y32.touches[c33].y);
            }
        }
        return this.builderNode?.postTouchEvent(y32) as boolean;
    }
}
