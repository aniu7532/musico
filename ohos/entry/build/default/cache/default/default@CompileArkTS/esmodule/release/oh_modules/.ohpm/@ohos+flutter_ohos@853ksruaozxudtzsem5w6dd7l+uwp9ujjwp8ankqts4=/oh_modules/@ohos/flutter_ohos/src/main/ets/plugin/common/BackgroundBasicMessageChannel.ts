import MessageChannelUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/MessageChannelUtils";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type { BinaryReply } from './BinaryMessenger';
import type { TaskQueue } from './BinaryMessenger';
import type MessageCodec from './MessageCodec';
import type { BinaryMessenger } from './BinaryMessenger';
import type SendableBinaryMessageHandler from './SendableBinaryMessageHandler';
import type SendableMessageCodec from './SendableMessageCodec';
import type SendableMessageHandler from './SendableMessageHandler';
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
export default class BackgroundBasicMessageChannel<T> {
    public static TAG = "BackgroundBasicMessageChannel#";
    public static CHANNEL_BUFFERS_CHANNEL = "dev.flutter/channel-buffers";
    private messenger: BinaryMessenger;
    private name: string;
    private codec: SendableMessageCodec<T>;
    private taskQueue: TaskQueue;
    constructor(z45: BinaryMessenger, a46: string, b46: SendableMessageCodec<T>, c46?: TaskQueue) {
        this.messenger = z45;
        this.name = a46;
        this.codec = b46;
        this.taskQueue = c46 ?? z45.makeBackgroundTaskQueue();
    }
    send(x45: T, y45?: (reply: T) => void): void {
        this.messenger.send(this.name, this.codec.encodeMessage(x45), y45 == null ? null : new IncomingReplyHandler(y45, this.codec));
    }
    setMessageHandler(w45: SendableMessageHandler<T> | null): void {
        this.messenger.setMessageHandler(this.name, w45 == null ? null : new IncomingSendableMessageHandler(w45, this.codec), this.taskQueue);
    }
    resizeChannelBuffer(v45: number): void {
        MessageChannelUtils.resizeChannelBuffer(this.messenger, this.name, v45);
    }
}
class IncomingReplyHandler<T> implements BinaryReply {
    private callback: (reply: T) => void;
    private codec: SendableMessageCodec<T>;
    constructor(t45: (reply: T) => void, u45: SendableMessageCodec<T>) {
        this.callback = t45;
        this.codec = u45;
    }
    reply(r45: ArrayBuffer | null) {
        try {
            this.callback(this.codec.decodeMessage(r45));
        }
        catch (s45) {
            Log.e(BackgroundBasicMessageChannel.TAG, "Failed to handle message reply", s45);
        }
    }
}
class IncomingSendableMessageHandler<T> implements SendableBinaryMessageHandler {
    private handler: SendableMessageHandler<T>;
    private codec: SendableMessageCodec<T>;
    constructor(p45: SendableMessageHandler<T>, q45: SendableMessageCodec<T>) {
        "use sendable";
        this.handler = p45;
        this.codec = q45;
    }
    onMessage(l45: ArrayBuffer, m45: BinaryReply) {
        try {
            this.handler.onMessage(this.codec.decodeMessage(l45), {
                reply: (o45: T): void => {
                    m45.reply(this.codec.encodeMessage(o45));
                }
            });
        }
        catch (n45) {
            Log.e('WARNNING', "Failed to handle message: ", n45);
            m45.reply(StringUtils.stringToArrayBuffer(""));
        }
    }
}
