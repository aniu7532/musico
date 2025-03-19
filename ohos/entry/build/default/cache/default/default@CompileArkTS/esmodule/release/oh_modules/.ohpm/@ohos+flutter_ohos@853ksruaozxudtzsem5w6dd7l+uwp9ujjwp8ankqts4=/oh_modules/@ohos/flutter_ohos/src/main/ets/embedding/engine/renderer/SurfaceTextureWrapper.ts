import type image from "@ohos:multimedia.image";
export class SurfaceTextureWrapper {
    private receiver: image.ImageReceiver;
    private released: boolean = false;
    private attached: boolean = false;
    constructor(z18: image.ImageReceiver) {
        this.receiver = z18;
    }
    getImageReceiver(): image.ImageReceiver {
        return this.receiver;
    }
}
