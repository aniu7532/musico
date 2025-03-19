import type SoundPoolPlayer from '../player/SoundPoolPlayer';
import type Source from './Source';
import type media from "@ohos:multimedia.media";
import fs from "@ohos:file.fs";
import request from "@ohos:request";
export default class UrlSource implements Source {
    url: string;
    private isLocal: boolean;
    constructor(s96: string, t96: boolean) {
        this.url = s96;
        this.isLocal = t96;
    }
    setForMediaPlayer(p96: media.AVPlayer): void {
        if (this.isLocal) {
            let q96 = 'fd://';
            let r96 = fs.openSync(this.url);
            q96 = q96 + '' + r96.fd;
            p96.url = q96;
        }
        else {
            p96.url = this.url;
        }
    }
    setForSoundPool(o96: SoundPoolPlayer): void {
        o96.setUrlSource(this);
    }
    getAudioPathForSoundPool(g96: Context): Promise<string> {
        return new Promise<string>((h96, i96) => {
            if (this.isLocal) {
                let n96 = fs.openSync(this.url);
                h96('fd://' + n96.fd);
            }
            else {
                let j96 = g96.tempDir + "/sound.data";
                if (fs.accessSync(j96)) {
                    fs.rmdirSync(j96);
                }
                request.downloadFile(g96, {
                    url: this.url,
                    filePath: j96
                }).then((k96: request.DownloadTask) => {
                    k96.on('complete', () => {
                        let m96 = fs.openSync(j96);
                        h96('fd://' + m96.fd);
                    });
                    k96.on('fail', (l96: number) => {
                        h96(j96);
                    });
                });
            }
        });
    }
}
