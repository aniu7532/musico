export class CustomTouchEvent implements TouchEvent {
    type: TouchType = 0;
    touches: CustomTouchObject[];
    changedTouches: CustomTouchObject[];
    stopPropagation: () => void = () => { };
    timestamp: number;
    source: SourceType;
    pressure: number;
    tiltX: number;
    tiltY: number;
    sourceTool: SourceTool;
    constructor(b68: TouchType, c68: CustomTouchObject[], d68: CustomTouchObject[], e68: number, f68: SourceType, g68: number, h68: number, i68: number, j68: SourceTool) {
        this.type = b68;
        this.touches = c68;
        this.changedTouches = d68;
        this.timestamp = e68;
        this.source = f68;
        this.pressure = g68;
        this.tiltX = h68;
        this.tiltY = i68;
        this.sourceTool = j68;
    }
    preventDefault: () => void = () => { };
    getModifierKeyState(a68: string[]): boolean {
        throw new Error('Method not implemented.');
    }
    target: EventTarget = new CustomEventTarget(new CustomArea(0, 0, { x: 0, y: 0 }, { x: 0, y: 0 }));
    getHistoricalPoints(): HistoricalPoint[] {
        throw new Error('Method not implemented.');
    }
}
class CustomEventTarget implements EventTarget {
    area: Area = new CustomArea(0, 0, { x: 0, y: 0 }, { x: 0, y: 0 });
    constructor(z67: Area) {
        this.area = z67;
    }
}
class CustomArea implements Area {
    width: Length = 0;
    height: Length = 0;
    position: Position = { x: 0, y: 0 };
    globalPosition: Position = { x: 0, y: 0 };
    constructor(v67: Length, w67: Length, x67: Position, y67: Position) {
        this.width = v67;
        this.height = w67;
        this.position = x67;
        this.globalPosition = y67;
    }
}
export class CustomTouchObject implements TouchObject {
    type: TouchType;
    id: number;
    displayX: number;
    displayY: number;
    windowX: number;
    windowY: number;
    screenX: number;
    screenY: number;
    x: number;
    y: number;
    constructor(l67: TouchType, m67: number, n67: number, o67: number, p67: number, q67: number, r67: number, s67: number, t67: number, u67: number) {
        this.type = l67;
        this.id = m67;
        this.displayX = n67;
        this.displayY = o67;
        this.windowX = p67;
        this.windowY = q67;
        this.screenX = r67;
        this.screenY = s67;
        this.x = t67;
        this.y = u67;
    }
}
