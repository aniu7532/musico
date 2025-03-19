import ToolUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/ToolUtils";
import FlutterException from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/FlutterException";
import type Any from './Any';
import SendableJSONMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/SendableJSONMessageCodec";
import MethodCall from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodCall";
import type SendableMethodCodec from './SendableMethodCodec';
/**
 * A {@link SendableMethodCodec} using UTF-8 encoded JSON method calls and result envelopes.
 *
 * <p>This codec is guaranteed to be compatible with the corresponding <a
 * href="https://api.flutter.dev/flutter/services/JSONMethodCodec-class.html">JSONMethodCodec</a> on
 * the Dart side. These parts of the Flutter SDK are evolved synchronously.
 *
 * <p>Values supported as methods arguments and result payloads are those supported by {@link
 * SendableJSONMessageCodec}.
 */
export default class SendableJSONMethodCodec implements SendableMethodCodec {
    constructor() {
        "use sendable";
    }
    static INSTANCE: SendableJSONMethodCodec = new SendableJSONMethodCodec();
    encodeMethodCall(methodCall: MethodCall): ArrayBuffer {
        try {
            const map: Record<string, Any> = {
                "method": methodCall.method, "args": methodCall.args
            };
            return SendableJSONMessageCodec.INSTANCE.encodeMessage(map);
        }
        catch (e) {
            throw new Error("Invalid JSON");
        }
    }
    decodeMethodCall(message: ArrayBuffer): MethodCall {
        try {
            const json: Any = SendableJSONMessageCodec.INSTANCE.decodeMessage(message);
            if (ToolUtils.isObj(json)) {
                const method: string = json["method"];
                const args: Any = json["args"];
                if (typeof method == 'string') {
                    return new MethodCall(method, args);
                }
            }
            throw new Error("Invalid method call: " + json);
        }
        catch (e) {
            throw new Error("Invalid JSON:" + JSON.stringify(e));
        }
    }
    encodeSuccessEnvelope(result: Any): ArrayBuffer {
        return SendableJSONMessageCodec.INSTANCE.encodeMessage([result]);
    }
    encodeErrorEnvelope(errorCode: Any, errorMessage: string, errorDetails: Any) {
        return SendableJSONMessageCodec.INSTANCE.encodeMessage([errorCode, errorMessage, errorDetails]);
    }
    encodeErrorEnvelopeWithStacktrace(errorCode: string, errorMessage: string, errorDetails: Any, errorStacktrace: string): ArrayBuffer {
        return SendableJSONMessageCodec.INSTANCE.encodeMessage([errorCode, errorMessage, errorDetails, errorStacktrace]);
    }
    decodeEnvelope(envelope: ArrayBuffer): Any {
        try {
            const json: Any = SendableJSONMessageCodec.INSTANCE.decodeMessage(envelope);
            if (json instanceof Array) {
                if (json.length == 1) {
                    return json[0];
                }
                if (json.length == 3) {
                    const code: string = json[0];
                    const message: string = json[1];
                    const details: Any = json[2];
                    if (typeof code == 'string' && (message == null || typeof message == 'string')) {
                        throw new FlutterException(code, message, details);
                    }
                }
            }
            throw new Error("Invalid envelope: " + json);
        }
        catch (e) {
            throw new Error("Invalid JSON");
        }
    }
}
