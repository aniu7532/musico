import BuildProfile from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/BuildProfile";
const DEFAULT_AOT_SHARED_LIBRARY_NAME = "libapp.so";
const DEFAULT_VM_SNAPSHOT_DATA = "vm_snapshot_data";
const DEFAULT_ISOLATE_SNAPSHOT_DATA = "isolate_snapshot_data";
const DEFAULT_FLUTTER_ASSETS_DIR = "flutter_assets";
export default class FlutterApplicationInfo {
    aotSharedLibraryName: string;
    vmSnapshotData: string;
    isolateSnapshotData: string;
    flutterAssetsDir: string;
    domainNetworkPolicy: string;
    nativeLibraryDir: string;
    automaticallyRegisterPlugins: boolean;
    isDebugMode: boolean;
    isProfile: boolean;
    constructor(l14: string | null, m14: string | null, n14: string | null, o14: string | null, p14: string | null, q14: string, r14: boolean) {
        this.aotSharedLibraryName = l14 == null ? DEFAULT_AOT_SHARED_LIBRARY_NAME : l14;
        this.vmSnapshotData = m14 == null ? DEFAULT_VM_SNAPSHOT_DATA : m14;
        this.isolateSnapshotData = n14 == null ? DEFAULT_ISOLATE_SNAPSHOT_DATA : n14;
        this.flutterAssetsDir = o14 == null ? DEFAULT_FLUTTER_ASSETS_DIR : o14;
        this.domainNetworkPolicy = p14 == null ? "" : p14;
        this.nativeLibraryDir = q14;
        this.automaticallyRegisterPlugins = r14;
        this.isDebugMode = "debug" == String(BuildProfile.BUILD_MODE_NAME);
        this.isProfile = "profile" == String(BuildProfile.BUILD_MODE_NAME);
    }
}
