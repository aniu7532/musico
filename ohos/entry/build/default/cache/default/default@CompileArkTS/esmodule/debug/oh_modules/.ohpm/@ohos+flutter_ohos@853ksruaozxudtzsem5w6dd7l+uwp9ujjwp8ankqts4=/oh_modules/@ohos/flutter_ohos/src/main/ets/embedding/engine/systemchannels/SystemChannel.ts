import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type Any from '../../../plugin/common/Any';
import JSONMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMessageCodec";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
const TAG: string = "SystemChannel";
/**
 * fill in javadoc for SystemChannel.
 */
export default class SystemChannel {
    public channel: BasicMessageChannel<object>;
    constructor(dartExecutor: DartExecutor) {
        this.channel = new BasicMessageChannel<Any>(dartExecutor, "flutter/system", JSONMessageCodec.INSTANCE);
    }
    public sendMemoryPressureWarning(): void {
        Log.i(TAG, "Sending memory pressure warning to Flutter");
        let message: Map<string, string> = new Map().set("type", "memoryPressure");
        this.channel.send(message);
    }
}
