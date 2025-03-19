import type MessageCodec from '../common/MessageCodec';
import type PlatformView from './PlatformView';
import type common from "@ohos:app.ability.common";
import type Any from '../common/Any';
export default abstract class PlatformViewFactory {
    private createArgsCodec: MessageCodec<Any>;
    /** @param createArgsCodec the codec used to decode the args parameter of {@link #create}. */
    constructor(createArgsCodec: MessageCodec<Any>) {
        this.createArgsCodec = createArgsCodec;
    }
    /**
     * Creates a new Dynamic be embedded in the Flutter hierarchy.
     *
     * @param context the context to be used when creating the view, this is different than
     *     FlutterView's context.
     * @param viewId unique identifier for the created instance, this value is known on the Dart side.
     * @param args arguments sent from the Flutter app. The bytes for this value are decoded using the
     *     createArgsCodec argument passed to the constructor. This is null if createArgsCodec was
     *     null, or no arguments were sent from the Flutter app.
     */
    public abstract create(context: common.Context, viewId: number, args: Any): PlatformView;
    /** Returns the codec to be used for decoding the args parameter of {@link #create}. */
    getCreateArgsCodec(): MessageCodec<Any> {
        return this.createArgsCodec;
    }
}
