import type common from "@ohos:app.ability.common";
import type AbilityAware from '@ohos/flutter_ohos/src/main/ets/embedding/engine/plugins/ability/AbilityAware';
import type { AbilityPluginBinding } from '@ohos/flutter_ohos/src/main/ets/embedding/engine/plugins/ability/AbilityPluginBinding';
import type { FlutterPlugin, FlutterPluginBinding } from '@ohos/flutter_ohos/src/main/ets/embedding/engine/plugins/FlutterPlugin';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import PathUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/PathUtils";
import type { BinaryMessenger } from '@ohos/flutter_ohos/src/main/ets/plugin/common/BinaryMessenger';
import { PathProviderApi, StorageDirectory } from "@package:pkg_modules/.ohpm/path_provider_ohos@2tfoif7r9m9lvtbyv3j7hzyr7wmahpiqbwu9dwlcftu=/pkg_modules/path_provider_ohos/src/main/ets/io/flutter/plugins/pathprovider/Messages";
import fs from "@ohos:file.fs";
const TAG: string = "PathProviderPlugin";
export default class PathProviderPlugin extends PathProviderApi implements FlutterPlugin, AbilityAware {
    private pluginBinding: FlutterPluginBinding | null = null;
    private context: common.Context | null = null;
    constructor(p99?: common.Context) {
        super();
        if (p99) {
            this.context = p99;
        }
    }
    getUniqueClassName(): string {
        return TAG;
    }
    onAttachedToEngine(o99: FlutterPluginBinding): void {
        this.pluginBinding = o99;
        if (this.pluginBinding) {
            this.setup(this.pluginBinding.getBinaryMessenger(), this.pluginBinding.getApplicationContext());
        }
    }
    onDetachedFromEngine(n99: FlutterPluginBinding): void {
        this.pluginBinding = null;
    }
    onAttachedToAbility(m99: AbilityPluginBinding): void {
        Log.i(TAG, "onAttachedToAbility");
    }
    onDetachedFromAbility(): void {
    }
    static registerWith(): void {
    }
    setup(j99: BinaryMessenger, k99: common.Context) {
        try {
            PathProviderApi.setup(j99, this);
        }
        catch (l99) {
            Log.e(TAG, "Received exception while setting up PathProviderPlugin", l99);
        }
        this.context = k99;
    }
    getTemporaryPath(): string {
        return this.getPathProviderTemporaryDirectory();
    }
    getApplicationSupportPath(): string {
        return this.getApplicationSupportDirectory();
    }
    getApplicationDocumentsPath(): string {
        return this.getPathProviderApplicationDocumentsDirectory();
    }
    getApplicationCachePath(): string {
        if (this.context) {
            return this.context.cacheDir;
        }
        return "";
    }
    getExternalStoragePath(): string {
        return this.getPathProviderStorageDirectory();
    }
    getExternalCachePaths(): Array<string> {
        return this.getPathProviderExternalCacheDirectories();
    }
    getExternalStoragePaths(i99: StorageDirectory): Array<string> {
        return this.getPathProviderExternalStorageDirectories(i99);
    }
    private getPathProviderTemporaryDirectory(): string {
        if (this.context) {
            return this.context.cacheDir;
        }
        return "";
    }
    private getApplicationSupportDirectory(): string {
        return PathUtils.getFilesDir(this.context);
    }
    private getPathProviderApplicationDocumentsDirectory(): string {
        return PathUtils.getDataDirectory(this.context) ?? "";
    }
    private getPathProviderStorageDirectory(): string {
        if (this.context) {
            return this.context.filesDir;
        }
        return "";
    }
    private getPathProviderExternalCacheDirectories(): Array<string> {
        const h99 = new Array<string>();
        if (this.context) {
            h99.push(this.context.cacheDir);
        }
        return h99;
    }
    private getStorageDirectoryString(g99: StorageDirectory): string {
        switch (g99) {
            case StorageDirectory.ROOT:
                return "";
            case StorageDirectory.MUSIC:
                return "music";
            case StorageDirectory.PODCASTS:
                return "podcasts";
            case StorageDirectory.RINGTONES:
                return "ringtones";
            case StorageDirectory.ALARMS:
                return "alarms";
            case StorageDirectory.NOTIFICATIONS:
                return "notifications";
            case StorageDirectory.PICTURES:
                return "pictures";
            case StorageDirectory.MOVIES:
                return "movies";
            case StorageDirectory.DOWNLOADS:
                return "downloads";
            case StorageDirectory.DCIM:
                return "dcim";
            case StorageDirectory.DOCUMENTS:
                return "documents";
            default:
                throw new Error("Unrecognized directory: " + g99);
        }
    }
    private getPathProviderExternalStorageDirectories(c99: StorageDirectory): Array<string> {
        const d99 = new Array<string>();
        if (!this.context) {
            return d99;
        }
        const e99 = this.context.filesDir + "/" + this.getStorageDirectoryString(c99);
        if (!fs.accessSync(e99)) {
            try {
                fs.mkdirSync(e99);
                d99.push(e99);
                Log.i(TAG, "no directory " + e99 + " create success");
            }
            catch (f99) {
                Log.e(TAG, "mkdirSync failed err:" + f99);
            }
        }
        else {
            d99.push(e99);
        }
        return d99;
    }
}
