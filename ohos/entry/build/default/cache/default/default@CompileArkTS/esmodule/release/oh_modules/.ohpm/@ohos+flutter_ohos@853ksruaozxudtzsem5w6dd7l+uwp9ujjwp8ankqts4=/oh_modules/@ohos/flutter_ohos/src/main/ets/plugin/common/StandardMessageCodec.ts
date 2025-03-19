import { ByteBuffer } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/ByteBuffer";
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
import type MessageCodec from './MessageCodec';
import TreeMap from "@ohos:util.TreeMap";
import HashMap from "@ohos:util.HashMap";
import LightWeightMap from "@ohos:util.LightWeightMap";
import PlainArray from "@ohos:util.PlainArray";
import List from "@ohos:util.List";
import LinkedList from "@ohos:util.LinkedList";
import type Any from './Any';
import ArrayList from "@ohos:util.ArrayList";
export default class StandardMessageCodec implements MessageCodec<Any> {
    private static TAG = "StandardMessageCodec#";
    static INSTANCE = new StandardMessageCodec();
    encodeMessage(l59: Any): ArrayBuffer {
        const m59 = ByteBuffer.from(new ArrayBuffer(1024));
        this.writeValue(m59, l59);
        return m59.buffer;
    }
    decodeMessage(j59: ArrayBuffer | null): Any {
        if (j59 == null) {
            return null;
        }
        const k59 = ByteBuffer.from(j59);
        return this.readValue(k59);
    }
    private static NULL = 0;
    private static TRUE = 1;
    private static FALSE = 2;
    private static INT32 = 3;
    private static INT64 = 4;
    private static BIGINT = 5;
    private static FLOAT64 = 6;
    private static STRING = 7;
    private static UINT8_ARRAY = 8;
    private static INT32_ARRAY = 9;
    private static INT64_ARRAY = 10;
    private static FLOAT64_ARRAY = 11;
    private static LIST = 12;
    private static MAP = 13;
    private static FLOAT32_ARRAY = 14;
    private INT64_MAX = 9223372036854775807;
    private INT64_MIN = -9223372036854775808;
    writeValue(s58: ByteBuffer, t58: Any): Any {
        if (t58 == null || t58 == undefined) {
            s58.writeInt8(StandardMessageCodec.NULL);
        }
        else if (typeof t58 === "boolean") {
            s58.writeInt8(t58 ? StandardMessageCodec.TRUE : StandardMessageCodec.FALSE);
        }
        else if (typeof t58 === "number") {
            if (Number.isInteger(t58)) {
                if (-0x7fffffff - 1 <= t58 && t58 <= 0x7fffffff) {
                    s58.writeInt8(StandardMessageCodec.INT32);
                    s58.writeInt32(t58, true);
                }
                else if (Number.MIN_SAFE_INTEGER <= t58 && t58 <= Number.MAX_SAFE_INTEGER) {
                    s58.writeInt8(StandardMessageCodec.INT64);
                    s58.writeInt64(t58, true);
                }
                else {
                    s58.writeInt8(StandardMessageCodec.FLOAT64);
                    this.writeAlignment(s58, 8);
                    s58.writeFloat64(t58, true);
                }
            }
            else {
                s58.writeInt8(StandardMessageCodec.FLOAT64);
                this.writeAlignment(s58, 8);
                s58.writeFloat64(t58, true);
            }
        }
        else if (typeof t58 === "bigint") {
            if (t58 >= this.INT64_MIN && t58 <= this.INT64_MAX) {
                s58.writeInt8(StandardMessageCodec.INT64);
                s58.writeBigInt64(t58, true);
            }
            else {
                s58.writeInt8(StandardMessageCodec.BIGINT);
                const g59 = t58.toString(16);
                const h59 = g59.split('').map(i59 => i59.charCodeAt(0));
                this.writeBytes(s58, Uint8Array.from(h59));
            }
        }
        else if (typeof t58 === "string") {
            s58.writeInt8(StandardMessageCodec.STRING);
            let f59 = StringUtils.stringToArrayBuffer(t58);
            this.writeBytes(s58, new Uint8Array(f59));
        }
        else if (t58 instanceof Uint8Array) {
            s58.writeInt8(StandardMessageCodec.UINT8_ARRAY);
            this.writeBytes(s58, t58);
        }
        else if (t58 instanceof Int32Array) {
            s58.writeInt8(StandardMessageCodec.INT32_ARRAY);
            this.writeSize(s58, t58.length);
            this.writeAlignment(s58, 4);
            t58.forEach(e59 => s58.writeInt32(e59, true));
        }
        else if (t58 instanceof BigInt64Array) {
            s58.writeInt8(StandardMessageCodec.INT64_ARRAY);
            this.writeSize(s58, t58.length);
            this.writeAlignment(s58, 8);
            t58.forEach(d59 => s58.writeBigInt64(d59, true));
        }
        else if (t58 instanceof Float32Array) {
            s58.writeInt8(StandardMessageCodec.FLOAT32_ARRAY);
            this.writeSize(s58, t58.length);
            this.writeAlignment(s58, 4);
            t58.forEach(c59 => s58.writeFloat32(c59, true));
        }
        else if (t58 instanceof Float64Array) {
            s58.writeInt8(StandardMessageCodec.FLOAT64_ARRAY);
            this.writeSize(s58, t58.length);
            this.writeAlignment(s58, 8);
            t58.forEach(b59 => s58.writeFloat64(b59, true));
        }
        else if (t58 instanceof Array || t58 instanceof Int8Array || t58 instanceof Int16Array
            || t58 instanceof Uint16Array || t58 instanceof Uint32Array || t58 instanceof List
            || t58 instanceof LinkedList || t58 instanceof ArrayList) {
            s58.writeInt8(StandardMessageCodec.LIST);
            this.writeSize(s58, t58.length);
            t58.forEach((a59: Any): void => this.writeValue(s58, a59));
        }
        else if (t58 instanceof Map) {
            s58.writeInt8(StandardMessageCodec.MAP);
            this.writeSize(s58, t58.size);
            t58.forEach((y58: Any, z58: Any) => {
                this.writeValue(s58, z58);
                this.writeValue(s58, y58);
            });
        }
        else if (t58 instanceof HashMap || t58 instanceof TreeMap || t58 instanceof LightWeightMap
            || t58 instanceof PlainArray) {
            s58.writeInt8(StandardMessageCodec.MAP);
            this.writeSize(s58, t58.length);
            t58.forEach((w58: Any, x58: Any) => {
                this.writeValue(s58, x58);
                this.writeValue(s58, w58);
            });
        }
        else if (typeof t58 == 'object') {
            let u58: Map<string, Any> = new Map();
            Object.keys(t58).forEach(v58 => {
                u58.set(v58, t58[v58]);
            });
            this.writeValue(s58, u58);
        }
        else {
            throw new Error("Unsupported value: " + t58);
            s58.writeInt8(StandardMessageCodec.NULL);
        }
        return s58;
    }
    writeAlignment(o58: ByteBuffer, p58: number) {
        let q58: number = o58.byteOffset % p58;
        if (q58 != 0) {
            for (let r58 = 0; r58 < p58 - q58; r58++) {
                o58.writeInt8(0);
            }
        }
    }
    writeSize(m58: ByteBuffer, n58: number) {
        if (n58 < 254) {
            m58.writeUint8(n58);
        }
        else if (n58 <= 0xffff) {
            m58.writeUint8(254);
            m58.writeUint16(n58, true);
        }
        else {
            m58.writeUint8(255);
            m58.writeUint32(n58, true);
        }
    }
    writeBytes(k58: ByteBuffer, l58: Uint8Array) {
        this.writeSize(k58, l58.length);
        k58.writeUint8Array(l58);
    }
    readSize(i58: ByteBuffer) {
        let j58 = i58.readUint8() & 0xff;
        if (j58 < 254) {
            return j58;
        }
        else if (j58 == 254) {
            return i58.readUint16(true);
        }
        else {
            return i58.readUint32(true);
        }
    }
    readAlignment(f58: ByteBuffer, g58: number) {
        let h58 = f58.byteOffset % g58;
        if (h58 != 0) {
            f58.skip(g58 - h58);
        }
    }
    readValue(d58: ByteBuffer): Any {
        let e58 = d58.readUint8();
        return this.readValueOfType(e58, d58);
    }
    readBytes(z57: ByteBuffer): Uint8Array {
        let a58 = this.readSize(z57);
        let b58 = new ArrayBuffer(a58);
        let c58 = new Uint8Array(b58);
        c58.set(z57.readUint8Array(a58));
        return c58;
    }
    readValueOfType(b57: number, c57: ByteBuffer): Any {
        let d57: Any;
        switch (b57) {
            case StandardMessageCodec.NULL:
                d57 = null;
                break;
            case StandardMessageCodec.TRUE:
                d57 = true;
                break;
            case StandardMessageCodec.FALSE:
                d57 = false;
                break;
            case StandardMessageCodec.INT32:
                d57 = c57.readInt32(true);
                break;
            case StandardMessageCodec.INT64:
                d57 = c57.readInt64(true);
                if (Number.MIN_SAFE_INTEGER <= d57 && d57 <= Number.MAX_SAFE_INTEGER) {
                    d57 = Number(d57);
                }
                break;
            case StandardMessageCodec.BIGINT:
                let e57: Uint8Array = this.readBytes(c57);
                const f57: string = String.fromCharCode(...e57);
                d57 = BigInt(`0x${f57}`);
                break;
            case StandardMessageCodec.FLOAT64:
                this.readAlignment(c57, 8);
                d57 = c57.readFloat64(true);
                break;
            case StandardMessageCodec.STRING: {
                let y57: Uint8Array = this.readBytes(c57);
                d57 = StringUtils.uint8ArrayToString(y57);
                break;
            }
            case StandardMessageCodec.UINT8_ARRAY: {
                d57 = this.readBytes(c57);
                break;
            }
            case StandardMessageCodec.INT32_ARRAY: {
                let v57 = this.readSize(c57);
                let w57 = new Int32Array(v57);
                this.readAlignment(c57, 4);
                for (let x57 = 0; x57 < v57; x57++) {
                    w57[x57] = c57.readInt32(true);
                }
                d57 = w57;
                break;
            }
            case StandardMessageCodec.INT64_ARRAY: {
                let s57 = this.readSize(c57);
                let t57 = new BigInt64Array(s57);
                this.readAlignment(c57, 8);
                for (let u57 = 0; u57 < s57; u57++) {
                    t57[u57] = c57.readBigInt64(true);
                }
                d57 = t57;
                break;
            }
            case StandardMessageCodec.FLOAT64_ARRAY: {
                let p57 = this.readSize(c57);
                let q57 = new Float64Array(p57);
                this.readAlignment(c57, 8);
                for (let r57 = 0; r57 < p57; r57++) {
                    q57[r57] = c57.readFloat64(true);
                }
                d57 = q57;
                break;
            }
            case StandardMessageCodec.LIST: {
                let m57 = this.readSize(c57);
                let n57: Array<Any> = new Array(m57);
                for (let o57 = 0; o57 < m57; o57++) {
                    n57[o57] = this.readValue(c57);
                }
                d57 = n57;
                break;
            }
            case StandardMessageCodec.MAP: {
                let j57 = this.readSize(c57);
                let k57: Map<Any, Any> = new Map();
                for (let l57 = 0; l57 < j57; l57++) {
                    k57.set(this.readValue(c57), this.readValue(c57));
                }
                d57 = k57;
                break;
            }
            case StandardMessageCodec.FLOAT32_ARRAY: {
                let g57 = this.readSize(c57);
                let h57 = new Float32Array(g57);
                this.readAlignment(c57, 4);
                for (let i57 = 0; i57 < g57; i57++) {
                    h57[i57] = c57.readFloat32(true);
                }
                d57 = h57;
                break;
            }
            default:
                throw new Error("Message corrupted, type=" + b57);
        }
        return d57;
    }
}
