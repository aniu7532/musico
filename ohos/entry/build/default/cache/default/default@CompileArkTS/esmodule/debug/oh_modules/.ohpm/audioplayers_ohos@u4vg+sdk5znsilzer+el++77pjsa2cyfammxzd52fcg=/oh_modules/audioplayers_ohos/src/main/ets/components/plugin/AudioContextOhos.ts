import type media from "@ohos:multimedia.media";
import type audio from "@ohos:multimedia.audio";
export default class AudioContextOhos {
    rendererFlags: number = 0;
    usageType: number = 1;
    isSpeakerphoneOn: boolean = true;
    audioScene: number = 0;
    stayAwake: boolean = false;
    copy(): AudioContextOhos {
        let context = new AudioContextOhos();
        context.rendererFlags = this.rendererFlags;
        context.usageType = this.usageType;
        context.isSpeakerphoneOn = this.isSpeakerphoneOn;
        context.audioScene = this.audioScene;
        context.stayAwake = this.stayAwake;
        return context;
    }
    setAttributesOnPlayer(mediaPlayer: media.AVPlayer) {
        mediaPlayer.audioRendererInfo = {
            content: 2,
            usage: this.usageType, rendererFlags: this.rendererFlags
        };
    }
    buildAttributes(): audio.AudioRendererInfo {
        return {
            content: 2,
            usage: this.usageType,
            rendererFlags: this.rendererFlags
        };
    }
    equals(context: AudioContextOhos) {
        return context.rendererFlags == this.rendererFlags && context.usageType == this.usageType;
    }
}
