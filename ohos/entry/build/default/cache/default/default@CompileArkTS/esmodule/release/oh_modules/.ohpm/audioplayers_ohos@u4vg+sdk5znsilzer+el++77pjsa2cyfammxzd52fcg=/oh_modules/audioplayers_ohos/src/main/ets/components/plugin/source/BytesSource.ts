import type SoundPoolPlayer from '../player/SoundPoolPlayer';
import type Source from './Source';
import type media from "@ohos:multimedia.media";
export default class BytesSource implements Source {
    private bytes: ArrayBuffer;
    constructor(f96: ArrayBuffer) {
        this.bytes = f96;
    }
    setForMediaPlayer(w95: media.AVPlayer): void {
        let x95: media.AVDataSrcDescriptor = {
            fileSize: this.bytes.byteLength,
            callback: (y95: ArrayBuffer, z95: number, a96: number | undefined) => {
                if (y95 == undefined || z95 == undefined || a96 == undefined) {
                    return -1;
                }
                if (a96 >= x95.fileSize) {
                    return -1;
                }
                let b96 = this.computeRemainingSize(z95, a96);
                if (b96 < 0) {
                    return -1;
                }
                const c96 = new Uint8Array(y95);
                const d96 = this.bytes.slice(a96, a96 + b96);
                const e96 = new Uint8Array(d96);
                c96.set(e96);
                if (b96 > 0 && (x95.fileSize >= a96)) {
                    return b96;
                }
                return -1;
            }
        };
        w95.dataSrc = x95;
    }
    setForSoundPool(v95: SoundPoolPlayer): void {
        throw new Error("Bytes sources are not supported on LOW_LATENCY mode yet.");
    }
    private computeRemainingSize(s95: number, t95: number): number {
        let u95 = s95;
        if (t95 + u95 > this.bytes.byteLength) {
            u95 -= t95 + u95 - this.bytes.byteLength;
        }
        return u95;
    }
}
