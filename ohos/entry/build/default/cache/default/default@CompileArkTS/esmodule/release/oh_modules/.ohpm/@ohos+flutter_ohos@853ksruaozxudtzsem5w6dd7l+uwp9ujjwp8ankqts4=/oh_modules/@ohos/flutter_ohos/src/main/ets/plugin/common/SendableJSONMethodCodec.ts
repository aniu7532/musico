import ToolUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/ToolUtils";
import FlutterException from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/FlutterException";
import type Any from './Any';
import SendableJSONMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/SendableJSONMessageCodec";
import MethodCall from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodCall";
import type SendableMethodCodec from './SendableMethodCodec';
export default class SendableJSONMethodCodec implements SendableMethodCodec {
    constructor() {
        "use sendable";
    }
    static INSTANCE: SendableJSONMethodCodec = new SendableJSONMethodCodec();
    encodeMethodCall(l53: MethodCall): ArrayBuffer {
        try {
            const n53: Record<string, Any> = {
                "method": l53.method, "args": l53.args
            };
            return SendableJSONMessageCodec.INSTANCE.encodeMessage(n53);
        }
        catch (m53) {
            throw new Error("Invalid JSON");
        }
    }
    decodeMethodCall(g53: ArrayBuffer): MethodCall {
        try {
            const i53: Any = SendableJSONMessageCodec.INSTANCE.decodeMessage(g53);
            if (ToolUtils.isObj(i53)) {
                const j53: string = i53["method"];
                const k53: Any = i53["args"];
                if (typeof j53 == 'string') {
                    return new MethodCall(j53, k53);
                }
            }
            throw new Error("Invalid method call: " + i53);
        }
        catch (h53) {
            throw new Error("Invalid JSON:" + JSON.stringify(h53));
        }
    }
    encodeSuccessEnvelope(f53: Any): ArrayBuffer {
        return SendableJSONMessageCodec.INSTANCE.encodeMessage([f53]);
    }
    encodeErrorEnvelope(c53: Any, d53: string, e53: Any) {
        return SendableJSONMessageCodec.INSTANCE.encodeMessage([c53, d53, e53]);
    }
    encodeErrorEnvelopeWithStacktrace(y52: string, z52: string, a53: Any, b53: string): ArrayBuffer {
        return SendableJSONMessageCodec.INSTANCE.encodeMessage([y52, z52, a53, b53]);
    }
    decodeEnvelope(s52: ArrayBuffer): Any {
        try {
            const u52: Any = SendableJSONMessageCodec.INSTANCE.decodeMessage(s52);
            if (u52 instanceof Array) {
                if (u52.length == 1) {
                    return u52[0];
                }
                if (u52.length == 3) {
                    const v52: string = u52[0];
                    const w52: string = u52[1];
                    const x52: Any = u52[2];
                    if (typeof v52 == 'string' && (w52 == null || typeof w52 == 'string')) {
                        throw new FlutterException(v52, w52, x52);
                    }
                }
            }
            throw new Error("Invalid envelope: " + u52);
        }
        catch (t52) {
            throw new Error("Invalid JSON");
        }
    }
}
