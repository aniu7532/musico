export class TextEditingDelta {
    private static TAG = "TextEditingDelta";
    private oldText: string = "";
    private deltaText: string = "";
    private deltaStart: number = 0;
    private deltaEnd: number = 0;
    private newSelectionStart: number;
    private newSelectionEnd: number;
    private newComposingStart: number;
    private newComposingEnd: number;
    constructor(s62: string, t62: number, u62: number, v62: number, w62: number, x62?: number, y62?: number, z62?: string) {
        this.newSelectionStart = t62;
        this.newSelectionEnd = u62;
        this.newComposingStart = v62;
        this.newComposingEnd = w62;
        if (x62 === undefined ||
            y62 === undefined ||
            z62 === undefined) {
            this.setDeltas(s62, "", -1, -1);
        }
        else {
            this.setDeltas(s62, z62, x62, y62);
        }
    }
    setDeltas(o62: string, p62: string, q62: number, r62: number): void {
        this.oldText = o62;
        this.deltaText = p62;
        this.deltaStart = q62;
        this.deltaEnd = r62;
    }
    toJSON(): TextEditingDeltaJson {
        let n62: TextEditingDeltaJson = {
            oldText: this.oldText.toString(),
            deltaText: this.deltaText.toString(),
            deltaStart: this.deltaStart,
            deltaEnd: this.deltaEnd,
            selectionBase: this.newSelectionStart,
            selectionExtent: this.newSelectionEnd,
            composingBase: this.newComposingStart,
            composingExtent: this.newComposingEnd,
        };
        return n62;
    }
}
export interface TextEditingDeltaJson {
    oldText: string;
    deltaText: string;
    deltaStart: number;
    deltaEnd: number;
    selectionBase: number;
    selectionExtent: number;
    composingBase: number;
    composingExtent: number;
}
