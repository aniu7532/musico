import FlutterNapi from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterNapi";
export class FlutterCallbackInformation {
    callbackName?: string;
    callbackClassName?: string;
    callbackLibraryPath?: string;
    static lookupCallbackInformation(w86: number): FlutterCallbackInformation | null {
        return FlutterNapi.nativeLookupCallbackInformation(w86);
    }
    constructor(t86?: string, u86?: string, v86?: string) {
        this.callbackName = t86;
        this.callbackClassName = u86;
        this.callbackLibraryPath = v86;
    }
    init(q86: string, r86: string, s86: string) {
        this.callbackName = q86;
        this.callbackClassName = r86;
        this.callbackLibraryPath = s86;
    }
}
