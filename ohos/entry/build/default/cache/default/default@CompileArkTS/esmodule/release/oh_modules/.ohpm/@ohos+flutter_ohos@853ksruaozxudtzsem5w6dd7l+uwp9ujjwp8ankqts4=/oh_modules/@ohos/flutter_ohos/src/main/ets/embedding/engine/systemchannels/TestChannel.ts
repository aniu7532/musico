import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type { MessageHandler, Reply } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import JSONMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMessageCodec";
import type DartExecutor from '../dart/DartExecutor';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
const TAG = "TestChannel";
export default class TestChannel {
    private channel: BasicMessageChannel<String>;
    constructor(a29: DartExecutor) {
        this.channel = new BasicMessageChannel<String>(a29, "flutter/test", JSONMessageCodec.INSTANCE);
        let b29 = new MessageCallback();
        this.channel.setMessageHandler(b29);
    }
}
class MessageCallback implements MessageHandler<string> {
    onMessage(y28: string, z28: Reply<string>) {
        Log.d(TAG, "receive msg = " + y28);
        z28.reply("收到消息啦：" + y28);
    }
}
