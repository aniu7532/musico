import type Any from './Any';
import { ByteBuffer } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/ByteBuffer";
import type SendableMessageCodec from './SendableMessageCodec';
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
import TreeMap from "@ohos:util.TreeMap";
import HashMap from "@ohos:util.HashMap";
import LightWeightMap from "@ohos:util.LightWeightMap";
import PlainArray from "@ohos:util.PlainArray";
import List from "@ohos:util.List";
import LinkedList from "@ohos:util.LinkedList";
export default class SendableStandardMessageCodec implements SendableMessageCodec<Any> {
    constructor() {
        "use sendable";
    }
    static INSTANCE: SendableStandardMessageCodec = new SendableStandardMessageCodec();
    encodeMessage(y55: Any): ArrayBuffer {
        const z55 = ByteBuffer.from(new ArrayBuffer(1024));
        this.writeValue(z55, y55);
        return z55.buffer;
    }
    decodeMessage(w55: ArrayBuffer | null): Any {
        if (w55 == null) {
            return null;
        }
        const x55 = ByteBuffer.from(w55);
        return this.readValue(x55);
    }
    private static NULL: number = 0;
    private static TRUE: number = 1;
    private static FALSE: number = 2;
    private static INT32: number = 3;
    private static INT64: number = 4;
    private static BIGINT: number = 5;
    private static FLOAT64: number = 6;
    private static STRING: number = 7;
    private static UINT8_ARRAY: number = 8;
    private static INT32_ARRAY: number = 9;
    private static INT64_ARRAY: number = 10;
    private static FLOAT64_ARRAY: number = 11;
    private static LIST: number = 12;
    private static MAP: number = 13;
    private static FLOAT32_ARRAY: number = 14;
    writeValue(f55: ByteBuffer, g55: Any): Any {
        if (g55 == null || g55 == undefined) {
            f55.writeInt8(SendableStandardMessageCodec.NULL);
        }
        else if (typeof g55 === "boolean") {
            f55.writeInt8(g55 ? SendableStandardMessageCodec.TRUE : SendableStandardMessageCodec.FALSE);
        }
        else if (typeof g55 === "number") {
            if (Number.isInteger(g55)) {
                if (-0x7fffffff - 1 <= g55 && g55 <= 0x7fffffff) {
                    f55.writeInt8(SendableStandardMessageCodec.INT32);
                    f55.writeInt32(g55, true);
                }
                else if (Number.MIN_SAFE_INTEGER <= g55 && g55 <= Number.MAX_SAFE_INTEGER) {
                    f55.writeInt8(SendableStandardMessageCodec.INT64);
                    f55.writeInt64(g55, true);
                }
                else {
                    f55.writeInt8(SendableStandardMessageCodec.FLOAT64);
                    this.writeAlignment(f55, 8);
                    f55.writeFloat64(g55, true);
                }
            }
            else {
                f55.writeInt8(SendableStandardMessageCodec.FLOAT64);
                this.writeAlignment(f55, 8);
                f55.writeFloat64(g55, true);
            }
        }
        else if (typeof g55 === "bigint") {
            f55.writeInt8(SendableStandardMessageCodec.BIGINT);
            const t55 = g55.toString(16);
            const u55 = t55.split('').map(v55 => v55.charCodeAt(0));
            this.writeBytes(f55, Uint8Array.from(u55));
        }
        else if (typeof g55 === "string") {
            f55.writeInt8(SendableStandardMessageCodec.STRING);
            let s55 = StringUtils.stringToArrayBuffer(g55);
            this.writeBytes(f55, new Uint8Array(s55));
        }
        else if (g55 instanceof Uint8Array) {
            f55.writeInt8(SendableStandardMessageCodec.UINT8_ARRAY);
            this.writeBytes(f55, g55);
        }
        else if (g55 instanceof Int32Array) {
            f55.writeInt8(SendableStandardMessageCodec.INT32_ARRAY);
            this.writeSize(f55, g55.length);
            this.writeAlignment(f55, 4);
            g55.forEach(r55 => f55.writeInt32(r55, true));
        }
        else if (g55 instanceof BigInt64Array) {
            f55.writeInt8(SendableStandardMessageCodec.INT64_ARRAY);
            this.writeSize(f55, g55.length);
            this.writeAlignment(f55, 8);
            g55.forEach(q55 => f55.writeBigInt64(q55, true));
        }
        else if (g55 instanceof Float32Array) {
            f55.writeInt8(SendableStandardMessageCodec.FLOAT32_ARRAY);
            this.writeSize(f55, g55.length);
            this.writeAlignment(f55, 4);
            g55.forEach(p55 => f55.writeFloat32(p55, true));
        }
        else if (g55 instanceof Float64Array) {
            f55.writeInt8(SendableStandardMessageCodec.FLOAT64_ARRAY);
            this.writeSize(f55, g55.length);
            this.writeAlignment(f55, 8);
            g55.forEach(o55 => f55.writeFloat64(o55, true));
        }
        else if (g55 instanceof Array || g55 instanceof Int8Array || g55 instanceof Int16Array
            || g55 instanceof Uint16Array || g55 instanceof Uint32Array || g55 instanceof List
            || g55 instanceof LinkedList) {
            f55.writeInt8(SendableStandardMessageCodec.LIST);
            this.writeSize(f55, g55.length);
            g55.forEach((n55: Any): void => this.writeValue(f55, n55));
        }
        else if (g55 instanceof Map) {
            f55.writeInt8(SendableStandardMessageCodec.MAP);
            this.writeSize(f55, g55.size);
            g55.forEach((l55: Any, m55: Any) => {
                this.writeValue(f55, m55);
                this.writeValue(f55, l55);
            });
        }
        else if (g55 instanceof HashMap || g55 instanceof TreeMap || g55 instanceof LightWeightMap
            || g55 instanceof PlainArray) {
            f55.writeInt8(SendableStandardMessageCodec.MAP);
            this.writeSize(f55, g55.length);
            g55.forEach((j55: Any, k55: Any) => {
                this.writeValue(f55, k55);
                this.writeValue(f55, j55);
            });
        }
        else if (typeof g55 == 'object') {
            let h55: Map<string, Any> = new Map();
            Object.keys(g55).forEach(i55 => {
                h55.set(i55, g55[i55]);
            });
            this.writeValue(f55, h55);
        }
        else {
            throw new Error("Unsupported value: " + g55);
            f55.writeInt8(SendableStandardMessageCodec.NULL);
        }
        return f55;
    }
    writeAlignment(b55: ByteBuffer, c55: number) {
        let d55: number = b55.byteOffset % c55;
        if (d55 != 0) {
            for (let e55 = 0; e55 < c55 - d55; e55++) {
                b55.writeInt8(0);
            }
        }
    }
    writeSize(z54: ByteBuffer, a55: number) {
        if (a55 < 254) {
            z54.writeUint8(a55);
        }
        else if (a55 <= 0xffff) {
            z54.writeUint8(254);
            z54.writeUint16(a55, true);
        }
        else {
            z54.writeUint8(255);
            z54.writeUint32(a55, true);
        }
    }
    writeBytes(x54: ByteBuffer, y54: Uint8Array) {
        this.writeSize(x54, y54.length);
        x54.writeUint8Array(y54);
    }
    readSize(v54: ByteBuffer) {
        let w54 = v54.readUint8() & 0xff;
        if (w54 < 254) {
            return w54;
        }
        else if (w54 == 254) {
            return v54.readUint16(true);
        }
        else {
            return v54.readUint32(true);
        }
    }
    readAlignment(s54: ByteBuffer, t54: number) {
        let u54 = s54.byteOffset % t54;
        if (u54 != 0) {
            s54.skip(t54 - u54);
        }
    }
    readValue(q54: ByteBuffer): Any {
        let r54 = q54.readUint8();
        return this.readValueOfType(r54, q54);
    }
    readBytes(m54: ByteBuffer): Uint8Array {
        let n54 = this.readSize(m54);
        let o54 = new ArrayBuffer(n54);
        let p54 = new Uint8Array(o54);
        p54.set(m54.readUint8Array(n54));
        return p54;
    }
    readValueOfType(o53: number, p53: ByteBuffer): Any {
        let q53: Any;
        switch (o53) {
            case SendableStandardMessageCodec.NULL:
                q53 = null;
                break;
            case SendableStandardMessageCodec.TRUE:
                q53 = true;
                break;
            case SendableStandardMessageCodec.FALSE:
                q53 = false;
                break;
            case SendableStandardMessageCodec.INT32:
                q53 = p53.readInt32(true);
                break;
            case SendableStandardMessageCodec.INT64:
                q53 = p53.readInt64(true);
                if (Number.MIN_SAFE_INTEGER <= q53 && q53 <= Number.MAX_SAFE_INTEGER) {
                    q53 = Number(q53);
                }
                break;
            case SendableStandardMessageCodec.BIGINT:
                let r53: Uint8Array = this.readBytes(p53);
                const s53: string = String.fromCharCode(...r53);
                q53 = BigInt(`0x${s53}`);
                break;
            case SendableStandardMessageCodec.FLOAT64:
                this.readAlignment(p53, 8);
                q53 = p53.readFloat64(true);
                break;
            case SendableStandardMessageCodec.STRING: {
                let l54: Uint8Array = this.readBytes(p53);
                q53 = StringUtils.uint8ArrayToString(l54);
                break;
            }
            case SendableStandardMessageCodec.UINT8_ARRAY: {
                q53 = this.readBytes(p53);
                break;
            }
            case SendableStandardMessageCodec.INT32_ARRAY: {
                let i54 = this.readSize(p53);
                let j54 = new Int32Array(i54);
                this.readAlignment(p53, 4);
                for (let k54 = 0; k54 < i54; k54++) {
                    j54[k54] = p53.readInt32(true);
                }
                q53 = j54;
                break;
            }
            case SendableStandardMessageCodec.INT64_ARRAY: {
                let f54 = this.readSize(p53);
                let g54 = new BigInt64Array(f54);
                this.readAlignment(p53, 8);
                for (let h54 = 0; h54 < f54; h54++) {
                    g54[h54] = p53.readBigInt64(true);
                }
                q53 = g54;
                break;
            }
            case SendableStandardMessageCodec.FLOAT64_ARRAY: {
                let c54 = this.readSize(p53);
                let d54 = new Float64Array(c54);
                this.readAlignment(p53, 8);
                for (let e54 = 0; e54 < c54; e54++) {
                    d54[e54] = p53.readFloat64(true);
                }
                q53 = d54;
                break;
            }
            case SendableStandardMessageCodec.LIST: {
                let z53 = this.readSize(p53);
                let a54: Array<Any> = new Array(z53);
                for (let b54 = 0; b54 < z53; b54++) {
                    a54[b54] = this.readValue(p53);
                }
                q53 = a54;
                break;
            }
            case SendableStandardMessageCodec.MAP: {
                let w53 = this.readSize(p53);
                let x53: Map<Any, Any> = new Map();
                for (let y53 = 0; y53 < w53; y53++) {
                    x53.set(this.readValue(p53), this.readValue(p53));
                }
                q53 = x53;
                break;
            }
            case SendableStandardMessageCodec.FLOAT32_ARRAY: {
                let t53 = this.readSize(p53);
                let u53 = new Float32Array(t53);
                this.readAlignment(p53, 4);
                for (let v53 = 0; v53 < t53; v53++) {
                    u53[v53] = p53.readFloat32(true);
                }
                q53 = u53;
                break;
            }
            default:
                throw new Error("Message corrupted, type=" + o53);
        }
        return q53;
    }
}
