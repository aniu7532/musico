import type { FlutterPlugin, FlutterPluginBinding } from '@ohos/flutter_ohos/src/main/ets/embedding/engine/plugins/FlutterPlugin';
import MethodChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type { MethodResult } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type { EventSink, StreamHandler } from '@ohos/flutter_ohos/src/main/ets/plugin/common/EventChannel';
import type MethodCall from '@ohos/flutter_ohos/src/main/ets/plugin/common/MethodCall';
import { EventChannel, Log } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/index";
import type { AbilityAware, AbilityPluginBinding, BinaryMessenger } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/index";
import HashMap from "@ohos:util.HashMap";
import AudioContextOhos from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/AudioContextOhos";
import { SoundPoolManager } from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/player/SoundPoolPlayer";
import WrappedPlayer from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/player/WrappedPlayer";
import audio from "@ohos:multimedia.audio";
import UrlSource from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/source/UrlSource";
import BytesSource from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/source/BytesSource";
import { parseReleaseMode } from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/ReleaseMode";
import { parsePlayerMode } from "@package:pkg_modules/.ohpm/audioplayers_ohos@u4vg+sdk5znsilzer+el++77pjsa2cyfammxzd52fcg=/pkg_modules/audioplayers_ohos/src/main/ets/components/plugin/PlayerMode";
import wantAgent from "@ohos:app.ability.wantAgent";
import type { WantAgent } from "@ohos:app.ability.wantAgent";
import backgroundTaskManager from "@ohos:resourceschedule.backgroundTaskManager";
import type { BusinessError } from "@ohos:base";
import AVSessionManager from "@ohos:multimedia.avsession";
const TAG = "AudioplayersPlugin";
export default class AudioplayersPlugin implements FlutterPlugin, AbilityAware, IUpdateCallback {
    private methods?: MethodChannel = undefined;
    private globalMethods?: MethodChannel = undefined;
    private globalEvents?: EventHandler = undefined;
    private context?: Context = undefined;
    private binaryMessenger?: BinaryMessenger = undefined;
    private soundPoolManager?: SoundPoolManager = undefined;
    private players = new HashMap<string, WrappedPlayer>();
    private defaultAudioContext = new AudioContextOhos();
    private updateInterval: number | null = null;
    private abilityBinding?: AbilityPluginBinding = undefined;
    private session?: AVSessionManager.AVSession = undefined;
    private isStartContinuousTask = false;
    getUniqueClassName(): string {
        return "AudioplayersPlugin";
    }
    onAttachedToEngine(s91: FlutterPluginBinding): void {
        this.context = s91.getApplicationContext();
        this.binaryMessenger = s91.getBinaryMessenger();
        this.soundPoolManager = new SoundPoolManager(this);
        this.methods = new MethodChannel(s91.getBinaryMessenger(), "xyz.luan/audioplayers");
        this.methods.setMethodCallHandler({
            onMethodCall: (v91: MethodCall, w91: MethodResult) => {
                this.methodCall(v91, w91);
            }
        });
        this.globalMethods = new MethodChannel(s91.getBinaryMessenger(), "xyz.luan/audioplayers.global");
        this.globalMethods.setMethodCallHandler({
            onMethodCall: (t91: MethodCall, u91: MethodResult) => {
                this.globalMethodCall(t91, u91);
            }
        });
        this.globalEvents = new EventHandler(new EventChannel(s91.getBinaryMessenger(), "xyz.luan/audioplayers.global/events"));
    }
    onDetachedFromEngine(p91: FlutterPluginBinding): void {
        this.stopUpdates();
        this.players.forEach((q91: WrappedPlayer, r91: string) => q91.dispose());
        this.players.clear();
        this.soundPoolManager?.dispose();
        this.globalEvents?.dispose();
        this.stopUpdates();
    }
    private globalMethodCall(l91: MethodCall, m91: MethodResult): void {
        switch (l91.method) {
            case "setAudioContext":
                this.defaultAudioContext = this.getAudioContext(l91);
                break;
            case "emitLog":
                let n91 = this.getObjectValue(l91, "message", "message is required") as string;
                this.handleGlobalLog(n91);
                break;
            case "emitError":
                let o91 = this.getObjectValue(l91, "code", "code is required") as string;
                n91 = this.getObjectValue(l91, "message", "message is required") as string;
                this.handleGlobalError(o91, n91, null);
                break;
            default:
                m91.notImplemented();
                break;
        }
    }
    private async methodCall(r90: MethodCall, s90: MethodResult) {
        let t90 = r90.argument("playerId") as string;
        if (t90 == null || t90 == undefined) {
            s90.success(1);
            return;
        }
        try {
            if (r90.method == "create") {
                let k91 = new EventHandler(new EventChannel(this.binaryMessenger!, `xyz.luan/audioplayers/events/${t90}`));
                this.players.set(t90, new WrappedPlayer(this, k91, this.defaultAudioContext.copy(), this.soundPoolManager!));
                s90.success(1);
                return;
            }
            let v90 = this.getPlayer(t90);
            if (v90 == null) {
                s90.error("OhosAudioError", "not find player", Error("not find player"));
                return;
            }
            switch (r90.method) {
                case "setSourceUrl":
                    let w90 = this.getObjectValue(r90, "url", "url is required") as string;
                    let x90 = r90.hasArgument("isLocal") ? (r90.argument("isLocal") as boolean) : false;
                    await v90!.setSource(new UrlSource(w90, x90));
                    break;
                case "setSourceBytes":
                    let y90 = this.getObjectValue(r90, "bytes", "bytes are required") as ArrayBuffer;
                    v90.setSource(new BytesSource(y90));
                    break;
                case "resume":
                    v90.play();
                    break;
                case "pause":
                    v90.pause();
                    break;
                case "stop":
                    v90.stop();
                    break;
                case "release":
                    v90.release();
                    break;
                case "seek":
                    let z90 = this.getObjectValue(r90, "position", "position is required") as number;
                    v90.seek(z90);
                    break;
                case "setVolume":
                    let a91 = this.getObjectValue(r90, "volume", "volume is required") as number;
                    v90.setVolume(a91);
                    break;
                case "setBalance":
                    let b91 = this.getObjectValue(r90, "balance", "balance is required") as number;
                    v90.setBalance(b91);
                    break;
                case "setPlaybackRate":
                    let c91 = this.getObjectValue(r90, "playbackRate", "playbackRate is required") as number;
                    v90.setRate(c91);
                    break;
                case "getDuration":
                    let d91 = v90.getDuration();
                    s90.success(d91 ? d91 : 0);
                    return;
                case "getCurrentPosition":
                    let e91 = v90.getCurrentPosition();
                    s90.success(e91 ? e91 : 0);
                    return;
                case "setReleaseMode":
                    let f91 = this.getObjectValue(r90, "releaseMode", "releaseMode is required") as string;
                    v90.setReleaseMode(parseReleaseMode(f91));
                    break;
                case "setPlayerMode":
                    let g91 = this.getObjectValue(r90, "playerMode", "playerMode is required") as string;
                    v90.setPlayerMode(parsePlayerMode(g91));
                    break;
                case "setAudioContext":
                    let h91 = this.getAudioContext(r90);
                    v90.updateAudioContext(h91);
                    break;
                case "emitLog":
                    let i91 = this.getObjectValue(r90, "message", "message is required") as string;
                    v90.handleLog(i91);
                    break;
                case "emitError":
                    let j91 = this.getObjectValue(r90, "code", "code is required") as string;
                    i91 = this.getObjectValue(r90, "message", "message is required") as string;
                    v90.handleError(j91, i91, null);
                    break;
                case "dispose":
                    v90.dispose();
                    this.players.remove(t90);
                    break;
                default:
                    s90.notImplemented();
                    return;
            }
            s90.success(1);
        }
        catch (u90) {
            s90.error("OhosAudioError", u90.message, u90);
        }
    }
    private getPlayer(q90: string): WrappedPlayer | null {
        if (this.players.hasKey(q90)) {
            return this.players.get(q90);
        }
        this.error("Player has not yet been created or has already been disposed.");
        return null;
    }
    getApplicationContext(): Context {
        return this.context!;
    }
    getAudioManager(): audio.AudioManager {
        return audio.getAudioManager();
    }
    handleIsPlaying() {
        this.startUpdates();
    }
    handleDuration(n90: WrappedPlayer) {
        let o90 = new Map<string, number>();
        let p90 = n90.getDuration();
        o90.set("value", p90 ? p90 : 0);
        n90.eventHandler.success("audio.onDuration", o90);
    }
    handleComplete(m90: WrappedPlayer) {
        m90.eventHandler.success("audio.onComplete");
    }
    handlePrepared(j90: WrappedPlayer, k90: boolean) {
        let l90 = new Map<string, boolean>();
        l90.set("value", k90);
        j90.eventHandler.success("audio.onPrepared", l90);
    }
    handleLog(g90: WrappedPlayer, h90: string) {
        let i90 = new Map<string, string>();
        i90.set("value", h90);
        g90.eventHandler.success("audio.onLog", i90);
    }
    handleGlobalLog(e90: string) {
        let f90 = new Map<string, string>();
        f90.set("value", e90);
        this.globalEvents!.success("audio.onLog", f90);
    }
    handleError(a90: WrappedPlayer, b90?: string, c90?: string, d90?: any) {
        a90.eventHandler.error(b90, c90, d90);
    }
    handleGlobalError(x89?: string, y89?: string, z89?: any) {
        this.globalEvents!.error(x89, y89, z89);
    }
    handleSeekComplete(u89: WrappedPlayer) {
        let v89 = new Map<string, number>();
        let w89 = u89.getCurrentPosition();
        v89.set("value", w89 ? w89 : 0);
        u89.eventHandler.success("audio.onSeekComplete");
        u89.eventHandler.success("audio.onCurrentPosition", v89);
    }
    startUpdates() {
        this.stopUpdates();
        this.updateInterval = setInterval(() => {
            this.updateCallback();
        }, 200);
    }
    stopUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
    private updateCallback() {
        let n89 = this.players;
        let o89 = this.methods;
        if (n89 == null || o89 == null) {
            this.stopUpdates();
            return;
        }
        let p89 = false;
        n89.forEach((q89: WrappedPlayer, r89: string) => {
            if (q89.isActuallyPlaying()) {
                p89 = true;
                let s89 = q89.getCurrentPosition();
                let t89 = new Map<string, number>();
                t89.set("value", s89 ? s89 : 0);
                q89.eventHandler.success("audio.onCurrentPosition", t89);
            }
        });
        if (!p89) {
            this.stopUpdates();
        }
    }
    private getAudioContext(l89: MethodCall): AudioContextOhos {
        let m89 = new AudioContextOhos();
        m89.isSpeakerphoneOn = this.getObjectValue(l89, "isSpeakerphoneOn", "isSpeakerphoneOn is required") as boolean;
        m89.rendererFlags = this.getObjectValue(l89, "rendererFlags", "rendererFlags is required") as number;
        m89.usageType = this.getObjectValue(l89, "usageType", "usageType is required") as number;
        m89.audioScene = this.getObjectValue(l89, "audioScene", "audioScene is required") as number;
        m89.stayAwake = this.getObjectValue(l89, "stayAwake", "stayAwake is required") as boolean;
        return m89;
    }
    private getObjectValue(i89: MethodCall, j89: string, k89: string): any {
        if (i89.hasArgument(j89)) {
            return i89.argument(j89);
        }
        this.error(k89);
    }
    private error(h89: string) {
        throw new Error(h89);
    }
    onAttachedToAbility(g89: AbilityPluginBinding): void {
        this.abilityBinding = g89;
    }
    onDetachedFromAbility(): void {
        this.abilityBinding = undefined;
        this.stopContinuousTask();
    }
    async startContinuousTask() {
        Log.d(TAG, `startContinuousTask`);
        if (this.isStartContinuousTask) {
            return;
        }
        this.isStartContinuousTask = true;
        let b89 = this.abilityBinding!.getAbility().context;
        let c89: AVSessionManager.AVSessionType = 'audio';
        this.session = await AVSessionManager.createAVSession(b89, 'audioplayers', c89);
        await this.session?.activate();
        Log.d(TAG, `session create done : sessionId : ${this.session?.sessionId}`);
        let d89: wantAgent.WantAgentInfo = {
            wants: [
                {
                    bundleName: b89?.abilityInfo.bundleName,
                    abilityName: b89?.abilityInfo.name
                }
            ],
            actionType: wantAgent.OperationType.START_ABILITY,
            requestCode: 0,
            wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
        };
        wantAgent.getWantAgent(d89).then((e89: WantAgent) => {
            backgroundTaskManager.startBackgroundRunning(b89, backgroundTaskManager.BackgroundMode.AUDIO_PLAYBACK, e89).then(() => {
                Log.d(TAG, `Succeeded in operationing startBackgroundRunning.`);
            }).catch((f89: BusinessError) => {
                Log.e(TAG, `Failed to operation startBackgroundRunning. Code is ${f89.code}, message is ${f89.message}`);
            });
        });
    }
    async stopContinuousTask() {
        Log.d(TAG, `stopContinuousTask`);
        if (!this.isStartContinuousTask) {
            return;
        }
        this.isStartContinuousTask = false;
        await this.session?.deactivate();
        await this.session?.destroy();
        backgroundTaskManager.stopBackgroundRunning(this.abilityBinding?.getAbility().context).then(() => {
            Log.d(TAG, `Succeeded in operationing stopBackgroundRunning.`);
        }).catch((a89: BusinessError) => {
            Log.e(TAG, `Failed to operation stopBackgroundRunning. Code is ${a89.code}, message is ${a89.message}`);
        });
    }
}
export class EventHandler implements StreamHandler {
    private eventChannel?: EventChannel = undefined;
    private eventSink: EventSink | null = null;
    constructor(z88: EventChannel) {
        this.eventChannel = z88;
        this.eventChannel.setStreamHandler(this);
    }
    onListen(x88: any, y88: EventSink): void {
        this.eventSink = y88;
    }
    onCancel(w88: any): void {
        this.eventSink = null;
    }
    success(u88: string, v88: Map<string, any> = new Map<string, any>()) {
        v88.set("event", u88);
        this.eventSink?.success(v88);
    }
    error(r88?: string, s88?: string, t88?: any) {
        this.eventSink?.error(r88, s88, t88);
    }
    dispose() {
        if (this.eventSink) {
            this.eventSink.endOfStream();
            this.onCancel(null);
        }
        this.eventChannel?.setStreamHandler(null);
    }
}
interface IUpdateCallback {
    stopUpdates(): void;
    startUpdates(): void;
}
