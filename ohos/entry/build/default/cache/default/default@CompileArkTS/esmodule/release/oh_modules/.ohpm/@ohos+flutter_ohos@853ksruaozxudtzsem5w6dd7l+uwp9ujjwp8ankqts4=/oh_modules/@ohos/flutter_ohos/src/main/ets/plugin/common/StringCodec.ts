import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
import type MessageCodec from './MessageCodec';
export default class StringCodec implements MessageCodec<string> {
    static readonly INSTANCE = new StringCodec();
    encodeMessage(n60: string): ArrayBuffer {
        if (n60 == null) {
            return StringUtils.stringToArrayBuffer("");
        }
        return StringUtils.stringToArrayBuffer(n60);
    }
    decodeMessage(m60: ArrayBuffer | null): string {
        if (m60 == null) {
            return "";
        }
        return StringUtils.arrayBufferToString(m60);
    }
}
