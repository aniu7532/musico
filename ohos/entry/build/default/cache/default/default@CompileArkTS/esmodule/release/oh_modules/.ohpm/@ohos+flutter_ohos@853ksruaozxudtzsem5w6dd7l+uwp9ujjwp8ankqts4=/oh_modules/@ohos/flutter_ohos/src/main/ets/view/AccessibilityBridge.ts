import type AccessibilityChannel from '../embedding/engine/systemchannels/AccessibilityChannel';
import type { AccessibilityMessageHandler } from '../embedding/engine/systemchannels/AccessibilityChannel';
import type { ByteBuffer } from '../util/ByteBuffer';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
const TAG = "AccessibilityBridge";
export default class AccessibilityBridge implements AccessibilityMessageHandler {
    private accessibilityChannel: AccessibilityChannel | null = null;
    constructor() {
    }
    announce(o83: string): void {
        throw new Error('Method not implemented.');
    }
    onTap(n83: number): void {
        throw new Error('Method not implemented.');
    }
    onLongPress(m83: number): void {
        throw new Error('Method not implemented.');
    }
    onTooltip(l83: string): void {
        throw new Error('Method not implemented.');
    }
    updateSemantics(i83: ByteBuffer, j83: string[], k83: ByteBuffer[]): void {
        Log.d(TAG, "AccessibilityBridge.ets updateSemantics is called");
    }
    updateCustomAccessibilityActions(g83: ByteBuffer, h83: string[]): void {
        Log.d(TAG, "AccessibilityBridge.ets updateCustomAccessibilityActions is called");
    }
    accessibilityStateChange(f83: Boolean): void {
        Log.d(TAG, "AccessibilityBridge.ets accessibilityStateChange is called");
    }
}
export class AccessibilityManager {
    private fontWeightScale: number | null = null;
    setFontWeightScale(e83: number): void {
        this.fontWeightScale = e83;
        Log.i(TAG, 'setFontWeightScale: ' + JSON.stringify(this.fontWeightScale));
    }
    getFontWeightScale(): number {
        Log.i(TAG, 'getFontWeightScale: ' + JSON.stringify(this.fontWeightScale));
        return this.fontWeightScale!;
    }
}
export enum Action {
    TAP = 1,
    LONG_PRESS = 2,
    SCROLL_LEFT = 4,
    SCROLL_RIGHT = 8,
    SCROLL_UP = 16,
    SCROLL_DOWN = 32,
    INCREASE = 64,
    DECREASE = 128,
    SHOW_ON_SCREEN = 256,
    MOVE_CURSOR_FORWARD_BY_CHARACTER = 512,
    MOVE_CURSOR_BACKWARD_BY_CHARACTER = 1024,
    SET_SELECTION = 2048,
    COPY = 4096,
    CUT = 8192,
    PASTE = 16384,
    DID_GAIN_ACCESSIBILITY_FOCUS = 32768,
    DID_LOSE_ACCESSIBILITY_FOCUS = 65536,
    CUSTOM_ACTION = 131072,
    DISMISS = 262144,
    MOVE_CURSOR_FORWARD_BY_WORD = 524288,
    MOVE_CURSOR_BACKWARD_BY_WORD = 1048576,
    SET_NEXT = 2097152
}
;
