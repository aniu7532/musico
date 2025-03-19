import audio from "@ohos:multimedia.audio";
import media from "@ohos:multimedia.media";
import type AudioContextOhos from '../AudioContextOhos';
import type AudioplayersPlugin from '../AudioplayersPlugin';
import type Source from '../source/Source';
import type UrlSource from '../source/UrlSource';
import type Player from './Player';
import type WrappedPlayer from './WrappedPlayer';
import HashMap from "@ohos:util.HashMap";
const MAX_STREAMS = 32;
export default class SoundPoolPlayer implements Player {
    wrappedPlayer: WrappedPlayer;
    private soundPoolManager: SoundPoolManager;
    soundId: number | null = null;
    private streamId: number | null = null;
    private audioContext: AudioContextOhos;
    private soundPoolWrapper: SoundPoolWrapper | null = null;
    private soundPool: media.SoundPool | null = null;
    constructor(j94: WrappedPlayer, k94: SoundPoolManager) {
        this.wrappedPlayer = j94;
        this.soundPoolManager = k94;
        this.audioContext = j94.context;
    }
    async init() {
        await this.soundPoolManager.createSoundPoolWrapper(MAX_STREAMS, this.audioContext);
        this.soundPoolWrapper = this.soundPoolManager.getSoundPoolWrapper(this.audioContext);
        this.soundPool = this.soundPoolWrapper!.soundPool;
    }
    async setAudioContext(i94: AudioContextOhos) {
        if (!i94.equals(i94)) {
            this.audioContext = i94;
            await this.release();
            await this.init();
        }
    }
    getDuration(): number | null {
        return null;
    }
    getCurrentPosition(): number | null {
        return null;
    }
    isActuallyPlaying(): boolean {
        return false;
    }
    isLiveStream(): boolean {
        return false;
    }
    async start() {
        let f94 = this.streamId;
        let g94 = this.soundId;
        if (g94 != null) {
            let h94: media.PlayParameters = {
                loop: this.wrappedPlayer.getLooping() ? -1 : 0,
                rate: this.convertRate(this.wrappedPlayer.getRate()),
                leftVolume: this.wrappedPlayer.getVolume(),
                rightVolume: this.wrappedPlayer.getVolume(),
                priority: 0,
            };
            this.streamId = await this.soundPool!.play(this.soundId, h94)!;
        }
    }
    pause() {
        if (this.streamId != null) {
            this.soundPool!.stop(this.streamId);
            this.streamId = null;
        }
    }
    stop() {
        if (this.streamId != null) {
            this.soundPool!.stop(this.streamId);
            this.streamId = null;
        }
    }
    seekTo(e94: number) {
    }
    async release() {
        await this.stop();
        if (this.soundId == null) {
            return;
        }
        if (this.getUrlSource() == null) {
            return;
        }
        if (!this.soundPoolWrapper!.urlToPlayers.hasKey(this.getUrlSource())) {
            return;
        }
        let c94 = this.soundPoolWrapper!.urlToPlayers.get(this.getUrlSource());
        if (c94.length == 1 && c94[0] == this) {
            this.soundPoolWrapper!.urlToPlayers.remove(this.getUrlSource());
            await this.soundPool!.unload(this.soundId);
            this.soundPoolWrapper!.soundIdToPlayer.remove(this.soundId);
            this.wrappedPlayer.handleLog("unloaded soundId $soundId");
        }
        else {
            let d94 = c94.indexOf(this);
            if (d94 > -1) {
                c94.splice(d94, 1);
            }
        }
        this.soundId = null;
    }
    async setVolume(a94: number, b94: number) {
        if (this.streamId != null) {
            await this.soundPool!.setVolume(this.streamId, a94, b94);
        }
    }
    async setRate(z93: number) {
        if (this.streamId != null) {
            await this.soundPool!.setRate(this.streamId, this.convertRate(z93));
        }
    }
    async setLooping(y93: boolean) {
        if (this.streamId != null) {
            await this.soundPool!.setLoop(this.streamId, y93 ? -1 : 0);
        }
    }
    updateContext(x93: AudioContextOhos) {
        this.audioContext = x93;
    }
    setSource(w93: Source) {
        w93.setForSoundPool(this);
    }
    prepare() {
    }
    reset() {
    }
    private unsupportedOperation(v93: string) {
        throw new Error(`LOW_LATENCY mode does not support: ${v93}`);
    }
    private convertRate(t93: number): audio.AudioRendererRate {
        let u93 = audio.AudioRendererRate.RENDER_RATE_NORMAL;
        if (this.wrappedPlayer.getRate() < 1) {
            u93 = audio.AudioRendererRate.RENDER_RATE_HALF;
        }
        else if (this.wrappedPlayer.getRate() > 1) {
            u93 = audio.AudioRendererRate.RENDER_RATE_DOUBLE;
        }
        return u93;
    }
    async setUrlSource(m93: UrlSource) {
        if (this.soundId != null) {
            await this.release();
        }
        if (!this.soundPoolWrapper!.urlToPlayers.hasKey(m93)) {
            this.soundPoolWrapper!.urlToPlayers.set(m93, Array<SoundPoolPlayer>());
        }
        let n93 = this.soundPoolWrapper!.urlToPlayers.get(m93);
        let o93 = n93.length > 0 ? n93[0] : null;
        if (o93 != null) {
            let s93 = o93.wrappedPlayer.getPrepared();
            this.wrappedPlayer.setPrepared(s93);
            this.soundId = o93.soundId;
            this.wrappedPlayer.handleLog(`Reusing soundId ${this.soundId} for ${m93.url} is prepared=${s93}`);
        }
        else {
            let p93 = new Date().getTime();
            this.wrappedPlayer.setPrepared(false);
            this.wrappedPlayer.handleLog(`Fetching actual URL for ${m93.url}}`);
            let q93 = await m93.getAudioPathForSoundPool(this.wrappedPlayer.getApplicationContext());
            this.wrappedPlayer.handleLog(`Now loading ${q93}`);
            let r93 = await this.soundPool!.load(q93);
            this.soundPoolWrapper!.soundIdToPlayer.set(r93, this);
            this.soundId = r93;
            this.wrappedPlayer.handleLog(`time to call load() for ${m93.url}: ${new Date().getTime() - p93} player=${this}}`);
        }
        n93.push(this);
    }
    getUrlSource(): UrlSource | null {
        let l93 = this.wrappedPlayer.getSource();
        return l93 ? this.wrappedPlayer.getSource() as UrlSource : null;
    }
}
export class SoundPoolManager {
    private ref: AudioplayersPlugin;
    private legacySoundPoolWrapper: SoundPoolWrapper | null = null;
    private soundPoolWrappers = new HashMap<string, SoundPoolWrapper>();
    constructor(k93: AudioplayersPlugin) {
        this.ref = k93;
    }
    async createSoundPoolWrapper(z92: number, a93: AudioContextOhos) {
        let b93 = a93.buildAttributes();
        let c93 = b93.usage + "" + b93.rendererFlags;
        if (!this.soundPoolWrappers.hasKey(c93)) {
            let d93 = await media.createSoundPool(z92, b93);
            this.ref.handleGlobalLog("Create SoundPool with " + c93);
            let e93 = new SoundPoolWrapper(d93);
            e93.soundPool.on('loadComplete', (f93: number) => {
                this.ref.handleGlobalLog(`Loaded ${f93}`);
                let g93 = e93.soundIdToPlayer.get(f93);
                let h93 = g93.getUrlSource();
                if (h93) {
                    e93.soundIdToPlayer.remove(g93.soundId);
                    let i93 = e93.urlToPlayers.get(h93);
                    for (let j93 of i93) {
                        j93.wrappedPlayer.handleLog(`Marking ${j93.soundId} as loaded`);
                        j93.wrappedPlayer.setPrepared(true);
                        if (j93.wrappedPlayer.isPlaying()) {
                            j93.wrappedPlayer.handleLog(`Delayed start of ${j93.soundId}`);
                            j93.start();
                        }
                    }
                }
            });
            this.soundPoolWrappers.set(c93, e93);
        }
    }
    getSoundPoolWrapper(w92: AudioContextOhos): SoundPoolWrapper | null {
        let x92 = w92.buildAttributes();
        let y92 = x92.usage + "" + x92.rendererFlags;
        return this.soundPoolWrappers.hasKey(y92) ? this.soundPoolWrappers.get(y92) : null;
    }
    dispose() {
        this.soundPoolWrappers.forEach((u92: SoundPoolWrapper, v92: string) => u92.dispose());
        this.soundPoolWrappers.clear();
    }
}
class SoundPoolWrapper {
    soundPool: media.SoundPool;
    soundIdToPlayer = new HashMap<number, SoundPoolPlayer>();
    urlToPlayers = new HashMap<UrlSource, Array<SoundPoolPlayer>>();
    constructor(t92: media.SoundPool) {
        this.soundPool = t92;
    }
    dispose() {
        this.soundPool.off('loadComplete');
        this.soundPool.release();
        this.soundIdToPlayer.clear();
        this.urlToPlayers.clear();
    }
}
