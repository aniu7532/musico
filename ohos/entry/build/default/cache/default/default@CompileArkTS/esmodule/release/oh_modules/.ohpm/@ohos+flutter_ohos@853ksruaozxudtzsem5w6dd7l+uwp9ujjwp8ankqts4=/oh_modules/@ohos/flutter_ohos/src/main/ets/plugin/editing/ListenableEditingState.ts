import type { TextEditState } from '../../embedding/engine/systemchannels/TextInputChannel';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import inputMethod from "@ohos:inputMethod";
import ArrayList from "@ohos:util.ArrayList";
import { TextEditingDelta } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/editing/TextEditingDelta";
import type TextInputChannel from '../../embedding/engine/systemchannels/TextInputChannel';
import { FlutterTextUtils } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/editing/TextUtils";
const TAG = "ListenableEditingState";
export class ListenableEditingState {
    private TextInputChannel: TextInputChannel | null = null;
    private client: number = 0;
    private mStringCache: string;
    private mSelectionStartCache: number = 0;
    private mSelectionEndCache: number = 0;
    private mComposingStartCache: number = 0;
    private mComposingEndCache: number = 0;
    private mListeners: ArrayList<EditingStateWatcher> = new ArrayList<EditingStateWatcher>();
    private mPendingListeners: ArrayList<EditingStateWatcher> = new ArrayList<EditingStateWatcher>();
    private mBatchTextEditingDeltas: ArrayList<TextEditingDelta> = new ArrayList<TextEditingDelta>();
    private mChangeNotificationDepth: number = 0;
    private mBatchEditNestDepth: number = 0;
    private mTextWhenBeginBatchEdit: string;
    private mSelectionStartWhenBeginBatchEdit: number = 0;
    private mSelectionEndWhenBeginBatchEdit: number = 0;
    private mComposingStartWhenBeginBatchEdit: number = 0;
    private mComposingEndWhenBeginBatchEdit: number = 0;
    constructor(l62: TextInputChannel | null, m62: number) {
        this.TextInputChannel = l62;
        this.client = m62;
        this.mStringCache = "";
        this.mTextWhenBeginBatchEdit = "";
        this.mSelectionStartCache = 0;
        this.mSelectionEndCache = 0;
        this.mComposingStartCache = -1;
        this.mComposingEndCache = -1;
    }
    extractBatchTextEditingDeltas(): ArrayList<TextEditingDelta> {
        let j62 = new ArrayList<TextEditingDelta>();
        this.mBatchTextEditingDeltas.forEach((k62) => {
            j62.add(k62);
        });
        this.mBatchTextEditingDeltas.clear();
        return j62;
    }
    clearBatchDeltas(): void {
        this.mBatchTextEditingDeltas.clear();
    }
    replace(d62: number, e62: number, f62: String, g62: number, h62: number): void {
        const i62 = this.mSelectionStartCache < this.mSelectionEndCache ? this.mSelectionStartCache : this.mSelectionEndCache;
        this.mBatchTextEditingDeltas.add(new TextEditingDelta(this.mStringCache.toString(), i62 + h62, i62 + h62, this.getComposingStart(), this.getComposingEnd(), d62, e62 + g62, f62.toString()));
    }
    getSelectionStart(): number {
        return this.mSelectionStartCache;
    }
    getSelectionEnd(): number {
        return this.mSelectionEndCache;
    }
    getComposingStart(): number {
        return this.mComposingStartCache;
    }
    getComposingEnd(): number {
        return this.mComposingEndCache;
    }
    getStringCache(): string {
        return this.mStringCache;
    }
    setSelectionStart(c62: number): void {
        this.mSelectionStartCache = c62;
    }
    setSelectionEnd(b62: number): void {
        this.mSelectionEndCache = b62;
    }
    setComposingStart(a62: number): void {
        this.mComposingStartCache = a62;
    }
    setComposingEnd(z61: number): void {
        this.mComposingEndCache = z61;
    }
    setStringCache(y61: string): void {
        this.mStringCache = y61;
    }
    notifyListener(u61: EditingStateWatcher, v61: boolean, w61: boolean, x61: boolean): void {
        this.mChangeNotificationDepth++;
        u61.didChangeEditingState(v61, w61, x61);
        this.mChangeNotificationDepth--;
    }
    notifyListenersIfNeeded(q61: boolean, r61: boolean, s61: boolean) {
        if (q61 || r61 || s61) {
            for (const t61 of this.mListeners) {
                this.notifyListener(t61, q61, r61, s61);
            }
        }
    }
    handleInsertTextEvent(k61: string): void {
        let l61 = this.mSelectionStartCache < this.mSelectionEndCache ? this.mSelectionStartCache : this.mSelectionEndCache;
        let m61 = this.mSelectionStartCache > this.mSelectionEndCache ? this.mSelectionStartCache : this.mSelectionEndCache;
        const n61 = k61.length;
        this.replace(l61, m61, k61, 0, n61);
        if (this.mStringCache.length == this.mSelectionStartCache) {
            let p61: string = this.mStringCache.substring(0, l61) + k61 + this.mStringCache.substring(m61);
            this.mStringCache = p61;
            this.setSelectionStart(this.mStringCache.length);
            this.setSelectionEnd(this.mStringCache.length);
        }
        else if (this.mStringCache.length > this.mSelectionStartCache) {
            let o61: string = this.mStringCache.substring(0, l61) + k61 + this.mStringCache.substring(m61);
            this.mStringCache = o61;
            this.mSelectionStartCache = l61 + k61.length;
            this.mSelectionEndCache = this.mSelectionStartCache;
        }
        if (this.mListeners == null) {
            Log.e(TAG, "mListeners is null");
            return;
        }
        this.notifyListenersIfNeeded(true, true, false);
    }
    updateTextInputState(j61: TextEditState): void {
        this.beginBatchEdit();
        this.setStringCache(j61.text);
        if (j61.hasSelection()) {
            this.setSelectionStart(j61.selectionStart);
            this.setSelectionEnd(j61.selectionEnd);
        }
        else {
            this.setSelectionStart(0);
            this.setSelectionEnd(0);
        }
        this.endBatchEdit();
    }
    beginBatchEdit(): void {
        this.mBatchEditNestDepth++;
        if (this.mChangeNotificationDepth > 0) {
            Log.e(TAG, "editing state should not be changed in a listener callback");
        }
        if (this.mBatchEditNestDepth == 1 && !this.mListeners.isEmpty()) {
            this.mTextWhenBeginBatchEdit = this.getStringCache();
            this.mSelectionStartWhenBeginBatchEdit = this.getSelectionStart();
            this.mSelectionEndWhenBeginBatchEdit = this.getSelectionEnd();
            this.mComposingStartWhenBeginBatchEdit = this.getComposingStart();
            this.mComposingEndWhenBeginBatchEdit = this.getComposingEnd();
        }
    }
    endBatchEdit(): void {
        if (this.mBatchEditNestDepth == 0) {
            Log.e(TAG, "endBatchEdit called without a matching beginBatchEdit");
            return;
        }
        if (this.mBatchEditNestDepth == 1) {
            Log.d(TAG, "mBatchEditNestDepth == 1");
            for (const i61 of this.mPendingListeners) {
                this.notifyListener(i61, true, true, true);
            }
            if (!this.mListeners.isEmpty()) {
                Log.d(TAG, "didFinishBatchEdit with " + this.mListeners.length + " listener(s)");
                const f61 = !(this.mStringCache == this.mTextWhenBeginBatchEdit);
                const g61 = this.mSelectionStartWhenBeginBatchEdit != this.getSelectionStart()
                    || this.mSelectionEndWhenBeginBatchEdit != this.getSelectionEnd();
                const h61 = this.mComposingStartWhenBeginBatchEdit != this.getComposingStart()
                    || this.mComposingEndWhenBeginBatchEdit != this.getComposingEnd();
                Log.d(TAG, "textChanged: " + f61 + " selectionChanged: " + g61 +
                    " composingRegionChanged: " + h61);
                this.notifyListenersIfNeeded(f61, g61, h61);
            }
        }
        for (const e61 of this.mPendingListeners) {
            this.mListeners.add(e61);
        }
        this.mPendingListeners.clear();
        this.mBatchEditNestDepth--;
    }
    addEditingStateListener(d61: EditingStateWatcher): void {
        if (this.mChangeNotificationDepth > 0) {
            Log.e(TAG, "adding a listener " + JSON.stringify(d61) + " in a listener callback");
        }
        if (this.mBatchEditNestDepth > 0) {
            Log.d(TAG, "a listener was added to EditingState while a batch edit was in progress");
            this.mPendingListeners.add(d61);
        }
        else {
            this.mListeners.add(d61);
        }
    }
    removeEditingStateListener(c61: EditingStateWatcher): void {
        if (this.mChangeNotificationDepth > 0) {
            Log.e(TAG, "removing a listener " + JSON.stringify(c61) + " in a listener callback");
        }
        this.mListeners.remove(c61);
        if (this.mBatchEditNestDepth > 0) {
            this.mPendingListeners.remove(c61);
        }
    }
    handleDeleteEvent(u60: boolean, v60: number): void {
        let w60 = this.mSelectionStartCache < this.mSelectionEndCache ? this.mSelectionStartCache : this.mSelectionEndCache;
        let x60 = this.mSelectionStartCache > this.mSelectionEndCache ? this.mSelectionStartCache : this.mSelectionEndCache;
        if (u60 == false) {
            if (w60 == 0 && x60 == 0) {
                return;
            }
            let a61 = w60;
            if (w60 == x60) {
                a61 = FlutterTextUtils.getOffsetBefore(this.mStringCache, w60);
            }
            this.replace(a61, x60, "", 0, 0);
            this.mSelectionStartCache = a61;
            let b61: string = this.mStringCache.slice(0, a61) + this.mStringCache.slice(x60);
            this.mStringCache = b61;
            this.mSelectionEndCache = this.mSelectionStartCache;
        }
        else if (u60 == true) {
            if (w60 == this.mStringCache.length) {
                return;
            }
            let y60 = x60;
            if (w60 == x60) {
                y60 = FlutterTextUtils.getOffsetAfter(this.mStringCache, w60);
            }
            this.replace(w60, y60, "", 0, 0);
            this.mSelectionEndCache = w60;
            let z60: string = this.mStringCache.slice(0, w60) + (y60 >= this.mStringCache.length ? "" : this.mStringCache.slice(y60));
            this.mStringCache = z60;
            this.mSelectionStartCache = this.mSelectionEndCache;
        }
        this.notifyListenersIfNeeded(true, true, false);
    }
    handleNewlineEvent(): void {
        let q60 = this.mSelectionStartCache < this.mSelectionEndCache ? this.mSelectionStartCache : this.mSelectionEndCache;
        let r60 = this.mSelectionStartCache > this.mSelectionEndCache ? this.mSelectionStartCache : this.mSelectionEndCache;
        if (this.mStringCache.length == this.mSelectionStartCache) {
            let t60: string = this.mStringCache.substring(0, q60) + '\n' + this.mStringCache.substring(r60);
            this.mStringCache = t60;
            this.setSelectionStart(this.mStringCache.length);
            this.setSelectionEnd(this.mStringCache.length);
        }
        else if (this.mStringCache.length > this.mSelectionStartCache) {
            let s60: string = this.mStringCache.substring(0, q60) + '\n' + this.mStringCache.substring(r60);
            this.mStringCache = s60;
            this.mSelectionStartCache = q60 + 1;
            this.mSelectionEndCache = this.mSelectionStartCache;
        }
        if (this.mListeners == null) {
            Log.e(TAG, "mListeners is null");
            return;
        }
        this.notifyListenersIfNeeded(true, true, false);
    }
    handleFunctionKey(p60: inputMethod.FunctionKey): void {
        if (!this.TextInputChannel) {
            return;
        }
        switch (p60.enterKeyType) {
            case inputMethod.EnterKeyType.PREVIOUS:
                this.TextInputChannel.previous(this.client);
                break;
            case inputMethod.EnterKeyType.UNSPECIFIED:
                this.TextInputChannel.unspecifiedAction(this.client);
                break;
            case inputMethod.EnterKeyType.NONE:
                this.TextInputChannel.newline(this.client);
                break;
            case inputMethod.EnterKeyType.GO:
                this.TextInputChannel.go(this.client);
                break;
            case inputMethod.EnterKeyType.SEARCH:
                this.TextInputChannel.search(this.client);
                break;
            case inputMethod.EnterKeyType.SEND:
                this.TextInputChannel.send(this.client);
                break;
            case inputMethod.EnterKeyType.NEXT:
                this.TextInputChannel.next(this.client);
                break;
            case inputMethod.EnterKeyType.DONE:
                this.TextInputChannel.done(this.client);
                break;
        }
    }
    handleSelectByRange(o60: inputMethod.Range): void {
        Log.d(TAG, "handleSelectByRange start: " + o60.start + " end: " + o60.end);
    }
}
export interface EditingStateWatcher {
    didChangeEditingState(textChanged: boolean, selectionChanged: boolean, composingRegionChanged: boolean): void;
}
