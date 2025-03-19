import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type { MessageHandler, Reply } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type HashMap from "@ohos:util.HashMap";
import type FlutterNapi from '../FlutterNapi';
import type { AccessibilityDelegate } from '../FlutterNapi';
import type { Action } from '../../../view/AccessibilityBridge';
import StandardMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StandardMessageCodec";
import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
import type Any from '../../../plugin/common/Any';
import flutter from "@app:com.example.beat/entry/flutter";
import type { ByteBuffer } from '../../../util/ByteBuffer';
export default class AccessibilityChannel implements MessageHandler<object> {
    private static TAG = "AccessibilityChannel";
    private static CHANNEL_NAME = "flutter/accessibility";
    private channel: BasicMessageChannel<object>;
    private flutterNapi: FlutterNapi;
    private handler: AccessibilityMessageHandler = new DefaultHandler();
    private nextReplyId: number = 1;
    onMessage(u19: object, v19: Reply<object>): void {
        if (this.handler == null) {
            Log.i(AccessibilityChannel.TAG, "handler = NULL");
            v19.reply(StringUtils.stringToArrayBuffer(""));
            return;
        }
        let w19: HashMap<string, Any> = u19 as HashMap<string, Any>;
        let x19: string = w19.get("type") as string;
        let y19: HashMap<string, Any> = w19.get("data") as HashMap<string, Any>;
        Log.i(AccessibilityChannel.TAG, "Received " + x19 + " message.");
        switch (x19) {
            case "announce": {
                Log.i(AccessibilityChannel.TAG, "Announce");
                let c20: string = y19.get("message");
                if (c20 != null) {
                    Log.i(AccessibilityChannel.TAG, "message is " + c20);
                    this.handler.announce(c20);
                }
                break;
            }
            case "tap": {
                Log.i(AccessibilityChannel.TAG, "Tag");
                let b20: number = w19.get("nodeId");
                if (b20 != null) {
                    this.handler.onTap(b20);
                }
                break;
            }
            case "longPress": {
                Log.i(AccessibilityChannel.TAG, "LongPress");
                let a20: number = w19.get("nodeId");
                if (a20 != null) {
                    this.handler.onLongPress(a20);
                }
                break;
            }
            case "tooltip": {
                Log.i(AccessibilityChannel.TAG, "ToolTip");
                let z19: string = y19.get("message");
                if (z19 != null) {
                    this.handler.onTooltip(z19);
                }
                break;
            }
        }
        v19.reply(StringUtils.stringToArrayBuffer(""));
    }
    constructor(s19: DartExecutor, t19: FlutterNapi) {
        Log.i(AccessibilityChannel.TAG, "Channel entered");
        this.channel = new BasicMessageChannel<object>(s19, AccessibilityChannel.CHANNEL_NAME, StandardMessageCodec.INSTANCE);
        this.channel.setMessageHandler(this);
        this.flutterNapi = t19;
    }
    onOhosAccessibilityEnabled(): void {
        let r19: number = this.nextReplyId++;
        this.flutterNapi.setSemanticsEnabledWithRespId(true, r19);
        Log.i(AccessibilityChannel.TAG, "onOhosAccessibilityEnabled = true");
    }
    onOhosAccessibilityFeatures(p19: number): void {
        let q19: number = this.nextReplyId++;
        this.flutterNapi.setAccessibilityFeatures(p19, q19);
        Log.i(AccessibilityChannel.TAG, "onOhosAccessibilityFeatures");
    }
    dispatchSemanticsAction(m19: number, n19: Action): void {
        let o19: number = this.nextReplyId++;
        this.flutterNapi.dispatchSemanticsAction(m19, n19, o19);
        Log.i(AccessibilityChannel.TAG, "dispatchSemanticsAction");
    }
    setAccessibilityMessageHandler(k19: AccessibilityMessageHandler): void {
        this.handler = k19;
        let l19: number = this.nextReplyId++;
        this.flutterNapi.setAccessibilityDelegate(k19, l19);
    }
}
export interface AccessibilityMessageHandler extends AccessibilityDelegate {
    announce(message: string): void;
    onTap(nodeId: number): void;
    onLongPress(nodeId: number): void;
    onTooltip(nodeId: string): void;
}
export class DefaultHandler implements AccessibilityMessageHandler {
    private static TAG = "AccessibilityMessageHandler";
    announce(j19: string): void {
        Log.i(DefaultHandler.TAG, "handler announce.");
        flutter.nativeAnnounce(j19);
    }
    onTap(i19: number): void {
        Log.i(DefaultHandler.TAG, "handler onTap.");
    }
    onLongPress(h19: number): void {
        Log.i(DefaultHandler.TAG, "handler onLongPress.");
    }
    onTooltip(g19: string): void {
        Log.i(DefaultHandler.TAG, "handler onTooltip.");
    }
    updateSemantics(d19: ByteBuffer, e19: string[], f19: ByteBuffer[]): void {
        Log.i(DefaultHandler.TAG, "handler updateSemantics");
    }
    updateCustomAccessibilityActions(b19: ByteBuffer, c19: string[]): void {
        Log.i(DefaultHandler.TAG, "handler updateCustomAccessibilityActions");
    }
    accessibilityStateChange(a19: Boolean): void {
        Log.i(DefaultHandler.TAG, "handler accessibilityStateChange");
    }
}
