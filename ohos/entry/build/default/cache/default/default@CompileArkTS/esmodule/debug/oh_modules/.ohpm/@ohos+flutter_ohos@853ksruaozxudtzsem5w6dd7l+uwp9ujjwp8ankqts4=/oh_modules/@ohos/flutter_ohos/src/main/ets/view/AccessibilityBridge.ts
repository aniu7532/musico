import type AccessibilityChannel from '../embedding/engine/systemchannels/AccessibilityChannel';
import type { AccessibilityMessageHandler } from '../embedding/engine/systemchannels/AccessibilityChannel';
import type { ByteBuffer } from '../util/ByteBuffer';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
const TAG = "AccessibilityBridge";
export default class AccessibilityBridge implements AccessibilityMessageHandler {
    private accessibilityChannel: AccessibilityChannel | null = null;
    constructor() {
    }
    announce(message: string): void {
        throw new Error('Method not implemented.');
        // android -> rootAccessibilityView.announceForAccessibility(message);
    }
    onTap(nodeId: number): void {
        throw new Error('Method not implemented.');
        // android -> sendAccessibilityEvent(nodeId, AccessibilityEvent.TYPE_VIEW_CLICKED);
    }
    onLongPress(nodeId: number): void {
        throw new Error('Method not implemented.');
        // android -> sendAccessibilityEvent(nodeId, AccessibilityEvent.TYPE_VIEW_LONG_CLICKED);
    }
    onTooltip(nodeId: string): void {
        throw new Error('Method not implemented.');
    }
    updateSemantics(buffer: ByteBuffer, strings: string[], stringAttributeArgs: ByteBuffer[]): void {
        Log.d(TAG, "AccessibilityBridge.ets updateSemantics is called");
    }
    updateCustomAccessibilityActions(buffer: ByteBuffer, strings: string[]): void {
        Log.d(TAG, "AccessibilityBridge.ets updateCustomAccessibilityActions is called");
    }
    accessibilityStateChange(state: Boolean): void {
        Log.d(TAG, "AccessibilityBridge.ets accessibilityStateChange is called");
    }
}
export class AccessibilityManager {
    private fontWeightScale: number | null = null;
    setFontWeightScale(fontWeightScale: number): void {
        this.fontWeightScale = fontWeightScale;
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
