import type media from "@ohos:multimedia.media";
import type audio from "@ohos:multimedia.audio";
export default class AudioContextOhos {
    rendererFlags: number = 0;
    usageType: number = 1;
    isSpeakerphoneOn: boolean = true;
    audioScene: number = 0;
    stayAwake: boolean = false;
    copy(): AudioContextOhos {
        let q88 = new AudioContextOhos();
        q88.rendererFlags = this.rendererFlags;
        q88.usageType = this.usageType;
        q88.isSpeakerphoneOn = this.isSpeakerphoneOn;
        q88.audioScene = this.audioScene;
        q88.stayAwake = this.stayAwake;
        return q88;
    }
    setAttributesOnPlayer(p88: media.AVPlayer) {
        p88.audioRendererInfo = {
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
    equals(o88: AudioContextOhos) {
        return o88.rendererFlags == this.rendererFlags && o88.usageType == this.usageType;
    }
}
