import ToolUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/ToolUtils";
import FlutterException from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/FlutterException";
import type Any from './Any';
import JSONMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMessageCodec";
import MethodCall from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodCall";
import type MethodCodec from './MethodCodec';
export default class JSONMethodCodec implements MethodCodec {
    static INSTANCE = new JSONMethodCodec();
    encodeMethodCall(u50: MethodCall): ArrayBuffer {
        try {
            const w50: Record<string, Any> = {
                "method": u50.method, "args": u50.args
            };
            return JSONMessageCodec.INSTANCE.encodeMessage(w50);
        }
        catch (v50) {
            throw new Error("Invalid JSON");
        }
    }
    decodeMethodCall(p50: ArrayBuffer): MethodCall {
        try {
            const r50: Any = JSONMessageCodec.INSTANCE.decodeMessage(p50);
            if (ToolUtils.isObj(r50)) {
                const s50: string = r50["method"];
                const t50: Any = r50["args"];
                if (typeof s50 == 'string') {
                    return new MethodCall(s50, t50);
                }
            }
            throw new Error("Invalid method call: " + r50);
        }
        catch (q50) {
            throw new Error("Invalid JSON:" + JSON.stringify(q50));
        }
    }
    encodeSuccessEnvelope(o50: Any): ArrayBuffer {
        return JSONMessageCodec.INSTANCE.encodeMessage([o50]);
    }
    encodeErrorEnvelope(l50: Any, m50: string, n50: Any) {
        return JSONMessageCodec.INSTANCE.encodeMessage([l50, m50, n50]);
    }
    encodeErrorEnvelopeWithStacktrace(h50: string, i50: string, j50: Any, k50: string): ArrayBuffer {
        return JSONMessageCodec.INSTANCE.encodeMessage([h50, i50, j50, k50]);
    }
    decodeEnvelope(b50: ArrayBuffer): Any {
        try {
            const d50: Any = JSONMessageCodec.INSTANCE.decodeMessage(b50);
            if (d50 instanceof Array) {
                if (d50.length == 1) {
                    return d50[0];
                }
                if (d50.length == 3) {
                    const e50: string = d50[0];
                    const f50: string = d50[1];
                    const g50: Any = d50[2];
                    if (typeof e50 == 'string' && (f50 == null || typeof f50 == 'string')) {
                        throw new FlutterException(e50, f50, g50);
                    }
                }
            }
            throw new Error("Invalid envelope: " + d50);
        }
        catch (c50) {
            throw new Error("Invalid JSON");
        }
    }
}
