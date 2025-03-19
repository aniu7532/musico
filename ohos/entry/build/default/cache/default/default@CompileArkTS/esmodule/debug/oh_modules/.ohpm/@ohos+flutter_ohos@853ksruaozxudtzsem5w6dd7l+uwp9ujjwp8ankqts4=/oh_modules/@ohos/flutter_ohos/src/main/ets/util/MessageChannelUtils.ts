import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type { BinaryMessenger } from '../plugin/common/BinaryMessenger';
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
export default class MessageChannelUtils {
    static resizeChannelBuffer(messenger: BinaryMessenger, channel: string, newSize: number) {
        const dataStr = `resize\r${channel}\r${newSize}`;
        messenger.send(BasicMessageChannel.CHANNEL_BUFFERS_CHANNEL, StringUtils.stringToArrayBuffer(dataStr));
    }
}
