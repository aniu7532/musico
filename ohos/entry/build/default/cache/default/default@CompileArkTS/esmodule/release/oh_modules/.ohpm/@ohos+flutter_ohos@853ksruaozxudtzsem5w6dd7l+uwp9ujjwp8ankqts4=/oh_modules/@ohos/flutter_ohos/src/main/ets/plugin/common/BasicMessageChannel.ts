import MessageChannelUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/MessageChannelUtils";
import type { BinaryMessageHandler } from './BinaryMessenger';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type { BinaryReply } from './BinaryMessenger';
import type MessageCodec from './MessageCodec';
import type { BinaryMessenger } from './BinaryMessenger';
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
export default class BasicMessageChannel<T> {
    public static TAG = "BasicMessageChannel#";
    public static CHANNEL_BUFFERS_CHANNEL = "dev.flutter/channel-buffers";
    private messenger: BinaryMessenger;
    private name: string;
    private codec: MessageCodec<T>;
    constructor(q47: BinaryMessenger, r47: string, s47: MessageCodec<T>) {
        this.messenger = q47;
        this.name = r47;
        this.codec = s47;
    }
    send(o47: T, p47?: (reply: T) => void): void {
        this.messenger.send(this.name, this.codec.encodeMessage(o47), p47 == null ? null : new IncomingReplyHandler(p47, this.codec));
    }
    setMessageHandler(n47: MessageHandler<T> | null): void {
        this.messenger.setMessageHandler(this.name, n47 == null ? null : new IncomingMessageHandler(n47, this.codec));
    }
    resizeChannelBuffer(m47: number): void {
        MessageChannelUtils.resizeChannelBuffer(this.messenger, this.name, m47);
    }
}
export interface Reply<T> {
    reply: (reply: T) => void;
}
export interface MessageHandler<T> {
    onMessage(message: T, reply: Reply<T>): void;
}
class IncomingReplyHandler<T> implements BinaryReply {
    private callback: (reply: T) => void;
    private codec: MessageCodec<T>;
    constructor(k47: (reply: T) => void, l47: MessageCodec<T>) {
        this.callback = k47;
        this.codec = l47;
    }
    reply(i47: ArrayBuffer | null) {
        try {
            this.callback(this.codec.decodeMessage(i47));
        }
        catch (j47) {
            Log.e(BasicMessageChannel.TAG, "Failed to handle message reply", j47);
        }
    }
}
class IncomingMessageHandler<T> implements BinaryMessageHandler {
    private handler: MessageHandler<T>;
    private codec: MessageCodec<T>;
    constructor(g47: MessageHandler<T>, h47: MessageCodec<T>) {
        this.handler = g47;
        this.codec = h47;
    }
    onMessage(c47: ArrayBuffer, d47: BinaryReply) {
        try {
            this.handler.onMessage(this.codec.decodeMessage(c47), {
                reply: (f47: T): void => {
                    d47.reply(this.codec.encodeMessage(f47));
                }
            });
        }
        catch (e47) {
            Log.e(BasicMessageChannel.TAG, "Failed to handle message", e47);
            d47.reply(StringUtils.stringToArrayBuffer(""));
        }
    }
}
