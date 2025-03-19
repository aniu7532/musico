import { ByteBuffer } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/ByteBuffer";
import FlutterException from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/FlutterException";
import type Any from './Any';
import MethodCall from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodCall";
import type MethodCodec from './MethodCodec';
import StandardMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StandardMessageCodec";
export default class StandardMethodCodec implements MethodCodec {
    private static TAG = "StandardMethodCodec";
    public static INSTANCE = new StandardMethodCodec(StandardMessageCodec.INSTANCE);
    private messageCodec: StandardMessageCodec;
    constructor(l60: StandardMessageCodec) {
        this.messageCodec = l60;
    }
    encodeMethodCall(j60: MethodCall): ArrayBuffer {
        const k60 = ByteBuffer.from(new ArrayBuffer(1024));
        this.messageCodec.writeValue(k60, j60.method);
        this.messageCodec.writeValue(k60, j60.args);
        return k60.buffer;
    }
    decodeMethodCall(f60: ArrayBuffer): MethodCall {
        const g60 = ByteBuffer.from(f60);
        const h60: Any = this.messageCodec.readValue(g60);
        const i60: Any = this.messageCodec.readValue(g60);
        if (typeof h60 == 'string' && !g60.hasRemaining()) {
            return new MethodCall(h60, i60);
        }
        throw new Error("Method call corrupted");
    }
    encodeSuccessEnvelope(d60: Any): ArrayBuffer {
        const e60 = ByteBuffer.from(new ArrayBuffer(1024));
        e60.writeInt8(0);
        this.messageCodec.writeValue(e60, d60);
        return e60.buffer;
    }
    encodeErrorEnvelope(z59: string, a60: string, b60: Any): ArrayBuffer {
        const c60 = ByteBuffer.from(new ArrayBuffer(1024));
        c60.writeInt8(1);
        this.messageCodec.writeValue(c60, z59);
        this.messageCodec.writeValue(c60, a60);
        if (b60 instanceof Error) {
            this.messageCodec.writeValue(c60, b60.stack);
        }
        else {
            this.messageCodec.writeValue(c60, b60);
        }
        return c60.buffer;
    }
    encodeErrorEnvelopeWithStacktrace(u59: string, v59: string, w59: Any, x59: string): ArrayBuffer {
        const y59 = ByteBuffer.from(new ArrayBuffer(1024));
        y59.writeInt8(1);
        this.messageCodec.writeValue(y59, u59);
        this.messageCodec.writeValue(y59, v59);
        if (w59 instanceof Error) {
            this.messageCodec.writeValue(y59, w59.stack);
        }
        else {
            this.messageCodec.writeValue(y59, w59);
        }
        this.messageCodec.writeValue(y59, x59);
        return y59.buffer;
    }
    decodeEnvelope(n59: ArrayBuffer): Any {
        const o59 = ByteBuffer.from(n59);
        const p59 = o59.readInt8();
        switch (p59) {
            case 0: {
                const t59: Any = this.messageCodec.readValue(o59);
                if (!o59.hasRemaining()) {
                    return t59;
                }
            }
            case 1: {
                const q59: Any = this.messageCodec.readValue(o59);
                const r59: Any = this.messageCodec.readValue(o59);
                const s59: Any = this.messageCodec.readValue(o59);
                if (typeof q59 == 'string' && (r59 == null || typeof r59 == 'string') && !o59.hasRemaining()) {
                    throw new FlutterException(q59, r59, s59);
                }
            }
        }
        throw new Error("Envelope corrupted");
    }
}
