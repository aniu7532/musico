import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import MessageChannelUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/MessageChannelUtils";
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
import type { BinaryMessageHandler, BinaryMessenger, BinaryReply } from './BinaryMessenger';
import type Any from './Any';
import MethodCall from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodCall";
import type MethodCodec from './MethodCodec';
import StandardMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StandardMethodCodec";
export default class MethodChannel {
    static TAG = "MethodChannel#";
    private messenger: BinaryMessenger;
    private name: string;
    private codec: MethodCodec;
    constructor(v51: BinaryMessenger, w51: string, x51: MethodCodec = StandardMethodCodec.INSTANCE) {
        this.messenger = v51;
        this.name = w51;
        this.codec = x51;
    }
    invokeMethod(s51: string, t51: Any, u51?: MethodResult): void {
        this.messenger.send(this.name, this.codec.encodeMethodCall(new MethodCall(s51, t51)), u51 == null ? null : new IncomingResultHandler(u51, this.codec));
    }
    setMethodCallHandler(r51: MethodCallHandler | null): void {
        this.messenger.setMessageHandler(this.name, r51 == null ? null : new IncomingMethodCallHandler(r51, this.codec));
    }
    resizeChannelBuffer(q51: number): void {
        MessageChannelUtils.resizeChannelBuffer(this.messenger, this.name, q51);
    }
}
export interface MethodCallHandler {
    onMethodCall(call: MethodCall, result: MethodResult): void;
}
export interface MethodResult {
    success: (result: Any) => void;
    error: (errorCode: string, errorMessage: string, errorDetails: Any) => void;
    notImplemented: () => void;
}
export class IncomingResultHandler implements BinaryReply {
    private callback: MethodResult;
    private codec: MethodCodec;
    constructor(o51: MethodResult, p51: MethodCodec) {
        this.callback = o51;
        this.codec = p51;
    }
    reply(l51: ArrayBuffer | null): void {
        try {
            if (l51 == null) {
                this.callback.notImplemented();
            }
            else {
                try {
                    this.callback.success(this.codec.decodeEnvelope(l51));
                }
                catch (n51) {
                    this.callback.error(n51.code, n51.getMessage(), n51.details);
                }
            }
        }
        catch (m51) {
            Log.e(MethodChannel.TAG, "Failed to handle method call result", m51);
        }
    }
}
export class IncomingMethodCallHandler implements BinaryMessageHandler {
    private handler: MethodCallHandler;
    private codec: MethodCodec;
    constructor(j51: MethodCallHandler, k51: MethodCodec) {
        this.handler = j51;
        this.codec = k51;
    }
    onMessage(b51: ArrayBuffer, c51: BinaryReply): void {
        const d51 = this.codec.decodeMethodCall(b51);
        try {
            this.handler.onMethodCall(d51, {
                success: (i51: Any): void => {
                    c51.reply(this.codec.encodeSuccessEnvelope(i51));
                },
                error: (f51: string, g51: string, h51: Any): void => {
                    c51.reply(this.codec.encodeErrorEnvelope(f51, g51, h51));
                },
                notImplemented: (): void => {
                    Log.w(MethodChannel.TAG, "method not implemented");
                    c51.reply(StringUtils.stringToArrayBuffer(""));
                }
            });
        }
        catch (e51) {
            Log.e(MethodChannel.TAG, "Failed to handle method call", e51);
            c51.reply(this.codec.encodeErrorEnvelopeWithStacktrace("error", e51.getMessage(), null, e51));
        }
    }
}
