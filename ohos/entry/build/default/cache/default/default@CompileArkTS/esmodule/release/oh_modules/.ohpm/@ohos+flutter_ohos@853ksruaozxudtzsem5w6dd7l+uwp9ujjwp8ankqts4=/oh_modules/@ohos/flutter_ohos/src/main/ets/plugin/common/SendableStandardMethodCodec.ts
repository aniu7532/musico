import { ByteBuffer } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/ByteBuffer";
import FlutterException from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/FlutterException";
import type Any from './Any';
import MethodCall from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodCall";
import type SendableMethodCodec from './SendableMethodCodec';
import SendableStandardMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/SendableStandardMessageCodec";
export default class SendableStandardMethodCodec implements SendableMethodCodec {
    private static TAG: string = "SendableStandardMethodCodec";
    public static INSTANCE: SendableStandardMethodCodec = new SendableStandardMethodCodec(SendableStandardMessageCodec.INSTANCE);
    private messageCodec: SendableStandardMessageCodec;
    constructor(y56: SendableStandardMessageCodec) {
        "use sendable";
        this.messageCodec = y56;
    }
    encodeMethodCall(w56: MethodCall): ArrayBuffer {
        const x56 = ByteBuffer.from(new ArrayBuffer(1024));
        this.messageCodec.writeValue(x56, w56.method);
        this.messageCodec.writeValue(x56, w56.args);
        return x56.buffer;
    }
    decodeMethodCall(s56: ArrayBuffer): MethodCall {
        const t56 = ByteBuffer.from(s56);
        const u56: Any = this.messageCodec.readValue(t56);
        const v56: Any = this.messageCodec.readValue(t56);
        if (typeof u56 == 'string' && !t56.hasRemaining()) {
            return new MethodCall(u56, v56);
        }
        throw new Error("Method call corrupted");
    }
    encodeSuccessEnvelope(q56: Any): ArrayBuffer {
        const r56 = ByteBuffer.from(new ArrayBuffer(1024));
        r56.writeInt8(0);
        this.messageCodec.writeValue(r56, q56);
        return r56.buffer;
    }
    encodeErrorEnvelope(m56: string, n56: string, o56: Any): ArrayBuffer {
        const p56 = ByteBuffer.from(new ArrayBuffer(1024));
        p56.writeInt8(1);
        this.messageCodec.writeValue(p56, m56);
        this.messageCodec.writeValue(p56, n56);
        if (o56 instanceof Error) {
            this.messageCodec.writeValue(p56, o56.stack);
        }
        else {
            this.messageCodec.writeValue(p56, o56);
        }
        return p56.buffer;
    }
    encodeErrorEnvelopeWithStacktrace(h56: string, i56: string, j56: Any, k56: string): ArrayBuffer {
        const l56 = ByteBuffer.from(new ArrayBuffer(1024));
        l56.writeInt8(1);
        this.messageCodec.writeValue(l56, h56);
        this.messageCodec.writeValue(l56, i56);
        if (j56 instanceof Error) {
            this.messageCodec.writeValue(l56, j56.stack);
        }
        else {
            this.messageCodec.writeValue(l56, j56);
        }
        this.messageCodec.writeValue(l56, k56);
        return l56.buffer;
    }
    decodeEnvelope(a56: ArrayBuffer): Any {
        const b56 = ByteBuffer.from(a56);
        const c56 = b56.readInt8();
        switch (c56) {
            case 0: {
                const g56: Any = this.messageCodec.readValue(b56);
                if (!b56.hasRemaining()) {
                    return g56;
                }
            }
            case 1: {
                const d56: Any = this.messageCodec.readValue(b56);
                const e56: Any = this.messageCodec.readValue(b56);
                const f56: Any = this.messageCodec.readValue(b56);
                if (typeof d56 == 'string' && (e56 == null || typeof e56 == 'string') && !b56.hasRemaining()) {
                    throw new FlutterException(d56, e56, f56);
                }
            }
        }
        throw new Error("Envelope corrupted");
    }
}
