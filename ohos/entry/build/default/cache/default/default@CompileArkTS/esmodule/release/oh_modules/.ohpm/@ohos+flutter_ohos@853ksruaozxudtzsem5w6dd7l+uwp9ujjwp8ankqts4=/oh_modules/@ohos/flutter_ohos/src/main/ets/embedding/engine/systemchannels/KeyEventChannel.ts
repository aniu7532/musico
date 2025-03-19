import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type { BinaryMessenger } from '../../../plugin/common/BinaryMessenger';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import JSONMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMessageCodec";
export default class KeyEventChannel {
    private static TAG = "KeyEventChannel";
    private static CHANNEL_NAME = "flutter/keyevent";
    private channel: BasicMessageChannel<Map<String, Object>>;
    constructor(n20: BinaryMessenger) {
        this.channel = new BasicMessageChannel<Map<String, Object>>(n20, KeyEventChannel.CHANNEL_NAME, JSONMessageCodec.INSTANCE);
    }
    sendFlutterKeyEvent(h20: FlutterKeyEvent, i20: boolean, j20: EventResponseHandler): void {
        this.channel.send(this.encodeKeyEvent(h20, i20), (k20: Map<String, Object>) => {
            let l20 = false;
            try {
                if (k20 != null) {
                    l20 = k20.get("handled") as boolean;
                }
            }
            catch (m20) {
                Log.e(KeyEventChannel.TAG, "Unable to unpack JSON message: " + m20);
            }
            j20.onFrameworkResponse(l20);
        });
    }
    private encodeKeyEvent(e20: FlutterKeyEvent, f20: boolean): Map<String, Object> {
        let g20: Map<String, Object> = new Map();
        g20.set("type", f20 ? "keyup" : "keydown");
        g20.set("keymap", "ohos");
        g20.set("keyCode", e20.event.keyCode);
        g20.set("deviceId", e20.event.deviceId);
        g20.set("flags", e20.event.keyText);
        g20.set("metaState", e20.event.metaKey);
        g20.set("source", e20.event.keySource);
        g20.set("intentionCode", e20.event.intentionCode);
        return g20;
    }
}
export interface EventResponseHandler {
    onFrameworkResponse: (isEventHandled: boolean) => void;
}
export class FlutterKeyEvent {
    event: KeyEvent;
    constructor(d20: KeyEvent) {
        this.event = d20;
    }
}
