import type SendableMessageCodec from './SendableMessageCodec';
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
export default class SendableStringCodec implements SendableMessageCodec<string> {
    constructor() {
        "use sendable";
    }
    static readonly INSTANCE: SendableStringCodec = new SendableStringCodec();
    encodeMessage(a57: string): ArrayBuffer {
        if (a57 == null) {
            return StringUtils.stringToArrayBuffer("");
        }
        return StringUtils.stringToArrayBuffer(a57);
    }
    decodeMessage(z56: ArrayBuffer | null): string {
        if (z56 == null) {
            return "";
        }
        return StringUtils.arrayBufferToString(z56);
    }
}
