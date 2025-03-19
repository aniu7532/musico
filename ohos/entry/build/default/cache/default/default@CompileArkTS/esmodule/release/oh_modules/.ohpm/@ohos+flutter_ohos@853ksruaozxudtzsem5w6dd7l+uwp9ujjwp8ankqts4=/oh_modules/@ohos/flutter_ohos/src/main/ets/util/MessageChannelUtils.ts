import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type { BinaryMessenger } from '../plugin/common/BinaryMessenger';
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
export default class MessageChannelUtils {
    static resizeChannelBuffer(h82: BinaryMessenger, i82: string, j82: number) {
        const k82 = `resize\r${i82}\r${j82}`;
        h82.send(BasicMessageChannel.CHANNEL_BUFFERS_CHANNEL, StringUtils.stringToArrayBuffer(k82));
    }
}
