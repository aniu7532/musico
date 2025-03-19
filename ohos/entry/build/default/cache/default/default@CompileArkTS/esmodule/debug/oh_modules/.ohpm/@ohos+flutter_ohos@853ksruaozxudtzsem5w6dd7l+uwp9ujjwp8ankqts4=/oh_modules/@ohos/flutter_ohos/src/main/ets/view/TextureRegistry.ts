import type image from "@ohos:multimedia.image";
export interface TextureRegistry {
    createSurfaceTexture(): SurfaceTextureEntry;
    getTextureId(): number;
    registerTexture(textureId: number): SurfaceTextureEntry;
    registerSurfaceTexture(receiver: image.ImageReceiver): SurfaceTextureEntry;
    registerPixelMap(pixelMap: PixelMap): number;
    setTextureBackGroundPixelMap(textureId: number, pixelMap: PixelMap): void;
    setTextureBufferSize(textureId: number, width: number, height: number): void;
    unregisterTexture(textureId: number): void;
    onTrimMemory(level: number): void;
}
export interface SurfaceTextureEntry {
    getTextureId(): number;
    getSurfaceId(): number;
    getImageReceiver(): image.ImageReceiver;
    release(): void;
}
export interface OnFrameConsumedListener {
    onFrameConsumed(): void;
}
export interface OnTrimMemoryListener {
    onTrimMemory(level: number): void;
}
