import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type { MessageHandler, Reply } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import JSONMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMessageCodec";
import type DartExecutor from '../dart/DartExecutor';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
const TAG = "TestChannel";
export default class TestChannel {
    private channel: BasicMessageChannel<String>;
    constructor(dartExecutor: DartExecutor) {
        this.channel = new BasicMessageChannel<String>(dartExecutor, "flutter/test", JSONMessageCodec.INSTANCE);
        let callback = new MessageCallback();
        this.channel.setMessageHandler(callback);
    }
}
class MessageCallback implements MessageHandler<string> {
    onMessage(message: string, reply: Reply<string>) {
        Log.d(TAG, "receive msg = " + message);
        reply.reply("收到消息啦：" + message);
    }
}
