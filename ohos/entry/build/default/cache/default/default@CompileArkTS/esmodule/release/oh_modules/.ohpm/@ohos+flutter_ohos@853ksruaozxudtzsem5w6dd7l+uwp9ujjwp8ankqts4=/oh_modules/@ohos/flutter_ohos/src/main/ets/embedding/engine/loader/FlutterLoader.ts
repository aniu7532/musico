import FlutterNapi from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterNapi";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type FlutterApplicationInfo from './FlutterApplicationInfo';
import type common from "@ohos:app.ability.common";
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
import ApplicationInfoLoader from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/loader/ApplicationInfoLoader";
import bundleManager from "@ohos:bundle.bundleManager";
import fs from "@ohos:file.fs";
const TAG = "FlutterLoader";
const DEFAULT_LIBRARY = "libflutter.so";
const DEFAULT_KERNEL_BLOB = "kernel_blob.bin";
const VMSERVICE_SNAPSHOT_LIBRARY = "libvmservice_snapshot.so";
const SNAPSHOT_ASSET_PATH_KEY = "snapshot-asset-path";
const VM_SNAPSHOT_DATA_KEY = "vm-snapshot-data";
const ISOLATE_SNAPSHOT_DATA_KEY = "isolate-snapshot-data";
const AOT_SHARED_LIBRARY_NAME = "aot-shared-library-name";
const AOT_VMSERVICE_SHARED_LIBRARY_NAME = "aot-vmservice-shared-library-name";
const FILE_SEPARATOR = "/";
const TIMESTAMP_PREFIX = "res_timestamp-";
const OH_ICU_DATA_FILE_PATH = "/system/usr/ohos_icu/";
async function prefetchDefaultFontManager(): Promise<void> {
    await new Promise<void>((x15: Function) => {
        FlutterNapi.prefetchDefaultFontManager();
        x15();
    });
}
export default class FlutterLoader {
    flutterNapi: FlutterNapi;
    initResult: InitResult | null = null;
    flutterApplicationInfo: FlutterApplicationInfo | null = null;
    context: common.Context | null = null;
    initialized: boolean = false;
    initStartTimestampMillis: number = 0;
    constructor(w15: FlutterNapi) {
        this.flutterNapi = w15;
    }
    async startInitialization(v15: common.Context) {
        Log.d(TAG, "flutterLoader start init");
        this.initStartTimestampMillis = Date.now();
        this.context = v15;
        this.flutterApplicationInfo = ApplicationInfoLoader.load(v15);
        await prefetchDefaultFontManager();
        if (this.flutterApplicationInfo!.isDebugMode) {
            await this.copyResource(v15);
        }
        this.initResult = new InitResult(`${v15.filesDir}/`, `${v15.cacheDir}/`, `${v15.filesDir}`);
        Log.d(TAG, "flutterLoader end init");
    }
    private async copyResource(k15: common.Context) {
        let l15 = k15.filesDir + FILE_SEPARATOR + this.flutterApplicationInfo!.flutterAssetsDir;
        const m15 = await this.checkTimestamp(l15);
        if (m15 == null) {
            Log.d(TAG, "no need copyResource");
            return;
        }
        if (this.context != null) {
            Log.d(TAG, "start copyResource");
            if (fs.accessSync(l15 + FILE_SEPARATOR + DEFAULT_KERNEL_BLOB)) {
                Log.d(TAG, "hap has changed, start delete previous file");
                fs.rmdirSync(l15);
            }
            if (!fs.accessSync(l15)) {
                fs.mkdirSync(l15);
            }
            let n15 = await this.context.resourceManager.getRawFileContent(this.flutterApplicationInfo!.flutterAssetsDir + "/icudtl.dat");
            let o15 = fs.openSync(l15 + FILE_SEPARATOR + "/icudtl.dat", fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            fs.writeSync(o15.fd, n15.buffer);
            let p15 = await this.context.resourceManager.getRawFileContent(this.flutterApplicationInfo!.flutterAssetsDir + FILE_SEPARATOR + DEFAULT_KERNEL_BLOB);
            let q15 = fs.openSync(l15 + FILE_SEPARATOR + DEFAULT_KERNEL_BLOB, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            fs.writeSync(q15.fd, p15.buffer);
            let r15 = await this.context.resourceManager.getRawFileContent(this.flutterApplicationInfo!.flutterAssetsDir + FILE_SEPARATOR + this.flutterApplicationInfo!.vmSnapshotData);
            let s15 = fs.openSync(l15 + FILE_SEPARATOR + this.flutterApplicationInfo!.vmSnapshotData, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            fs.writeSync(s15.fd, r15.buffer);
            let t15 = await this.context.resourceManager.getRawFileContent(this.flutterApplicationInfo!.flutterAssetsDir + FILE_SEPARATOR + this.flutterApplicationInfo!.isolateSnapshotData);
            let u15 = fs.openSync(l15 + FILE_SEPARATOR + this.flutterApplicationInfo!.isolateSnapshotData, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            fs.writeSync(u15.fd, t15.buffer);
            if (m15 != null) {
                fs.openSync(l15 + FILE_SEPARATOR + m15, fs.OpenMode.READ_ONLY | fs.OpenMode.CREATE);
            }
            Log.d(TAG, "copyResource end");
        }
        else {
            Log.d(TAG, "no copyResource");
        }
    }
    ensureInitializationComplete(d15: Array<string> | null) {
        if (this.initialized) {
            return;
        }
        if (d15 == null) {
            d15 = new Array<string>();
        }
        d15.push("--icu-native-lib-path="
            + this.flutterApplicationInfo!.nativeLibraryDir
            + FILE_SEPARATOR + DEFAULT_LIBRARY);
        let e15: string = "";
        if (this.flutterApplicationInfo!.isDebugMode) {
            Log.d(TAG, "this.initResult!.dataDirPath=" + this.initResult!.dataDirPath);
            const j15 = this.initResult!.dataDirPath + FILE_SEPARATOR + this.flutterApplicationInfo!.flutterAssetsDir;
            e15 = j15 + FILE_SEPARATOR + DEFAULT_KERNEL_BLOB;
            d15.push("--icu-data-file-path=" + j15 + "/icudtl.dat");
            d15.push("--" + SNAPSHOT_ASSET_PATH_KEY + "=" + j15);
            d15.push("--" + VM_SNAPSHOT_DATA_KEY + "=" + this.flutterApplicationInfo!.vmSnapshotData);
            d15.push("--" + ISOLATE_SNAPSHOT_DATA_KEY + "=" + this.flutterApplicationInfo!.isolateSnapshotData);
            d15.push('--enable-checked-mode');
            d15.push('--verbose-logging');
        }
        else {
            d15.push("--" + AOT_SHARED_LIBRARY_NAME + "=" + this.flutterApplicationInfo!.aotSharedLibraryName);
            d15.push("--"
                + AOT_SHARED_LIBRARY_NAME
                + "="
                + this.flutterApplicationInfo!.nativeLibraryDir
                + FILE_SEPARATOR
                + this.flutterApplicationInfo!.aotSharedLibraryName);
            const h15 = fs.accessSync(OH_ICU_DATA_FILE_PATH);
            if (h15) {
                const i15 = fs.listFileSync(OH_ICU_DATA_FILE_PATH);
                if (i15.length == 1) {
                    d15.push("--icu-data-file-path=" + OH_ICU_DATA_FILE_PATH + i15[0]);
                }
                else {
                    Log.e(TAG, "The file in the " + OH_ICU_DATA_FILE_PATH + " directory is not unique");
                }
            }
            else {
                Log.e(TAG, "The file " + OH_ICU_DATA_FILE_PATH + " does not exist");
            }
            if (this.flutterApplicationInfo!.isProfile) {
                d15.push("--" + AOT_VMSERVICE_SHARED_LIBRARY_NAME + "=" + VMSERVICE_SNAPSHOT_LIBRARY);
            }
        }
        d15.push("--cache-dir-path=" + this.initResult!.engineCachesPath);
        if (StringUtils.isNotEmpty(this.flutterApplicationInfo!.domainNetworkPolicy)) {
            d15.push("--domain-network-policy=" + this.flutterApplicationInfo!.domainNetworkPolicy);
        }
        const f15 = 1080 * 1920 * 12 * 4;
        d15.push("--resource-cache-max-bytes-threshold=" + f15);
        d15.push("--prefetched-default-font-manager");
        d15.push("--leak-vm=" + true);
        const g15 = Date.now() - this.initStartTimestampMillis;
        this.flutterNapi.init(this.context!, d15, e15, this.initResult!.appStoragePath, this.initResult!.engineCachesPath!, g15);
        this.initialized = true;
        Log.d(TAG, "ensureInitializationComplete");
    }
    findAppBundlePath(): string {
        return this.flutterApplicationInfo == null ? "" : this.flutterApplicationInfo!.flutterAssetsDir;
    }
    getLookupKeyForAsset(b15: string, c15?: string): string {
        return this.fullAssetPathFrom(b15);
    }
    fullAssetPathFrom(a15: string): string {
        return this.flutterApplicationInfo == null ? "" : this.flutterApplicationInfo!.flutterAssetsDir + "/" + a15;
    }
    private async checkTimestamp(w14: string): Promise<string | null> {
        let x14 = await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_DEFAULT);
        const y14 = TIMESTAMP_PREFIX + x14.versionCode + "-" + x14.updateTime;
        const z14 = this.getExistingTimestamps(w14);
        if (z14 == null) {
            Log.i(TAG, "No extracted resources found");
            return y14;
        }
        if (z14.length == 1) {
            Log.i(TAG, "Found extracted resources " + z14[0]);
        }
        if (z14.length != 1 || !(y14 == z14[0])) {
            Log.i(TAG, "Resource version mismatch " + y14);
            return y14;
        }
        return null;
    }
    private getExistingTimestamps(v14: string): string[] {
        return fs.accessSync(v14) ? fs.listFileSync(v14, {
            filter: {
                displayName: [`${TIMESTAMP_PREFIX}*`]
            }
        }) : new Array();
    }
    isInitialized(): boolean {
        return this.initialized;
    }
}
class InitResult {
    appStoragePath: string;
    engineCachesPath: string;
    dataDirPath: string;
    constructor(s14: string, t14: string, u14: string) {
        this.appStoragePath = s14;
        this.engineCachesPath = t14;
        this.dataDirPath = u14;
    }
}
