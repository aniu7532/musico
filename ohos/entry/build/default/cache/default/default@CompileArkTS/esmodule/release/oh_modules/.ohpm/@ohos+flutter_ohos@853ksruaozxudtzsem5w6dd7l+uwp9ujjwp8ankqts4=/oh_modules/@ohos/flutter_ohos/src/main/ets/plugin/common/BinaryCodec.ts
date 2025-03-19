import type MessageCodec from './MessageCodec';
export default class BinaryCodec implements MessageCodec<ArrayBuffer> {
    private returnsDirectByteBufferFromDecoding: boolean = false;
    static readonly INSTANCE_DIRECT = new BinaryCodec(true);
    constructor(v47: boolean) {
        this.returnsDirectByteBufferFromDecoding = v47;
    }
    encodeMessage(u47: ArrayBuffer): ArrayBuffer {
        return u47;
    }
    decodeMessage(t47: ArrayBuffer | null): ArrayBuffer {
        if (t47 == null) {
            return new ArrayBuffer(0);
        }
        else if (this.returnsDirectByteBufferFromDecoding) {
            return t47;
        }
        else {
            return t47.slice(0, t47.byteLength);
        }
    }
}
