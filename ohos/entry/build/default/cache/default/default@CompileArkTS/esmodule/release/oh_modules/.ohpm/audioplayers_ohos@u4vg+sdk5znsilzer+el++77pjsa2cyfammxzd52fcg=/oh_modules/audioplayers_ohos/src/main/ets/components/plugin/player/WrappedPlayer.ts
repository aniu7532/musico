import type AudioContextOhos from '../AudioContextOhos';
import type AudioplayersPlugin from '../AudioplayersPlugin';
import type { EventHandler } from '../AudioplayersPlugin';
import { ReleaseMode } from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/ReleaseMode";
import { PlayerMode } from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/PlayerMode";
import type Source from '../source/Source';
import FocusManager from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/player/FocusManager";
import type Player from './Player';
import type { Context } from "@ohos:abilityAccessCtrl";
import type audio from "@ohos:multimedia.audio";
import SoundPoolPlayer from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/player/SoundPoolPlayer";
import type { SoundPoolManager } from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/player/SoundPoolPlayer";
import MediaPlayerPlayer from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/player/MediaPlayerPlayer";
export default class WrappedPlayer {
    private ref: AudioplayersPlugin;
    eventHandler: EventHandler;
    context: AudioContextOhos;
    private soundPoolManager: SoundPoolManager;
    private player: Player | null = null;
    private source: Source | null = null;
    private released: boolean = true;
    private prepared: boolean = false;
    private playing: boolean = false;
    private volume: number = 1.0;
    private balance: number = 0.0;
    private rate: number = 1.0;
    private releaseMode: ReleaseMode = ReleaseMode.RELEASE;
    private isLooping: boolean = this.releaseMode == ReleaseMode.LOOP;
    private playerMode: PlayerMode = PlayerMode.MEDIA_PLAYER;
    private shouldSeekTo: number = -1;
    private focusManager = new FocusManager(this);
    constructor(m95: AudioplayersPlugin, n95: EventHandler, o95: AudioContextOhos, p95: SoundPoolManager) {
        this.ref = m95;
        this.eventHandler = n95;
        this.context = o95;
        this.soundPoolManager = p95;
    }
    async setSource(k95: Source | null) {
        if (this.source != k95) {
            this.source = k95;
            if (k95 != null) {
                let l95 = await this.getOrCreatePlayer();
                l95.setSource(k95);
                await this.configAndPrepare();
            }
            else {
                this.released = true;
                this.setPrepared(false);
                this.playing = false;
                await this.player?.release();
            }
        }
        else {
            this.ref.handlePrepared(this, true);
        }
    }
    getSource(): Source | null {
        return this.source;
    }
    isPlaying(): boolean {
        return this.playing;
    }
    setVolume(j95: number) {
        if (this.volume != j95) {
            this.volume = j95;
            if (!this.released) {
                this.setVolumeAndBalance(j95, this.balance);
            }
        }
    }
    setBalance(i95: number) {
        if (this.balance != i95) {
            this.balance = i95;
            if (!this.released) {
                this.setVolumeAndBalance(this.volume, i95);
            }
        }
    }
    setRate(h95: number) {
        if (this.rate != h95) {
            this.rate = h95;
            this.player && this.player?.setRate(h95);
        }
    }
    setReleaseMode(g95: ReleaseMode) {
        if (this.releaseMode != g95) {
            this.releaseMode = g95;
            this.isLooping = this.releaseMode == ReleaseMode.LOOP;
            if (!this.released) {
                this.player?.setLooping(this.isLooping);
            }
        }
    }
    getLooping() {
        return this.releaseMode == ReleaseMode.LOOP;
    }
    async setPlayerMode(f95: PlayerMode) {
        if (this.playerMode != f95) {
            this.playerMode = f95;
            if (this.player) {
                this.shouldSeekTo = this.maybeGetCurrentPosition();
                this.setPrepared(false);
                await this.player.release();
            }
            await this.initPlayer();
        }
    }
    setPrepared(e95: boolean) {
        if (this.prepared != e95) {
            this.prepared = e95;
            this.ref.handlePrepared(this, e95);
        }
    }
    getPrepared(): boolean {
        return this.prepared;
    }
    getVolume() {
        return this.volume;
    }
    getRate() {
        return this.rate;
    }
    private maybeGetCurrentPosition(): number {
        if (this.player) {
            let d95 = this.player.getCurrentPosition();
            return d95 != null ? d95 : -1;
        }
        return -1;
    }
    private async getOrCreatePlayer() {
        let c95 = this.player;
        if (this.released || c95 == null) {
            this.player = await this.createPlayer();
            this.released = false;
            return this.player!;
        }
        else if (this.prepared) {
            await c95?.reset();
            this.setPrepared(false);
        }
        return c95!;
    }
    async updateAudioContext(b95: AudioContextOhos) {
        if (this.context == b95) {
            return;
        }
        this.context = b95.copy();
        if (this.player) {
            await this.player.stop();
            await this.player.reset();
            this.setPrepared(false);
            this.player.updateContext(this.context);
            if (this.source) {
                this.player.setSource(this.source);
                await this.configAndPrepare();
            }
        }
    }
    getDuration(): number | null {
        return (this.prepared && this.player) ? this.player!.getDuration() : null;
    }
    getCurrentPosition(): number | null {
        return (this.prepared && this.player) ? this.player!.getCurrentPosition() : null;
    }
    isActuallyPlaying(): boolean {
        return this.playing && this.prepared && this.player != null && this.player!.isActuallyPlaying() == true;
    }
    getApplicationContext(): Context {
        return this.ref.getApplicationContext();
    }
    getAudioManager(): audio.AudioManager {
        return this.ref.getAudioManager();
    }
    play() {
        this.focusManager.maybeRequestAudioFocus(async () => await this.actuallyPlay());
    }
    async actuallyPlay() {
        if (!this.playing && !this.released) {
            let a95 = this.player;
            this.playing = true;
            if (a95 == null) {
                await this.initPlayer();
            }
            else if (this.prepared) {
                await a95.start();
                this.ref.handleIsPlaying();
            }
        }
    }
    async stop() {
        this.focusManager.handleStop();
        if (this.released) {
            return;
        }
        if (this.releaseMode != ReleaseMode.RELEASE) {
            await this.pause();
            if (this.prepared) {
                if (this.player?.isLiveStream() == true) {
                    await this.player?.stop();
                    this.setPrepared(false);
                    await this.player?.prepare();
                }
                else {
                    this.seek(0);
                }
            }
        }
        else {
            await this.release();
        }
    }
    async release() {
        this.focusManager.handleStop();
        if (this.released) {
            return;
        }
        if (this.playing) {
            await this.player?.stop();
        }
        this.setSource(null);
        this.player = null;
    }
    async pause() {
        if (this.playing) {
            this.playing = false;
            if (this.prepared) {
                await this.player?.pause();
            }
        }
    }
    seek(z94: number) {
        if (this.prepared && this.player?.isLiveStream() != true) {
            this.player?.seekTo(z94);
            this.shouldSeekTo = -1;
        }
        else {
            this.shouldSeekTo = z94;
        }
    }
    async onPrepared() {
        this.setPrepared(true);
        this.ref.handleDuration(this);
        if (this.playing) {
            await this.player?.start();
            this.ref.handleIsPlaying();
        }
        if (this.shouldSeekTo >= 0 && this.player?.isLiveStream() != true) {
            this.player?.seekTo(this.shouldSeekTo);
        }
    }
    async onCompletion() {
        if (this.releaseMode != ReleaseMode.LOOP) {
            await this.stop();
        }
        this.ref.handleComplete(this);
    }
    onBuffering(y94: number) {
    }
    onSeekComplete() {
        this.ref.handleSeekComplete(this);
    }
    handleLog(x94: string) {
        this.ref.handleLog(this, x94);
    }
    handleError(u94?: string, v94?: string, w94?: any) {
        this.ref.handleError(this, u94, v94, w94);
    }
    onError(s94: number, t94: string): Boolean {
        this.setPrepared(false);
        this.handleError(s94.toString(), t94, null);
        return false;
    }
    private async createPlayer(): Promise<Player> {
        if (this.playerMode == PlayerMode.LOW_LATENCY) {
            let r94 = new SoundPoolPlayer(this, this.soundPoolManager);
            await r94.init();
            return r94;
        }
        else {
            let q94 = new MediaPlayerPlayer(this, this.context);
            await q94.initMediaPlayer();
            return q94;
        }
    }
    private async initPlayer() {
        let p94 = await this.createPlayer();
        this.player = p94;
        if (this.source) {
            await this.player.setSource(this.source);
            await this.configAndPrepare();
        }
    }
    private async configAndPrepare() {
        this.setRate(this.rate);
        this.setVolumeAndBalance(this.volume, this.balance);
        this.player?.setLooping(this.isLooping);
        await this.player?.prepare();
    }
    private setVolumeAndBalance(l94: number, m94: number) {
        let n94 = Math.min(1, 1 - m94) * l94;
        let o94 = Math.min(1, 1 + m94) * l94;
        this.player?.setVolume(n94, o94);
    }
    async dispose() {
        await this.release();
        this.eventHandler.dispose();
    }
    startContinuousTask() {
        this.ref.startContinuousTask();
    }
    stopContinuousTask() {
        this.ref.stopContinuousTask();
    }
}
