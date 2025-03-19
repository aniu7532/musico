import matrix4 from "@native:ohos.matrix4";
import List from "@ohos:util.List";
export enum FlutterMutatorType {
    CLIP_RECT = 0,
    CLIP_PATH = 1,
    TRANSFORM = 2,
    OPACITY = 3
}
class Rect {
    width: number;
    height: number;
    radius: string | number | Array<string | number>;
    constructor(q16: number, r16: number, s16?: string | number | Array<string | number>) {
        this.width = q16;
        this.height = r16;
        this.radius = s16 ?? 0;
    }
}
class Path {
    width: number | string;
    height: number | string;
    commands: string;
    constructor(n16: number | string, o16: number | string, p16?: string) {
        this.width = n16;
        this.height = o16;
        this.commands = p16 ?? '';
    }
}
export class FlutterMutator {
    private matrix: matrix4.Matrix4Transit | null = null;
    private rect: Rect = new Rect(0, 0);
    private path: Path = new Path(0, 0);
    constructor(m16: matrix4.Matrix4Transit | Rect | Path) {
        if (m16 instanceof Rect) {
            this.rect = m16;
        }
        else if (m16 instanceof Path) {
            this.path = m16;
        }
        else {
            this.matrix = m16;
        }
    }
    public getMatrix(): matrix4.Matrix4Transit | null {
        return this.matrix;
    }
    public getRect() {
        return this.rect;
    }
    public getPath() {
        return this.path;
    }
}
export class FlutterMutatorsStack {
    private mutators: List<FlutterMutator>;
    private finalClippingPaths: List<Path>;
    private finalClippingRects: List<Rect>;
    private finalMatrix: matrix4.Matrix4Transit;
    constructor() {
        this.mutators = new List();
        this.finalClippingPaths = new List();
        this.finalClippingRects = new List();
        this.finalMatrix = matrix4.identity();
    }
    public pushTransform(i16: Array<number>): void {
        if (i16.length != 16) {
            return;
        }
        let j16 = 0;
        let k16 = matrix4.init([i16[j16++], i16[j16++], i16[j16++], i16[j16++],
            i16[j16++], i16[j16++], i16[j16++], i16[j16++],
            i16[j16++], i16[j16++], i16[j16++], i16[j16++],
            i16[j16++], i16[j16++], i16[j16++], i16[j16++]]);
        let l16 = new FlutterMutator(k16);
        this.mutators.add(l16);
        this.finalMatrix.combine(k16);
    }
    public pushClipRect(d16: number, e16: number, f16?: number) {
        let g16 = new Rect(d16, e16, f16);
        let h16 = new FlutterMutator(g16);
        this.mutators.add(h16);
        this.finalClippingRects.add(g16);
    }
    public pushClipPath(y15: number, z15: number, a16?: string) {
        let b16 = new Path(y15, z15, a16);
        let c16 = new FlutterMutator(b16);
        this.mutators.add(c16);
        this.finalClippingPaths.add(b16);
    }
    public getMutators() {
        return this.mutators;
    }
    public getFinalClippingPaths() {
        return this.finalClippingPaths;
    }
    public getFinalClippingRects() {
        return this.finalClippingRects;
    }
    public getFinalMatrix() {
        return this.finalMatrix;
    }
}
