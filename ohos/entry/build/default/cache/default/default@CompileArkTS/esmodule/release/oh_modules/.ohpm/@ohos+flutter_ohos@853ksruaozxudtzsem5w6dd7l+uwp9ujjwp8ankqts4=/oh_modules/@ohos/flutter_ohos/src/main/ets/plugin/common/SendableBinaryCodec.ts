import type SendableMessageCodec from './SendableMessageCodec';
export default class SendableBinaryCodec implements SendableMessageCodec<ArrayBuffer> {
    private returnsDirectByteBufferFromDecoding: boolean = false;
    static readonly INSTANCE_DIRECT: SendableBinaryCodec = new SendableBinaryCodec(true);
    constructor(a52: boolean) {
        "use sendable";
        this.returnsDirectByteBufferFromDecoding = a52;
    }
    encodeMessage(z51: ArrayBuffer): ArrayBuffer {
        return z51;
    }
    decodeMessage(y51: ArrayBuffer | null): ArrayBuffer {
        if (y51 == null) {
            return new ArrayBuffer(0);
        }
        else if (this.returnsDirectByteBufferFromDecoding) {
            return y51;
        }
        else {
            return y51.slice(0, y51.byteLength);
        }
    }
}
