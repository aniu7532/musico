import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type { BinaryMessenger } from '../../../plugin/common/BinaryMessenger';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import JSONMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMessageCodec";
export default class KeyEventChannel {
    private static TAG = "KeyEventChannel";
    private static CHANNEL_NAME = "flutter/keyevent";
    private channel: BasicMessageChannel<Map<String, Object>>;
    constructor(binaryMessenger: BinaryMessenger) {
        this.channel = new BasicMessageChannel<Map<String, Object>>(binaryMessenger, KeyEventChannel.CHANNEL_NAME, JSONMessageCodec.INSTANCE);
    }
    sendFlutterKeyEvent(keyEvent: FlutterKeyEvent, isKeyUp: boolean, responseHandler: EventResponseHandler): void {
        this.channel.send(this.encodeKeyEvent(keyEvent, isKeyUp), (message: Map<String, Object>) => {
            let isEventHandled = false;
            try {
                if (message != null) {
                    isEventHandled = message.get("handled") as boolean;
                }
            }
            catch (e) {
                Log.e(KeyEventChannel.TAG, "Unable to unpack JSON message: " + e);
            }
            responseHandler.onFrameworkResponse(isEventHandled);
        });
    }
    private encodeKeyEvent(keyEvent: FlutterKeyEvent, isKeyUp: boolean): Map<String, Object> {
        let message: Map<String, Object> = new Map();
        message.set("type", isKeyUp ? "keyup" : "keydown");
        message.set("keymap", "ohos");
        message.set("keyCode", keyEvent.event.keyCode);
        message.set("deviceId", keyEvent.event.deviceId);
        message.set("flags", keyEvent.event.keyText);
        message.set("metaState", keyEvent.event.metaKey);
        message.set("source", keyEvent.event.keySource);
        message.set("intentionCode", keyEvent.event.intentionCode);
        return message;
    }
}
export interface EventResponseHandler {
    onFrameworkResponse: (isEventHandled: boolean) => void;
}
export class FlutterKeyEvent {
    event: KeyEvent;
    constructor(ohosKeyEvent: KeyEvent) {
        this.event = ohosKeyEvent;
    }
}
