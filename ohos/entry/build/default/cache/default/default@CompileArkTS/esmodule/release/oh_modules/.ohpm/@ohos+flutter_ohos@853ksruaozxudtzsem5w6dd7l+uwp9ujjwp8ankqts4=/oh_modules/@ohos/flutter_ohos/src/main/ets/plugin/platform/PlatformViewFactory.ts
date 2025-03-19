import type MessageCodec from '../common/MessageCodec';
import type PlatformView from './PlatformView';
import type common from "@ohos:app.ability.common";
import type Any from '../common/Any';
export default abstract class PlatformViewFactory {
    private createArgsCodec: MessageCodec<Any>;
    constructor(s68: MessageCodec<Any>) {
        this.createArgsCodec = s68;
    }
    public abstract create(p68: common.Context, q68: number, r68: Any): PlatformView;
    getCreateArgsCodec(): MessageCodec<Any> {
        return this.createArgsCodec;
    }
}
