import image from "@ohos:multimedia.image";
import type { BusinessError } from "@ohos:base";
import type { SurfaceTextureEntry, TextureRegistry } from '../../../view/TextureRegistry';
import type FlutterNapi from '../FlutterNapi';
import { SurfaceTextureWrapper } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/renderer/SurfaceTextureWrapper";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
const TAG = "FlutterRenderer";
export class FlutterRenderer implements TextureRegistry {
    private nextTextureId: number = 0;
    private flutterNapi: FlutterNapi;
    constructor(y18: FlutterNapi) {
        this.flutterNapi = y18;
    }
    createSurfaceTexture(): SurfaceTextureEntry {
        let x18: image.ImageReceiver = this.getImageReceiver();
        return this.registerSurfaceTexture(x18);
    }
    getTextureId(): number {
        this.nextTextureId = this.nextTextureId + 1;
        Log.i(TAG, "getTextureId: ", this.nextTextureId);
        return this.nextTextureId;
    }
    registerTexture(u18: number): SurfaceTextureEntry {
        let v18 = new SurfaceTextureRegistryEntry(this.nextTextureId);
        let w18 = this.flutterNapi.registerTexture(u18);
        Log.i(TAG, "registerTexture, surfaceId=" + w18);
        v18.setSurfaceId(w18);
        return v18;
    }
    registerSurfaceTexture(s18: image.ImageReceiver): SurfaceTextureEntry {
        this.nextTextureId = this.nextTextureId + 1;
        let t18 = new SurfaceTextureRegistryEntry(this.nextTextureId);
        t18.setImageReceiver(s18);
        this.registerImage(t18.getTextureId(), t18.textureWrapper());
        return t18;
    }
    registerPixelMap(r18: PixelMap): number {
        this.nextTextureId = this.nextTextureId + 1;
        this.flutterNapi.registerPixelMap(this.nextTextureId, r18);
        return this.nextTextureId;
    }
    setTextureBackGroundPixelMap(p18: number, q18: PixelMap): void {
        this.flutterNapi.setTextureBackGroundPixelMap(p18, q18);
    }
    setTextureBufferSize(m18: number, n18: number, o18: number): void {
        this.flutterNapi.setTextureBufferSize(m18, n18, o18);
    }
    unregisterTexture(l18: number): void {
        this.flutterNapi.unregisterTexture(l18);
    }
    onTrimMemory(k18: number) {
        throw new Error('Method not implemented.');
    }
    private getImageReceiver(): image.ImageReceiver {
        let j18: image.ImageReceiver = image.createImageReceiver(640, 480, 4, 8);
        if (j18 !== undefined) {
            Log.i(TAG, '[camera test] ImageReceiver is ok');
        }
        else {
            Log.i(TAG, '[camera test] ImageReceiver is not ok');
        }
        return j18;
    }
    private registerImage(d18: number, e18: SurfaceTextureWrapper): void {
        let f18 = e18.getImageReceiver();
        f18.on('imageArrival', () => {
            f18.readNextImage((g18: BusinessError, h18: image.Image) => {
                if (g18 || h18 === undefined) {
                    return;
                }
                this.flutterNapi.initNativeImage(d18, h18);
                Log.i(TAG, "[camera test] format: " + h18.format);
                h18.release((i18: BusinessError) => {
                    if (i18 != undefined) {
                        Log.i(TAG, 'Failed to release the image source instance.');
                    }
                    else {
                        Log.i(TAG, 'Succeeded in releasing the image source instance.');
                    }
                });
            });
        });
    }
}
export class SurfaceTextureRegistryEntry implements SurfaceTextureEntry {
    private textureId: number = 0;
    private surfaceId: number = 0;
    private surfaceTextureWrapper: SurfaceTextureWrapper | null = null;
    private released: boolean = false;
    constructor(c18: number) {
        this.textureId = c18;
    }
    getImageReceiver(): image.ImageReceiver {
        return this.surfaceTextureWrapper!.getImageReceiver();
    }
    setImageReceiver(b18: image.ImageReceiver): void {
        this.surfaceTextureWrapper = new SurfaceTextureWrapper(b18);
    }
    getTextureId(): number {
        return this.textureId;
    }
    getSurfaceId(): number {
        return this.surfaceId;
    }
    setSurfaceId(a18: number): void {
        this.surfaceId = a18;
    }
    textureWrapper(): SurfaceTextureWrapper {
        return this.surfaceTextureWrapper!;
    }
    release() {
        throw new Error('Method not implemented.');
    }
}
