import util from "@ohos:util";
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
export class ByteBuffer {
    static from(j81: ArrayBuffer, k81?: number, l81?: number): ByteBuffer {
        const m81 = new ByteBuffer();
        m81.dataView = l81 === undefined ? new DataView(j81, k81) : new DataView(j81, k81, Math.min(j81.byteLength, l81));
        m81.mByteOffset = m81.dataView.byteOffset;
        return m81;
    }
    private dataView?: DataView;
    mByteOffset: number = 0;
    get byteOffset(): number {
        return this.mByteOffset;
    }
    get byteLength(): number {
        return this.dataView?.byteLength ?? 0;
    }
    get bytesRemaining(): number {
        return this.dataView ? this.dataView.byteLength - this.mByteOffset : 0;
    }
    hasRemaining(): boolean {
        return this.dataView != undefined && this.mByteOffset < this.dataView.byteLength;
    }
    get buffer(): ArrayBuffer {
        return this.dataView!.buffer.slice(0, this.mByteOffset);
    }
    skip(i81: number): void {
        this.mByteOffset += i81;
    }
    reset(): void {
        this.mByteOffset = this.dataView?.byteOffset ?? 0;
    }
    clear(): void {
        this.getUint8Array(0).fill(0);
    }
    checkWriteCapacity(c81: number): void {
        if (this.mByteOffset + c81 > this.dataView!.byteLength) {
            let d81 = this.dataView!.byteLength + (this.dataView!.byteLength >> 1);
            if (d81 < this.dataView!.byteLength + c81 + 512) {
                d81 = this.dataView!.byteLength + c81 + 512;
            }
            let e81 = new ArrayBuffer(d81);
            let f81 = new DataView(e81);
            let g81 = new Uint8Array(this.dataView!.buffer);
            let h81 = new Uint8Array(e81);
            h81.set(g81);
            this.dataView = f81;
        }
    }
    getBool(b81: number): boolean {
        return this.getInt8(b81) !== 0;
    }
    readBool(): boolean {
        return this.getInt8(this.mByteOffset++) !== 0;
    }
    setBool(z80: number, a81: boolean): void {
        this.dataView?.setInt8(z80, a81 ? 1 : 0);
    }
    writeBool(y80: boolean): void {
        this.checkWriteCapacity(1);
        this.setInt8(this.mByteOffset++, y80 ? 1 : 0);
    }
    getInt8(x80: number): number {
        return this.dataView?.getInt8(x80) || 0;
    }
    readInt8(): number {
        return this.getInt8(this.mByteOffset++);
    }
    setInt8(v80: number, w80: number): void {
        this.dataView?.setInt8(v80, w80);
    }
    writeInt8(u80: number): void {
        this.checkWriteCapacity(1);
        this.setInt8(this.mByteOffset++, u80);
    }
    getUint8(t80: number): number {
        return this.dataView?.getUint8(t80) || 0;
    }
    readUint8(): number {
        return this.getUint8(this.mByteOffset++);
    }
    setUint8(r80: number, s80: number): void {
        this.dataView?.setUint8(r80, s80);
    }
    writeUint8(q80: number): void {
        this.checkWriteCapacity(1);
        this.setUint8(this.mByteOffset++, q80);
    }
    getInt16(o80: number, p80?: boolean): number {
        return this.dataView?.getInt16(o80, p80) || 0;
    }
    readInt16(m80?: boolean): number {
        const n80 = this.getInt16(this.mByteOffset, m80);
        this.mByteOffset += 2;
        return n80;
    }
    setInt16(j80: number, k80: number, l80?: boolean): void {
        this.dataView?.setInt16(j80, k80, l80);
    }
    writeInt16(h80: number, i80?: boolean): void {
        this.checkWriteCapacity(2);
        this.setInt16(this.mByteOffset, h80, i80);
        this.mByteOffset += 2;
    }
    getUint16(f80: number, g80?: boolean): number {
        return this.dataView?.getUint16(f80, g80) || 0;
    }
    readUint16(d80?: boolean): number {
        const e80 = this.getUint16(this.mByteOffset, d80);
        this.mByteOffset += 2;
        return e80;
    }
    setUint16(a80: number, b80: number, c80?: boolean): void {
        this.dataView?.setUint16(a80, b80, c80);
    }
    writeUint16(y79: number, z79?: boolean): void {
        this.checkWriteCapacity(2);
        this.setUint16(this.mByteOffset, y79, z79);
        this.mByteOffset += 2;
    }
    getInt32(w79: number, x79?: boolean): number {
        return this.dataView?.getInt32(w79, x79) ?? 0;
    }
    readInt32(u79?: boolean): number {
        const v79 = this.getInt32(this.mByteOffset, u79);
        this.mByteOffset += 4;
        return v79;
    }
    setInt32(r79: number, s79: number, t79?: boolean): void {
        this.dataView?.setInt32(r79, s79, t79);
    }
    writeInt32(p79: number, q79?: boolean): void {
        this.checkWriteCapacity(4);
        this.setInt32(this.mByteOffset, p79, q79);
        this.mByteOffset += 4;
    }
    getUint32(n79: number, o79?: boolean): number {
        return this.dataView?.getUint32(n79, o79) ?? 0;
    }
    readUint32(l79?: boolean): number {
        const m79 = this.getUint32(this.mByteOffset, l79);
        this.mByteOffset += 4;
        return m79;
    }
    setUint32(i79: number, j79: number, k79?: boolean): void {
        this.dataView?.setUint32(i79, j79, k79);
    }
    writeUint32(g79: number, h79?: boolean): void {
        this.checkWriteCapacity(4);
        this.setUint32(this.mByteOffset, g79, h79);
        this.mByteOffset += 4;
    }
    getFloat32(e79: number, f79?: boolean): number {
        return this.dataView?.getFloat32(e79, f79) ?? 0;
    }
    readFloat32(c79?: boolean): number {
        const d79 = this.getFloat32(this.mByteOffset, c79);
        this.mByteOffset += 4;
        return d79;
    }
    setFloat32(z78: number, a79: number, b79?: boolean): void {
        this.dataView?.setFloat32(z78, a79, b79);
    }
    writeFloat32(x78: number, y78?: boolean): void {
        this.checkWriteCapacity(4);
        this.setFloat32(this.mByteOffset, x78, y78);
        this.mByteOffset += 4;
    }
    getFloat64(v78: number, w78?: boolean): number {
        return this.dataView?.getFloat64(v78, w78) ?? 0;
    }
    readFloat64(t78?: boolean): number {
        const u78 = this.getFloat64(this.mByteOffset, t78);
        this.mByteOffset += 8;
        return u78;
    }
    setFloat64(q78: number, r78: number, s78?: boolean): void {
        this.dataView?.setFloat64(q78, r78, s78);
    }
    writeFloat64(o78: number, p78?: boolean): void {
        this.checkWriteCapacity(8);
        this.setFloat64(this.mByteOffset, o78, p78);
        this.mByteOffset += 8;
    }
    getBigInt64(m78: number, n78?: boolean): bigint {
        return this.dataView?.getBigInt64(m78, n78) ?? BigInt(0);
    }
    readBigInt64(k78?: boolean): bigint {
        const l78 = this.getBigInt64(this.mByteOffset, k78);
        this.mByteOffset += 8;
        return l78;
    }
    setBigInt64(h78: number, i78: bigint, j78?: boolean): void {
        this.dataView?.setBigInt64(h78, i78, j78);
    }
    writeBigInt64(f78: bigint, g78?: boolean): void {
        this.checkWriteCapacity(8);
        this.setBigInt64(this.mByteOffset, f78, g78);
        this.mByteOffset += 8;
    }
    getBigUint64(d78: number, e78?: boolean): bigint {
        return this.dataView?.getBigUint64(d78, e78) ?? BigInt(0);
    }
    readBigUint64(b78?: boolean): bigint {
        const c78 = this.getBigUint64(this.mByteOffset, b78);
        this.mByteOffset += 8;
        return c78;
    }
    setBigUint64(y77: number, z77: bigint, a78?: boolean): void {
        this.dataView?.setBigUint64(y77, z77, a78);
    }
    writeBigUint64(w77: bigint, x77?: boolean): void {
        this.checkWriteCapacity(8);
        this.setBigUint64(this.mByteOffset, w77, x77);
        this.mByteOffset += 8;
    }
    getInt64(u77: number, v77?: boolean): bigint {
        return this.getBigInt64(u77, v77);
    }
    readInt64(s77?: boolean): bigint {
        const t77 = this.getInt64(this.mByteOffset, s77);
        this.mByteOffset += 8;
        return t77;
    }
    setInt64(p77: number, q77: number, r77?: boolean): void {
        this.setBigInt64(p77, BigInt(q77), r77);
    }
    writeInt64(n77: number, o77?: boolean): void {
        this.checkWriteCapacity(8);
        this.setInt64(this.mByteOffset, n77, o77);
        this.mByteOffset += 8;
    }
    getUint64(l77: number, m77?: boolean): number {
        return Number(this.getBigUint64(l77, m77));
    }
    readUint64(j77?: boolean): number {
        const k77 = this.getUint64(this.mByteOffset, j77);
        this.mByteOffset += 8;
        return k77;
    }
    setUint64(g77: number, h77: number, i77?: boolean): void {
        this.setBigUint64(g77, BigInt(h77), i77);
    }
    writeUint64(e77: number, f77?: boolean): void {
        this.checkWriteCapacity(8);
        this.setUint64(this.mByteOffset, e77, f77);
        this.mByteOffset += 8;
    }
    getUint8Array(c77: number, d77?: number): Uint8Array {
        return this.dataView == null
            ? new Uint8Array(StringUtils.stringToArrayBuffer(""), c77, d77)
            : new Uint8Array(this.dataView?.buffer, this.dataView?.byteOffset + c77, d77);
    }
    readUint8Array(a77?: number): Uint8Array {
        const b77 = this.getUint8Array(this.mByteOffset, a77);
        this.mByteOffset += b77.byteLength;
        return b77;
    }
    setUint8Array(x76: number, y76: Uint8Array): void {
        const z76 = y76.byteLength;
        this.getUint8Array(x76, z76).set(y76);
    }
    writeUint8Array(w76: Uint8Array): void {
        this.checkWriteCapacity(w76.byteLength);
        this.setUint8Array(this.mByteOffset, w76);
        this.mByteOffset += w76.byteLength;
    }
    getUint16Array(u76: number, v76?: number): Uint16Array {
        if (v76 !== undefined) {
            v76 = Math.floor(v76 / 2);
        }
        return this.dataView == null
            ? new Uint16Array(StringUtils.stringToArrayBuffer(""), u76, v76)
            : new Uint16Array(this.dataView.buffer, this.dataView.byteOffset + u76, v76);
    }
    readUint16Array(s76?: number): Uint16Array {
        const t76 = this.getUint16Array(this.mByteOffset, s76);
        this.mByteOffset += t76.byteLength;
        return t76;
    }
    setUint16Array(p76: number, q76: Uint16Array): void {
        const r76 = q76.byteLength;
        this.getUint16Array(p76, r76).set(q76);
    }
    writeUint16Array(o76: Uint16Array): void {
        this.checkWriteCapacity(o76.byteLength);
        this.setUint16Array(this.mByteOffset, o76);
        this.mByteOffset += o76.byteLength;
    }
    getString(j76: number, k76?: number, l76?: string): string {
        const m76 = new util.TextDecoder(l76 || "utf-8");
        const n76 = this.getUint8Array(j76, k76);
        return m76.decode(n76);
    }
    readString(g76?: number, h76?: string): string {
        const i76 = this.getString(this.mByteOffset, g76, h76);
        if (g76 === undefined) {
            this.mByteOffset = this.dataView?.byteLength ?? 0;
        }
        else {
            this.mByteOffset += g76;
        }
        return i76;
    }
    setString(y75: number, z75: string, a76?: string, b76?: boolean): number {
        if (a76 && a76 !== "utf-8") {
            throw new TypeError("String encoding '" + a76 + "' is not supported");
        }
        const c76 = new util.TextEncoder();
        const d76 = Math.min(this.dataView!.byteLength - y75, z75.length * 4);
        if (b76) {
            this.checkWriteCapacity(d76);
        }
        const e76 = this.getUint8Array(y75, d76);
        const f76 = c76.encodeInto(z75, e76).written;
        return f76 || 0;
    }
    writeString(v75: string, w75?: string): void {
        const x75 = this.setString(this.mByteOffset, v75, w75, true);
        this.mByteOffset += x75;
    }
    toString(t75?: string): string {
        return [...this.getUint8Array(0)].map((u75: number) => {
            switch (t75) {
                case "hex":
                    return ("00" + u75.toString(16)).slice(-2);
                default:
                    return u75.toString(10);
            }
        }).join(" ");
    }
}
