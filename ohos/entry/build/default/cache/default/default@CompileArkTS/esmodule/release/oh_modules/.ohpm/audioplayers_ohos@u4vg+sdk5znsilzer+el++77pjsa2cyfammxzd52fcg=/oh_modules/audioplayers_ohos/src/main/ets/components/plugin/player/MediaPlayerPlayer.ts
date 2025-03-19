import type AudioContextOhos from '../AudioContextOhos';
import type Source from '../source/Source';
import type Player from './Player';
import type WrappedPlayer from './WrappedPlayer';
import media from "@ohos:multimedia.media";
import type { BusinessError } from "@ohos:base";
import { Log } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/index";
import window from "@ohos:window";
import type common from "@ohos:app.ability.common";
const TAG = "MediaPlayerPlayer";
const OPERATE_ERROR: number = 801;
const AVPLAYER_STATE_ERROR: number = 5400102;
const AVPLAYER_IO_ERROR: number = 5400103;
export default class MediaPlayerPlayer implements Player {
    private wrappedPlayer: WrappedPlayer;
    private mediaPlayer?: media.AVPlayer | null = null;
    private isLooping: boolean = false;
    private volume: number = 1;
    private needPrepare: boolean = false;
    private stayAwake: boolean = false;
    constructor(r92: WrappedPlayer, s92: AudioContextOhos) {
        this.wrappedPlayer = r92;
        this.stayAwake = s92.stayAwake;
    }
    async initMediaPlayer() {
        this.mediaPlayer = await media.createAVPlayer();
        this.setAVPlayerCallback(this.mediaPlayer);
        Log.d(TAG, "initMediaPlayer");
    }
    setAVPlayerCallback(k92: media.AVPlayer) {
        k92.on('seekDone', (q92: number) => {
            Log.d(TAG, `AVPlayer seek succeeded, seek time is ${q92}`);
            this.wrappedPlayer.onSeekComplete();
        });
        k92.on('bufferingUpdate', (o92: media.BufferingInfoType, p92: number) => {
            Log.d(TAG, `AVPlayer bufferingUpdate value is ${p92}`);
            this.wrappedPlayer.onBuffering(p92);
        });
        k92.on('error', (n92: BusinessError) => {
            if (n92.code == OPERATE_ERROR || n92.code == AVPLAYER_STATE_ERROR || n92.code == AVPLAYER_IO_ERROR) {
                Log.e(TAG, "AvPlayer Avoid Error Reporting: " + JSON.stringify(n92));
                return;
            }
            Log.e(TAG, `Invoke avPlayer failed, code is ${n92.code}, message is ${n92.message}`);
            this.wrappedPlayer.onError(n92.code, n92.message);
        });
        k92.on('stateChange', async (l92: string, m92: media.StateChangeReason) => {
            switch (l92) {
                case 'idle':
                    Log.d(TAG, 'AVPlayer state idle called.');
                    break;
                case 'initialized':
                    Log.d(TAG, 'AVPlayer state initialized called.');
                    this.wrappedPlayer.context?.setAttributesOnPlayer(this.mediaPlayer!);
                    this.needPrepare && this.prepare();
                    break;
                case 'prepared':
                    Log.d(TAG, 'AVPlayer state prepared called.');
                    this.setVolume(this.volume, this.volume);
                    this.setLooping(this.isLooping);
                    this.wrappedPlayer.onPrepared();
                    break;
                case 'playing':
                    Log.d(TAG, 'AVPlayer state playing called.');
                    this.wrappedPlayer.startContinuousTask();
                    break;
                case 'paused':
                    Log.d(TAG, 'AVPlayer state paused called.');
                    this.wrappedPlayer.stopContinuousTask();
                    break;
                case 'completed':
                    Log.d(TAG, 'AVPlayer state completed called.');
                    this.wrappedPlayer.onCompletion();
                    break;
                case 'stopped':
                    Log.d(TAG, 'AVPlayer state stopped called.');
                    this.wrappedPlayer.stopContinuousTask();
                    this.needPrepare && this.prepare();
                    break;
                case 'released':
                    this.wrappedPlayer.stopContinuousTask();
                    Log.d(TAG, 'AVPlayer state released called.');
                    break;
                default:
                    Log.d(TAG, 'AVPlayer state unknown called.');
                    break;
            }
        });
    }
    getDuration(): number {
        return this.mediaPlayer ? this.mediaPlayer!.duration : -1;
    }
    getCurrentPosition(): number {
        return this.mediaPlayer ? this.mediaPlayer!.currentTime : -1;
    }
    isActuallyPlaying(): boolean {
        return this.mediaPlayer ? this.mediaPlayer!.state == 'playing' : false;
    }
    isLiveStream(): boolean {
        let j92 = this.getDuration();
        return j92 == 0 || j92 == -1;
    }
    async start() {
        this.mediaPlayer && await this.mediaPlayer.play();
    }
    async pause() {
        this.mediaPlayer && this.mediaPlayer!.state == 'playing' && await this.mediaPlayer.pause();
    }
    async stop() {
        this.needPrepare = false;
        this.mediaPlayer && await this.mediaPlayer.stop();
    }
    seekTo(i92: number) {
        this.mediaPlayer && this.mediaPlayer.seek(i92);
    }
    async release() {
        if (this.mediaPlayer) {
            await this.mediaPlayer.reset();
            await this.mediaPlayer.release();
        }
    }
    setVolume(g92: number, h92: number) {
        this.volume = g92;
        if (this.isReadyState()) {
            this.mediaPlayer!.setVolume(g92);
        }
    }
    setRate(e92: number) {
        let f92 = media.PlaybackSpeed.SPEED_FORWARD_1_00_X;
        if (e92 < 1) {
            f92 = media.PlaybackSpeed.SPEED_FORWARD_0_75_X;
        }
        else if (e92 == 1.25) {
            f92 = media.PlaybackSpeed.SPEED_FORWARD_1_25_X;
        }
        else if (e92 == 1.75) {
            f92 = media.PlaybackSpeed.SPEED_FORWARD_1_75_X;
        }
        else if (e92 >= 2) {
            f92 = media.PlaybackSpeed.SPEED_FORWARD_2_00_X;
        }
        this.mediaPlayer && this.mediaPlayer.setSpeed(f92);
    }
    setLooping(d92: boolean) {
        this.isLooping = d92;
        if (this.isReadyState()) {
            this.mediaPlayer!.loop = d92;
        }
    }
    private isReadyState() {
        return this.mediaPlayer && (this.mediaPlayer!.state == 'prepared' || this.mediaPlayer!.state == 'playing'
            || this.mediaPlayer!.state == 'paused' || this.mediaPlayer!.state == 'completed');
    }
    async updateContext(a92: AudioContextOhos) {
        this.mediaPlayer && this.mediaPlayer!.state == 'initialized' && a92.setAttributesOnPlayer(this.mediaPlayer);
        if (a92.stayAwake != this.stayAwake) {
            let b92 = getContext(this) as common.UIAbilityContext;
            let c92: window.Window = await window.getLastWindow(b92);
            c92.setWindowKeepScreenOn(a92.stayAwake);
            this.stayAwake = a92.stayAwake;
        }
    }
    async setSource(z91: Source) {
        await this.reset();
        this.mediaPlayer && z91.setForMediaPlayer(this.mediaPlayer);
    }
    async prepare() {
        if (this.canPrepare()) {
            this.needPrepare = false;
            await this.mediaPlayer!.prepare();
        }
        else {
            this.needPrepare = true;
        }
    }
    private canPrepare() {
        return this.mediaPlayer && (this.mediaPlayer!.state == 'stopped' || this.mediaPlayer!.state == 'initialized');
    }
    async reset() {
        this.mediaPlayer && await this.mediaPlayer.reset();
    }
}
