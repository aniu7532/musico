import flutter from "@app:com.example.beat/entry/flutter";
export default class StringUtils {
    static stringToArrayBuffer(v82: string): ArrayBuffer {
        if (v82.length == 0) {
            return new ArrayBuffer(0);
        }
        return flutter.nativeEncodeUtf8(v82).buffer;
    }
    static arrayBufferToString(u82: ArrayBuffer): string {
        if (u82.byteLength <= 0) {
            return "";
        }
        return flutter.nativeDecodeUtf8(new Uint8Array(u82));
    }
    static uint8ArrayToString(t82: Uint8Array): string {
        if (t82.length <= 0) {
            return "";
        }
        return flutter.nativeDecodeUtf8(t82);
    }
    static isNotEmpty(s82: string): boolean {
        return s82 != null && s82.length > 0;
    }
    static isEmpty(r82: string): boolean {
        return (!r82) || r82.length == 0;
    }
}
