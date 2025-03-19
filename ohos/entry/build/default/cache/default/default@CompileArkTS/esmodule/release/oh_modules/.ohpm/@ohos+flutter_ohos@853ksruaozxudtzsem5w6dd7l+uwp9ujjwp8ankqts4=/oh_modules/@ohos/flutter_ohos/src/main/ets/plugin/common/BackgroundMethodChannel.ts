import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import MessageChannelUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/MessageChannelUtils";
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
import type { BinaryMessenger, BinaryReply, TaskQueue } from './BinaryMessenger';
import type Any from './Any';
import MethodCall from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodCall";
import type MethodCodec from './MethodCodec';
import type { MethodResult } from './MethodChannel';
import SendableStandardMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/SendableStandardMethodCodec";
import type SendableMethodCallHandler from './SendableMethodCallHandler';
import type SendableMethodCodec from './SendableMethodCodec';
import type SendableBinaryMessageHandler from './SendableBinaryMessageHandler';
export default class BackgroundMethodChannel {
    static TAG = "BackgroundMethodChannel#";
    private messenger: BinaryMessenger;
    private name: string;
    private codec: SendableMethodCodec;
    private taskQueue: TaskQueue;
    private args: Object[];
    constructor(x46: BinaryMessenger, y46: string, z46: SendableMethodCodec = SendableStandardMethodCodec.INSTANCE, a47?: TaskQueue, ...b47: Object[]) {
        this.messenger = x46;
        this.name = y46;
        this.codec = z46;
        this.taskQueue = a47 ?? x46.makeBackgroundTaskQueue();
        this.args = b47;
    }
    invokeMethod(u46: string, v46: Any, w46?: MethodResult): void {
        this.messenger.send(this.name, this.codec.encodeMethodCall(new MethodCall(u46, v46)), w46 == null ? null : new IncomingSendableResultHandler(w46, this.codec));
    }
    setMethodCallHandler(t46: SendableMethodCallHandler | null): void {
        this.messenger.setMessageHandler(this.name, t46 == null ? null : new IncomingSendableMethodCallHandler(t46, this.codec), this.taskQueue, ...this.args);
    }
    resizeChannelBuffer(s46: number): void {
        MessageChannelUtils.resizeChannelBuffer(this.messenger, this.name, s46);
    }
}
export class IncomingSendableResultHandler implements BinaryReply {
    private callback: MethodResult;
    private codec: SendableMethodCodec;
    constructor(q46: MethodResult, r46: SendableMethodCodec) {
        this.callback = q46;
        this.codec = r46;
    }
    reply(n46: ArrayBuffer | null): void {
        try {
            if (n46 == null) {
                this.callback.notImplemented();
            }
            else {
                try {
                    this.callback.success(this.codec.decodeEnvelope(n46));
                }
                catch (p46) {
                    this.callback.error(p46.code, p46.getMessage(), p46.details);
                }
            }
        }
        catch (o46) {
            Log.e(BackgroundMethodChannel.TAG, "Failed to handle method call result", o46);
        }
    }
}
export class IncomingSendableMethodCallHandler implements SendableBinaryMessageHandler {
    private handler: SendableMethodCallHandler;
    private codec: SendableMethodCodec;
    constructor(l46: SendableMethodCallHandler, m46: SendableMethodCodec) {
        "use sendable";
        this.handler = l46;
        this.codec = m46;
    }
    onMessage(d46: ArrayBuffer, e46: BinaryReply, ...f46: Object[]): void {
        try {
            this.handler.onMethodCall(this.codec.decodeMethodCall(d46), {
                success: (k46: Any): void => {
                    e46.reply(this.codec.encodeSuccessEnvelope(k46));
                },
                error: (h46: string, i46: string, j46: Any): void => {
                    e46.reply(this.codec.encodeErrorEnvelope(h46, i46, j46));
                },
                notImplemented: (): void => {
                    e46.reply(StringUtils.stringToArrayBuffer(""));
                }
            }, ...f46);
        }
        catch (g46) {
            e46.reply(this.codec.encodeErrorEnvelopeWithStacktrace("error", g46.getMessage(), null, g46));
        }
    }
}
