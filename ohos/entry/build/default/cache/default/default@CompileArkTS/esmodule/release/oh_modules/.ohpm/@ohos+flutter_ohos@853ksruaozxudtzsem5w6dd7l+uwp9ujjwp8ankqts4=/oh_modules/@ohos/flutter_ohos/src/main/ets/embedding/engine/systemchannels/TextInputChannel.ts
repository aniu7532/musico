import JSONMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/JSONMethodCodec";
import type MethodCall from '../../../plugin/common/MethodCall';
import MethodChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type { MethodCallHandler, MethodResult } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
import inputMethod from "@ohos:inputMethod";
import type ArrayList from "@ohos:util.ArrayList";
import type { TextEditingDelta, TextEditingDeltaJson } from '../../../plugin/editing/TextEditingDelta';
import type Any from '../../../plugin/common/Any';
import display from "@ohos:display";
import window from "@ohos:window";
import type { BusinessError } from "@ohos:base";
const TAG = "TextInputChannel";
const NEWLINE_KEY_TYPE: number = 8;
export default class TextInputChannel {
    private static CHANNEL_NAME = "flutter/textinput";
    public channel: MethodChannel;
    textInputMethodHandler: TextInputMethodHandler | null = null;
    constructor(k32: DartExecutor) {
        this.channel = new MethodChannel(k32, TextInputChannel.CHANNEL_NAME, JSONMethodCodec.INSTANCE);
    }
    setTextInputMethodHandler(j32: TextInputMethodHandler | null): void {
        this.textInputMethodHandler = j32;
        this.channel.setMethodCallHandler(j32 == null
            ? null : new TextInputCallback(j32));
    }
    requestExistingInputState(): void {
        this.channel.invokeMethod("TextInputClient.requestExistingInputState", null);
    }
    createEditingStateJSON(d32: string, e32: number, f32: number, g32: number, h32: number): EditingState {
        let i32: EditingState = {
            text: d32,
            selectionBase: e32,
            selectionExtent: f32,
            composingBase: g32,
            composingExtent: h32
        };
        return i32;
    }
    createEditingDeltaJSON(x31: ArrayList<TextEditingDelta>): EditingDelta {
        let y31: Array<TextEditingDeltaJson> = [];
        x31.forEach((a32, b32, c32) => {
            y31.push(a32.toJSON());
        });
        let z31: EditingDelta = {
            deltas: y31,
        };
        return z31;
    }
    updateEditingState(q31: number, r31: string, s31: number, t31: number, u31: number, v31: number): void {
        Log.d(TAG, "updateEditingState:"
            + "Text: " + r31 + " Selection start: " + s31 + " Selection end: "
            + t31 + " Composing start: " + u31 + " Composing end: " + v31);
        const w31: Any = this.createEditingStateJSON(r31, s31, t31, u31, v31);
        this.channel.invokeMethod('TextInputClient.updateEditingState', [q31, w31]);
    }
    updateEditingStateWithDeltas(n31: number, o31: ArrayList<TextEditingDelta>): void {
        Log.d(TAG, "updateEditingStateWithDeltas:" + "batchDeltas length: " + o31.length);
        const p31: Any = this.createEditingDeltaJSON(o31);
        this.channel.invokeMethod('TextInputClient.updateEditingStateWithDeltas', [n31, p31]);
    }
    newline(m31: number): void {
        Log.d(TAG, "Sending 'newline' message.");
        this.channel.invokeMethod("TextInputClient.performAction", [m31, "TextInputAction.newline"]);
    }
    go(l31: number): void {
        Log.d(TAG, "Sending 'go' message.");
        this.channel.invokeMethod("TextInputClient.performAction", [l31, "TextInputAction.go"]);
    }
    search(k31: number): void {
        Log.d(TAG, "Sending 'search' message.");
        this.channel.invokeMethod("TextInputClient.performAction", [k31, "TextInputAction.search"]);
    }
    send(j31: number): void {
        Log.d(TAG, "Sending 'send' message.");
        this.channel.invokeMethod("TextInputClient.performAction", [j31, "TextInputAction.send"]);
    }
    done(i31: number): void {
        Log.d(TAG, "Sending 'done' message.");
        this.channel.invokeMethod("TextInputClient.performAction", [i31, "TextInputAction.done"]);
    }
    next(h31: number): void {
        Log.d(TAG, "Sending 'next' message.");
        this.channel.invokeMethod("TextInputClient.performAction", [h31, "TextInputAction.next"]);
    }
    previous(g31: number): void {
        Log.d(TAG, "Sending 'previous' message.");
        this.channel.invokeMethod("TextInputClient.performAction", [g31, "TextInputAction.previous"]);
    }
    unspecifiedAction(f31: number): void {
        Log.d(TAG, "Sending 'unspecifiedAction' message.");
        this.channel.invokeMethod("TextInputClient.performAction", [f31, "TextInputAction.unspecified"]);
    }
    commitContent(e31: number): void {
        Log.d(TAG, "Sending 'commitContent' message.");
        this.channel.invokeMethod("TextInputClient.performAction", [e31, "TextInputAction.commitContent"]);
    }
    onConnectionClosed(d31: number): void {
        Log.d(TAG, "Sending 'onConnectionClosed' message.");
    }
    performPrivateCommand(a31: number, b31: string, c31: Any) {
    }
}
interface EditingState {
    text: string;
    selectionBase: number;
    selectionExtent: number;
    composingBase: number;
    composingExtent: number;
}
interface EditingDelta {
    deltas: Array<TextEditingDeltaJson>;
}
export interface TextInputMethodHandler {
    show(): void;
    hide(): void;
    requestAutofill(): void;
    finishAutofillContext(shouldSave: boolean): void;
    setClient(textInputClientId: number, configuration: Configuration | null): void;
    setPlatformViewClient(id: number, usesVirtualDisplay: boolean): void;
    setEditableSizeAndTransform(width: number, height: number, transform: number[]): void;
    setCursorSizeAndPosition(cursorInfo: inputMethod.CursorInfo): void;
    setEditingState(editingState: TextEditState): void;
    clearClient(): void;
    handleChangeFocus(focusState: boolean): void;
}
export class Configuration {
    obscureText: boolean = false;
    autocorrect: boolean = false;
    autofill: boolean = false;
    enableSuggestions: boolean = false;
    enableIMEPersonalizedLearning: boolean = false;
    enableDeltaModel: boolean = false;
    textCapitalization: TextCapitalization | null = null;
    inputType: InputType | null = null;
    inputAction: Number = 0;
    actionLabel: String = "";
    contentCommitMimeTypes: String[] = [];
    fields: Configuration[] = [];
    constructor(o30: boolean, p30: boolean, q30: boolean, r30: boolean, s30: boolean, t30: TextCapitalization, u30: InputType, v30: Number, w30: String, x30: boolean, y30: [
    ], z30: Configuration[]) {
        this.obscureText = o30;
        this.autocorrect = p30;
        this.enableSuggestions = q30;
        this.enableIMEPersonalizedLearning = r30;
        this.textCapitalization = t30;
        this.enableDeltaModel = s30;
        this.inputType = u30;
        this.inputAction = v30;
        this.actionLabel = w30;
        this.autofill = x30;
        this.contentCommitMimeTypes = y30;
        this.fields = z30;
    }
    static getTextCapitalizationFromValue(l30: string): TextCapitalization {
        let m30 = ["CHARACTERS", "WORDS", "SENTENCES", "NONE"];
        for (let n30 of m30) {
            if (TextCapitalization[n30] === l30) {
                return n30 as TextCapitalization;
            }
        }
        throw new Error("No such TextCapitalization: " + l30);
    }
    private static inputActionFromTextInputAction(k30: string): number {
        switch (k30) {
            case "TextInputAction.previous":
                return inputMethod.EnterKeyType.PREVIOUS;
            case "TextInputAction.unspecified":
                return inputMethod.EnterKeyType.UNSPECIFIED;
            case "TextInputAction.none":
                return inputMethod.EnterKeyType.NONE;
            case "TextInputAction.go":
                return inputMethod.EnterKeyType.GO;
            case "TextInputAction.search":
                return inputMethod.EnterKeyType.SEARCH;
            case "TextInputAction.send":
                return inputMethod.EnterKeyType.SEND;
            case "TextInputAction.next":
                return inputMethod.EnterKeyType.NEXT;
            case "TextInputAction.newline":
                return NEWLINE_KEY_TYPE;
            case "TextInputAction.done":
                return inputMethod.EnterKeyType.DONE;
            default:
                return inputMethod.EnterKeyType.UNSPECIFIED;
        }
    }
    static fromJson(d30: Any) {
        const e30: string = d30.inputAction;
        if (!e30) {
            throw new Error("Configuration JSON missing 'inputAction' property.");
        }
        let f30: Array<Any> = new Array();
        if (d30.fields !== null && d30.fields !== undefined) {
            f30 = d30.fields.map((j30: Any): Any => Configuration.fromJson(j30));
        }
        const g30: number = Configuration.inputActionFromTextInputAction(e30);
        const h30: Array<Any> = [];
        if (d30.contentCommitMimeTypes !== null && d30.contentCommitMimeTypes !== undefined) {
            d30.contentCommitMimeTypes.forEach((i30: Any) => {
                h30.push(i30);
            });
        }
        return new Configuration(d30.obscureText ?? false, d30.autocorrect ?? true, d30.enableSuggestions ?? false, d30.enableIMEPersonalizedLearning ?? false, d30.enableDeltaModel ?? false, Configuration.getTextCapitalizationFromValue(d30.textCapitalization), InputType.fromJson(d30.inputType), g30, d30.actionLabel ?? null, d30.autofill ?? null, h30 as Any, f30);
    }
}
enum TextCapitalization {
    CHARACTERS = "TextCapitalization.characters",
    WORDS = "TextCapitalization.words",
    SENTENCES = "TextCapitalization.sentences",
    NONE = "TextCapitalization.none"
}
export enum TextInputType {
    TEXT = "TextInputType.text",
    DATETIME = "TextInputType.datetime",
    NAME = "TextInputType.name",
    POSTAL_ADDRESS = "TextInputType.address",
    NUMBER = "TextInputType.number",
    PHONE = "TextInputType.phone",
    MULTILINE = "TextInputType.multiline",
    EMAIL_ADDRESS = "TextInputType.emailAddress",
    URL = "TextInputType.url",
    VISIBLE_PASSWORD = "TextInputType.visiblePassword",
    NONE = "TextInputType.none"
}
export class InputType {
    type: TextInputType;
    isSigned: boolean;
    isDecimal: boolean;
    constructor(a30: TextInputType, b30: boolean, c30: boolean) {
        this.type = a30;
        this.isSigned = b30;
        this.isDecimal = c30;
    }
    static fromJson(z29: Any): InputType {
        return new InputType(InputType.getTextInputTypeFromValue(z29.name as string), z29.signed as boolean, z29.decimal as boolean);
    }
    static getTextInputTypeFromValue(w29: string): TextInputType {
        let x29 = ["TEXT", "DATETIME", "NAME", "POSTAL_ADDRESS", "NUMBER", "PHONE", "MULTILINE", "EMAIL_ADDRESS", "URL", "VISIBLE_PASSWORD", "NONE",];
        for (let y29 of x29) {
            if (TextInputType[y29] === w29) {
                return y29 as TextInputType;
            }
        }
        throw new Error("No such TextInputType: " + w29);
    }
}
export class TextEditState {
    private static TAG = "TextEditState";
    text: string;
    selectionStart: number;
    selectionEnd: number;
    composingStart: number;
    composingEnd: number;
    constructor(r29: string, s29: number, t29: number, u29: number, v29: number) {
        if ((s29 != -1 || t29 != -1)
            && (s29 < 0 || t29 < 0)) {
            throw new Error("invalid selection: (" + s29 + ", " + t29 + ")");
        }
        if ((u29 != -1 || v29 != -1)
            && (u29 < 0 || u29 > v29)) {
            throw new Error("invalid composing range: (" + u29 + ", " + v29 + ")");
        }
        if (v29 > r29.length) {
            throw new Error("invalid composing start: " + u29);
        }
        if (s29 > r29.length) {
            throw new Error("invalid selection start: " + s29);
        }
        if (t29 > r29.length) {
            throw new Error("invalid selection end: " + t29);
        }
        this.text = r29;
        this.selectionStart = s29;
        this.selectionEnd = t29;
        this.composingStart = u29;
        this.composingEnd = v29;
    }
    hasSelection(): boolean {
        return this.selectionStart >= 0;
    }
    hasComposing(): boolean {
        return this.composingStart >= 0 && this.composingEnd > this.composingStart;
    }
    static fromJson(q29: Any): TextEditState {
        if (q29.text != null && q29.text != undefined && q29.text != "") {
            return new TextEditState(q29.text, q29.selectionBase, q29.selectionExtent, q29.composingBase, q29.composingExtent);
        }
        else {
            return new TextEditState(q29.get('text'), q29.get('selectionBase'), q29.get('selectionExtent'), q29.get('composingBase'), q29.get('composingExtent'));
        }
    }
}
class TextInputCallback implements MethodCallHandler {
    textInputMethodHandler: TextInputMethodHandler;
    windowPosition: window.Rect = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    };
    cursorPosition: window.Rect = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    };
    devicePixelRatio = display.getDefaultDisplaySync()?.densityPixels as number;
    inputPosotion: window.Rect = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    };
    isListenWindow: boolean = false;
    constructor(p29: TextInputMethodHandler) {
        this.textInputMethodHandler = p29;
    }
    setCursorPosition() {
        if (!this.isListenWindow) {
            this.isListenWindow = true;
            const l29 = getContext(this) as Context;
            window.getLastWindow(l29, (m29: BusinessError, n29: window.Window) => {
                this.windowPosition = n29.getWindowProperties().windowRect as window.Rect;
                n29.on('windowRectChange', (o29: window.RectChangeOptions) => {
                    this.windowPosition = o29.rect as window.Rect;
                    this.setCursorPosition();
                });
            });
        }
        const j29 = (this.windowPosition.left as number) + (this.cursorPosition.left + this.inputPosotion.left) * this.devicePixelRatio;
        const k29 = (this.windowPosition.top as number) + (this.cursorPosition.top + this.inputPosotion.top) * this.devicePixelRatio;
        this.textInputMethodHandler.setCursorSizeAndPosition({
            left: j29,
            top: k29,
            width: 100,
            height: 50,
        });
    }
    onMethodCall(c29: MethodCall, d29: MethodResult) {
        if (this.textInputMethodHandler == null) {
            return;
        }
        let e29: string = c29.method;
        let f29: Any = c29.args;
        Log.d(TAG, "Received '" + e29 + "' message.");
        switch (e29) {
            case "TextInput.show":
                this.textInputMethodHandler.show();
                Log.d(TAG, "textInputMethodHandler.show()");
                d29.success(null);
                break;
            case "TextInput.hide":
                this.textInputMethodHandler.hide();
                d29.success(null);
                break;
            case "TextInput.setClient":
                const g29: number = f29[0] as number;
                const h29: string = f29[1];
                const i29: Configuration | null = Configuration.fromJson(h29);
                this.textInputMethodHandler.setClient(g29, i29);
                d29.success(null);
                break;
            case "TextInput.requestAutofill":
                d29.notImplemented();
                break;
            case "TextInput.setPlatformViewClient":
                d29.notImplemented();
                break;
            case "TextInput.setEditingState":
                this.textInputMethodHandler.setEditingState(TextEditState.fromJson(f29));
                d29.success(null);
                break;
            case "TextInput.setCaretRect":
                this.cursorPosition.top = f29.get('y');
                this.cursorPosition.left = f29.get('x');
                this.cursorPosition.width = f29.get('width');
                this.cursorPosition.height = f29.get('height');
                this.setCursorPosition();
                break;
            case "TextInput.setEditableSizeAndTransform":
                this.inputPosotion.left = f29.get('transform')[12];
                this.inputPosotion.top = f29.get('transform')[13];
                this.setCursorPosition();
                break;
            case "TextInput.clearClient":
                this.textInputMethodHandler.clearClient();
                d29.success(null);
                break;
            case "TextInput.sendAppPrivateCommand":
                d29.notImplemented();
                break;
            case "TextInput.finishAutofillContext":
                d29.notImplemented();
                break;
            default:
                d29.notImplemented();
                break;
        }
    }
}
