import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type Any from '../../../plugin/common/Any';
import JSONMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMessageCodec";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
const TAG: string = "SystemChannel";
export default class SystemChannel {
    public channel: BasicMessageChannel<object>;
    constructor(x28: DartExecutor) {
        this.channel = new BasicMessageChannel<Any>(x28, "flutter/system", JSONMessageCodec.INSTANCE);
    }
    public sendMemoryPressureWarning(): void {
        Log.i(TAG, "Sending memory pressure warning to Flutter");
        let w28: Map<string, string> = new Map().set("type", "memoryPressure");
        this.channel.send(w28);
    }
}
