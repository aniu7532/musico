import type common from "@ohos:app.ability.common";
import type { BinaryMessenger } from '../../../plugin/common/BinaryMessenger';
import type PlatformViewFactory from '../../../plugin/platform/PlatformViewFactory';
import type PlatformViewRegistry from '../../../plugin/platform/PlatformViewRegistry';
import type { TextureRegistry } from '../../../view/TextureRegistry';
import type FlutterEngine from '../FlutterEngine';
export interface FlutterPlugin {
    getUniqueClassName(): string;
    onAttachedToEngine(binding: FlutterPluginBinding): void;
    onDetachedFromEngine(binding: FlutterPluginBinding): void;
}
export class FlutterPluginBinding {
    private applicationContext: common.Context;
    private flutterEngine: FlutterEngine;
    private binaryMessenger: BinaryMessenger;
    private flutterAssets: FlutterAssets;
    private textureRegistry: TextureRegistry;
    private platformViewRegistry: PlatformViewRegistry;
    constructor(u17: common.Context, v17: FlutterEngine, w17: BinaryMessenger, x17: FlutterAssets, y17: TextureRegistry, z17?: PlatformViewRegistry) {
        this.applicationContext = u17;
        this.flutterEngine = v17;
        this.binaryMessenger = w17;
        this.flutterAssets = x17;
        this.textureRegistry = y17;
        this.platformViewRegistry = z17 ?? new EmptyPlatformViewRegistry();
    }
    getApplicationContext(): common.Context {
        return this.applicationContext;
    }
    getFlutterEngine(): FlutterEngine {
        return this.flutterEngine;
    }
    getBinaryMessenger(): BinaryMessenger {
        return this.binaryMessenger;
    }
    getFlutterAssets(): FlutterAssets {
        return this.flutterAssets;
    }
    getTextureRegistry(): TextureRegistry {
        return this.textureRegistry;
    }
    public getPlatformViewRegistry(): PlatformViewRegistry {
        return this.platformViewRegistry;
    }
}
export interface FlutterAssets {
    getAssetFilePathByName(assetFileName: string): string;
    getAssetFilePathByName(assetFileName: string, bundleName: string): string;
    getAssetFilePathBySubpath(assetSubpath: string): string;
    getAssetFilePathBySubpath(assetSubpath: string, bundleName: string): string;
}
class EmptyPlatformViewRegistry implements PlatformViewRegistry {
    registerViewFactory(s17: string, t17: PlatformViewFactory): boolean {
        return false;
    }
}
