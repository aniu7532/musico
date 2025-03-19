import type SendableMessageCodec from './SendableMessageCodec';
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
/**
 * A {@link MessageCodec} using UTF-8 encoded String messages.
 *
 * <p>This codec is guaranteed to be compatible with the corresponding <a
 * href="https://api.flutter.dev/flutter/services/StringCodec-class.html">StringCodec</a> on the
 * Dart side. These parts of the Flutter SDK are evolved synchronously.
 */
export default class SendableStringCodec implements SendableMessageCodec<string> {
    constructor() {
        "use sendable";
    }
    static readonly INSTANCE: SendableStringCodec = new SendableStringCodec();
    encodeMessage(message: string): ArrayBuffer {
        if (message == null) {
            return StringUtils.stringToArrayBuffer("");
        }
        return StringUtils.stringToArrayBuffer(message);
    }
    decodeMessage(message: ArrayBuffer | null): string {
        if (message == null) {
            return "";
        }
        return StringUtils.arrayBufferToString(message);
    }
}
