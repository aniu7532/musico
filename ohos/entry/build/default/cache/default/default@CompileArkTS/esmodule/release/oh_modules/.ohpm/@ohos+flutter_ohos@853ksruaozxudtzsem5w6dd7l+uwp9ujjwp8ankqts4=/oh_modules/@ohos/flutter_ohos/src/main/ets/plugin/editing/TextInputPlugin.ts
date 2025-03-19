import type TextInputChannel from '../../embedding/engine/systemchannels/TextInputChannel';
import type { Configuration, TextEditState, TextInputMethodHandler } from '../../embedding/engine/systemchannels/TextInputChannel';
import inputMethod from "@ohos:inputMethod";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import { ListenableEditingState } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/editing/ListenableEditingState";
import type { EditingStateWatcher } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/editing/ListenableEditingState";
import type Any from '../common/Any';
import inputDevice from "@ohos:multimodalInput.inputDevice";
const NEWLINE_KEY_TYPE: number = 8;
export default class TextInputPlugin implements EditingStateWatcher {
    private static TAG = "TextInputPlugin";
    private textInputChannel: TextInputChannel;
    private mTextInputHandler: TextInputMethodHandlerImpl;
    constructor(v64: TextInputChannel) {
        this.textInputChannel = v64;
        this.mTextInputHandler = new TextInputMethodHandlerImpl(this);
        this.textInputChannel.setTextInputMethodHandler(this.mTextInputHandler);
    }
    public clearTextInputClient() {
        this.textInputChannel.textInputMethodHandler?.clearClient();
    }
    setTextInputEditingState(u64: TextEditState) {
    }
    getEditingState() {
        return this.mTextInputHandler.mEditable;
    }
    didChangeEditingState(o64: boolean, p64: boolean, q64: boolean): void {
        let r64 = this.mTextInputHandler.mEditable;
        let s64 = this.mTextInputHandler.inputTarget;
        let t64 = this.mTextInputHandler.configuration;
        if (t64 != null && t64.enableDeltaModel) {
            this.textInputChannel.updateEditingStateWithDeltas(s64.id, r64.extractBatchTextEditingDeltas());
            r64.clearBatchDeltas();
        }
        else {
            this.textInputChannel.updateEditingState(s64.id, r64.getStringCache(), r64.getSelectionStart(), r64.getSelectionEnd(), r64.getComposingStart(), r64.getComposingEnd());
        }
    }
    detach(): void {
        this.mTextInputHandler.inputMethodController.detach((n64) => {
            if (n64) {
                Log.e(TextInputPlugin.TAG, "Failed to detach: " + JSON.stringify(n64));
            }
        });
    }
    destroy() {
        this.textInputChannel.setTextInputMethodHandler(null);
    }
}
class TextInputMethodHandlerImpl implements TextInputMethodHandler {
    private static TAG = "TextInputMethodHandlerImpl";
    private textConfig: inputMethod.TextConfig;
    inputMethodController: inputMethod.InputMethodController;
    inputTarget: InputTarget;
    public configuration: Configuration | null = null;
    mEditable: ListenableEditingState;
    private mRestartInputPending: boolean = false;
    private plugin: EditingStateWatcher | Any;
    private imcFlag: boolean = false;
    private inputTypeNone: string = 'NONE';
    private keyboardStatus: inputMethod.KeyboardStatus = inputMethod.KeyboardStatus.HIDE;
    private inputAttribute: inputMethod.InputAttribute = { textInputType: 0, enterKeyType: 1 };
    private keyboardFocusState: boolean = false;
    constructor(m64: TextInputPlugin | Any) {
        this.textConfig = {
            inputAttribute: this.inputAttribute
        };
        this.plugin = m64;
        this.mEditable = new ListenableEditingState(null, 0);
        this.inputMethodController = inputMethod.getController();
        this.inputTarget = new InputTarget(Type.NO_TARGET, 0);
    }
    show(): void {
        if (this.canShowTextInput()) {
            this.keyboardFocusState = true;
            this.showTextInput();
        }
        else {
            this.hide();
        }
    }
    hide(): void {
        this.keyboardFocusState = false;
        this.hideTextInput();
    }
    requestAutofill(): void {
    }
    finishAutofillContext(l64: boolean): void {
    }
    setClient(j64: number, k64: Configuration | null): void {
        Log.d(TextInputMethodHandlerImpl.TAG, "textInputClientId: " + j64);
        this.setTextInputClient(j64, k64);
    }
    setPlatformViewClient(h64: number, i64: boolean): void {
    }
    setEditableSizeAndTransform(e64: number, f64: number, g64: number[]): void {
    }
    setCursorSizeAndPosition(d64: inputMethod.CursorInfo) {
        this.inputMethodController.updateCursor(d64);
    }
    setEditingState(c64: TextEditState): void {
        Log.d(TextInputMethodHandlerImpl.TAG, "text:" + c64.text + " selectionStart:" + c64.selectionStart + " selectionEnd:"
            + c64.selectionEnd + " composingStart:" + c64.composingStart + " composingEnd" +
            c64.composingEnd);
        this.mEditable.updateTextInputState(c64);
    }
    clearClient(): void {
        this.clearTextInputClient();
    }
    private async showTextInput(): Promise<void> {
        if (this.keyboardStatus == inputMethod.KeyboardStatus.SHOW) {
            return;
        }
        await this.attach(true);
        if (!this.imcFlag) {
            this.listenKeyBoardEvent();
        }
    }
    private async hideTextInput(): Promise<void> {
        this.inputMethodController.detach();
        this.keyboardStatus = inputMethod.KeyboardStatus.NONE;
        this.cancelListenKeyBoardEvent();
    }
    async attach(a64: boolean): Promise<void> {
        try {
            await this.inputMethodController.attach(a64, this.textConfig);
        }
        catch (b64) {
            Log.e(TextInputMethodHandlerImpl.TAG, "Failed to attach:" + JSON.stringify(b64));
        }
    }
    handleChangeFocus(s63: boolean) {
        try {
            inputDevice.getDeviceList((u63: x63, v63: Array<number>) => {
                let w63 = false;
                for (let y63 = 0; y63 < v63.length; y63++) {
                    const z63 = inputDevice.getKeyboardTypeSync(v63[y63]);
                    if (z63 == inputDevice.KeyboardType.ALPHABETIC_KEYBOARD || z63 == inputDevice.KeyboardType.DIGITAL_KEYBOARD) {
                        w63 = true;
                        break;
                    }
                }
                if (s63 && w63 && this.keyboardFocusState) {
                    this.cancelListenKeyBoardEvent();
                    this.inputMethodController.detach().then(async () => {
                        await this.attach(true);
                        this.listenKeyBoardEvent();
                    });
                }
            });
        }
        catch (t63) {
            Log.e(TextInputMethodHandlerImpl.TAG, `Failed to query device. Code is ${t63.code}, message is ${t63.message}`);
        }
    }
    async updateAttribute(): Promise<void> {
        if (this.keyboardStatus != inputMethod.KeyboardStatus.SHOW) {
            return;
        }
        try {
            await this.inputMethodController.updateAttribute(this.inputAttribute);
        }
        catch (r63) {
            Log.e(TextInputMethodHandlerImpl.TAG, "Failed to updateAttribute:" + JSON.stringify(r63));
        }
    }
    setTextInputClient(o63: number, p63: Configuration | null): void {
        const q63 = ['NONE', 'TEXT', 'MULTILINE', 'NUMBER', 'PHONE', 'DATETIME', 'EMAIL_ADDRESS', 'URL', 'VISIBLE_PASSWORD'];
        if (p63) {
            this.configuration = p63;
            if (p63.inputType) {
                this.textConfig.inputAttribute.textInputType = q63.indexOf(p63.inputType.type) - 1;
                this.textConfig.inputAttribute.enterKeyType = p63.inputAction as Any;
            }
        }
        if (this.canShowTextInput()) {
            this.inputTarget = new InputTarget(Type.FRAMEWORK_CLIENT, o63);
        }
        else {
            this.inputTarget = new InputTarget(Type.NO_TARGET, o63);
        }
        this.mEditable.removeEditingStateListener(this.plugin);
        this.mEditable = new ListenableEditingState(this.plugin.textInputChannel, this.inputTarget.id);
        this.mRestartInputPending = true;
        this.mEditable.addEditingStateListener(this.plugin);
        this.inputAttribute = this.textConfig.inputAttribute;
        this.updateAttribute();
    }
    canShowTextInput(): boolean {
        if (this.configuration == null || this.configuration.inputType == null) {
            return true;
        }
        return this.configuration.inputType.type != this.inputTypeNone;
    }
    listenKeyBoardEvent(): void {
        try {
            this.inputMethodController.on('insertText', this.insertTextCallback);
        }
        catch (n63) {
            Log.e(TextInputMethodHandlerImpl.TAG, "Failed to subscribe insertText:" + JSON.stringify(n63));
            this.cancelListenKeyBoardEvent();
            return;
        }
        try {
            this.inputMethodController.on('deleteLeft', this.deleteLeftCallback);
        }
        catch (m63) {
            Log.e(TextInputMethodHandlerImpl.TAG, "Failed to subscribe deleteLeft:" + JSON.stringify(m63));
            this.cancelListenKeyBoardEvent();
            return;
        }
        try {
            this.inputMethodController.on('deleteRight', this.deleteRightCallback);
        }
        catch (l63) {
            Log.e(TextInputMethodHandlerImpl.TAG, "Failed to subscribe deleteRight:" + JSON.stringify(l63));
            this.cancelListenKeyBoardEvent();
            return;
        }
        try {
            this.inputMethodController.on('sendFunctionKey', this.sendFunctionKeyCallback);
        }
        catch (k63) {
            Log.e(TextInputMethodHandlerImpl.TAG, "Failed to subscribe sendFunctionKey:" + JSON.stringify(k63));
            this.cancelListenKeyBoardEvent();
            return;
        }
        try {
            this.inputMethodController.on('sendKeyboardStatus', this.sendKeyboardStatusCallback);
        }
        catch (j63) {
            Log.e(TextInputMethodHandlerImpl.TAG, "Failed to subscribe sendKeyboardStatus:" + JSON.stringify(j63));
            this.cancelListenKeyBoardEvent();
            return;
        }
        try {
            this.inputMethodController.on('selectByRange', this.selectByRangeCallback);
        }
        catch (i63) {
            Log.e(TextInputMethodHandlerImpl.TAG, "Failed to subscribe selectByRange:" + JSON.stringify(i63));
            this.cancelListenKeyBoardEvent();
            return;
        }
        Log.d(TextInputMethodHandlerImpl.TAG, "listenKeyBoardEvent success");
        this.imcFlag = true;
    }
    private insertTextCallback = (h63: string) => {
        Log.d(TextInputMethodHandlerImpl.TAG, "insertText: " + h63);
        this.mEditable.handleInsertTextEvent(h63);
    };
    private deleteLeftCallback = (g63: number) => {
        this.mEditable.handleDeleteEvent(false, g63);
    };
    private deleteRightCallback = (f63: number) => {
        this.mEditable.handleDeleteEvent(true, f63);
    };
    private sendFunctionKeyCallback = (e63: inputMethod.FunctionKey) => {
        if (e63.enterKeyType == NEWLINE_KEY_TYPE) {
            this.mEditable.handleNewlineEvent();
        }
        this.mEditable.handleFunctionKey(e63);
    };
    private sendKeyboardStatusCallback = (d63: inputMethod.KeyboardStatus) => {
        this.keyboardStatus = d63;
        if (d63 == inputMethod.KeyboardStatus.HIDE) {
            this.plugin.textInputChannel.onConnectionClosed(this.inputTarget.id);
        }
    };
    private selectByRangeCallback = (c63: inputMethod.Range) => {
        this.mEditable.handleSelectByRange(c63);
    };
    cancelListenKeyBoardEvent(): void {
        this.inputMethodController?.off('insertText', this.insertTextCallback);
        this.inputMethodController?.off('deleteLeft', this.deleteLeftCallback);
        this.inputMethodController?.off('deleteRight', this.deleteRightCallback);
        this.inputMethodController?.off('sendFunctionKey', this.sendFunctionKeyCallback);
        this.inputMethodController?.off('sendKeyboardStatus', this.sendKeyboardStatusCallback);
        this.inputMethodController?.off('selectByRange', this.selectByRangeCallback);
        this.imcFlag = false;
    }
    public clearTextInputClient(): void {
        if (this.inputTarget.type == Type.VIRTUAL_DISPLAY_PLATFORM_VIEW) {
            return;
        }
        this.mEditable.removeEditingStateListener(this.plugin);
        this.configuration = null;
        this.inputTarget = new InputTarget(Type.NO_TARGET, 0);
    }
}
enum Type {
    NO_TARGET = 0,
    FRAMEWORK_CLIENT = 1,
    VIRTUAL_DISPLAY_PLATFORM_VIEW = 2,
    PHYSICAL_DISPLAY_PLATFORM_VIEW = 3
}
export class InputTarget {
    type: Type;
    id: number;
    constructor(a63: Type, b63: number) {
        this.type = a63;
        this.id = b63;
    }
}
