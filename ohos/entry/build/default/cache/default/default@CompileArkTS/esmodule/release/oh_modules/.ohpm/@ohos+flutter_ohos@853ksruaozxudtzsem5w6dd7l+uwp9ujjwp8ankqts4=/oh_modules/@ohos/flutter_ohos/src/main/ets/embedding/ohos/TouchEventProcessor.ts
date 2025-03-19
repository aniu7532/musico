import { CustomTouchEvent, CustomTouchObject } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/platform/CustomTouchEvent";
import display from "@ohos:display";
import FlutterManager from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterManager";
import type { EmbeddingNodeController } from './EmbeddingNodeController';
const OH_NATIVEXCOMPONENT_UNKNOWN = 4;
const OH_NATIVEXCOMPONENT_TOOL_TYPE_UNKNOWN = 0;
class OH_NativeXComponent_TouchPoint {
    id: number = 0;
    screenX: number = 0.0;
    screenY: number = 0.0;
    x: number = 0.0;
    y: number = 0.0;
    type: number = OH_NATIVEXCOMPONENT_UNKNOWN;
    size: number = 0;
    force: number = 0;
    timeStamp: number = 0;
    isPressed: boolean = false;
    constructor(v44: number, w44: number, x44: number, y44: number, z44: number, a45: number, b45: number, c45: number, d45: number, e45: boolean) {
        this.id = v44;
        this.screenX = w44;
        this.screenY = x44;
        this.x = y44;
        this.y = z44;
        this.type = a45;
        this.size = b45;
        this.force = c45;
        this.timeStamp = d45;
        this.isPressed = e45;
    }
}
class OH_NativeXComponent_TouchEvent {
    id: number = 0;
    screenX: number = 0.0;
    screenY: number = 0.0;
    x: number = 0.0;
    y: number = 0.0;
    type: number = OH_NATIVEXCOMPONENT_UNKNOWN;
    size: number = 0;
    force: number = 0;
    deviceId: number = 0;
    timeStamp: number = 0;
    touchPoints: OH_NativeXComponent_TouchPoint[] = [];
    numPoints: number = 0;
    constructor(j44: number, k44: number, l44: number, m44: number, n44: number, o44: number, p44: number, q44: number, r44: number, s44: number, t44: OH_NativeXComponent_TouchPoint[], u44: number) {
        this.id = j44;
        this.screenX = k44;
        this.screenY = l44;
        this.x = m44;
        this.y = n44;
        this.type = o44;
        this.size = p44;
        this.force = q44;
        this.deviceId = r44;
        this.timeStamp = s44;
        this.touchPoints = t44;
        this.numPoints = u44;
    }
}
class TouchPacket {
    touchEvent: OH_NativeXComponent_TouchEvent;
    toolType: number = OH_NATIVEXCOMPONENT_TOOL_TYPE_UNKNOWN;
    tiltX: number = 0;
    tiltY: number = 0;
    constructor(f44: OH_NativeXComponent_TouchEvent, g44: number, h44: number, i44: number) {
        this.touchEvent = f44;
        this.toolType = g44;
        this.tiltX = h44;
        this.tiltY = i44;
    }
}
export default class TouchEventProcessor {
    private static instance: TouchEventProcessor;
    static getInstance(): TouchEventProcessor {
        if (TouchEventProcessor.instance == null) {
            TouchEventProcessor.instance = new TouchEventProcessor();
        }
        return TouchEventProcessor.instance;
    }
    private decodeTouchPacket(h43: Array<string>, i43: number, j43: number, k43: number): TouchPacket {
        let l43: number = 0;
        let m43: number = parseInt(h43[l43++]);
        let n43: number = parseInt(h43[l43++]);
        let o43: number = (parseFloat(h43[l43++]) / i43);
        let p43: number = (parseFloat(h43[l43++]) / i43);
        let q43: number = ((parseFloat(h43[l43++]) / i43) - k43);
        let r43: number = ((parseFloat(h43[l43++]) / i43) - j43);
        let s43: number = parseInt(h43[l43++]);
        let t43: number = parseFloat(h43[l43++]);
        let u43: number = parseFloat(h43[l43++]);
        let v43: number = parseInt(h43[l43++]);
        let w43: number = parseInt(h43[l43++]);
        const x43: OH_NativeXComponent_TouchPoint[] = [];
        for (let d44 = 0; d44 < m43; d44++) {
            const e44: OH_NativeXComponent_TouchPoint = new OH_NativeXComponent_TouchPoint(parseInt(h43[l43++]), (parseFloat(h43[l43++]) / i43), (parseFloat(h43[l43++]) / i43), ((parseFloat(h43[l43++]) / i43) - k43), ((parseFloat(h43[l43++]) / i43) - j43), parseInt(h43[l43++]), parseFloat(h43[l43++]), parseFloat(h43[l43++]), parseInt(h43[l43++]), parseInt(h43[l43++]) === 1 ? true : false);
            x43.push(e44);
        }
        const y43: OH_NativeXComponent_TouchEvent = new OH_NativeXComponent_TouchEvent(n43, o43, p43, q43, r43, s43, t43, u43, v43, w43, x43, m43);
        let z43: number = parseInt(h43[l43++]);
        let a44: number = parseInt(h43[l43++]);
        let b44: number = parseInt(h43[l43++]);
        const c44: TouchPacket = new TouchPacket(y43, z43, a44, b44);
        return c44;
    }
    private constureCustomTouchEventImpl(a43: TouchPacket): CustomTouchEvent {
        let b43: CustomTouchObject = new CustomTouchObject(a43.touchEvent.type, a43.touchEvent.id, a43.touchEvent.screenX, a43.touchEvent.screenY, a43.touchEvent.screenX, a43.touchEvent.screenY, a43.touchEvent.screenX, a43.touchEvent.screenY, a43.touchEvent.x, a43.touchEvent.y);
        let c43: CustomTouchObject[] = [];
        let d43: number = a43.touchEvent.numPoints;
        for (let f43 = 0; f43 < d43; f43++) {
            let g43: CustomTouchObject = new CustomTouchObject(a43.touchEvent.touchPoints[f43].type, a43.touchEvent.touchPoints[f43].id, a43.touchEvent.touchPoints[f43].screenX, a43.touchEvent.touchPoints[f43].screenY, a43.touchEvent.touchPoints[f43].screenX, a43.touchEvent.touchPoints[f43].screenY, a43.touchEvent.touchPoints[f43].screenX, a43.touchEvent.touchPoints[f43].screenY, a43.touchEvent.touchPoints[f43].x, a43.touchEvent.touchPoints[f43].y);
            c43.push(g43);
        }
        let e43: CustomTouchEvent = new CustomTouchEvent(a43.touchEvent.type, c43, [b43], a43.touchEvent.timeStamp, SourceType.TouchScreen, a43.touchEvent.force, a43.tiltX, a43.tiltY, a43.toolType);
        return e43;
    }
    public constureCustomTouchEvent(u42: Array<string>, v42: number, w42: number): CustomTouchEvent {
        let x42: number = display.getDefaultDisplaySync().densityPixels;
        let y42: TouchPacket = this.decodeTouchPacket(u42, x42, v42, w42);
        let z42: CustomTouchEvent = this.constureCustomTouchEventImpl(y42);
        return z42;
    }
    public postTouchEvent(h42: Array<string>) {
        FlutterManager.getInstance().getFlutterViewList().forEach((i42) => {
            let j42 = i42.getDVModel().children.length;
            for (let k42 = j42 - 1; k42 >= 0; k42--) {
                let l42 = i42.getDVModel().children[k42];
                let m42 = l42.getLayoutParams() as Record<string, any>;
                let n42 = m42['left'] as number ?? 0;
                let o42 = m42['top'] as number ?? 0;
                let p42 = m42['down'] as boolean ?? false;
                if (p42) {
                    let s42 = TouchEventProcessor.getInstance().constureCustomTouchEvent(h42, o42, n42);
                    let t42 = m42['nodeController'] as EmbeddingNodeController;
                    t42.postEvent(s42);
                }
                else {
                    if (h42[6] == '0' && h42[0] == '1') {
                        m42['touchEvent'] = undefined;
                    }
                    let q42 = TouchEventProcessor.getInstance().constureCustomTouchEvent(h42, o42, n42);
                    let r42: Array<CustomTouchEvent> | undefined = m42['touchEvent'] as Array<CustomTouchEvent>;
                    if (r42 == undefined) {
                        r42 = [];
                        m42['touchEvent'] = r42;
                    }
                    r42.push(q42);
                }
            }
        });
    }
    public checkHitPlatformView(b42: number, c42: number, d42: number, e42: number, f42: number, g42: number): boolean {
        if (f42 >= b42 && f42 <= (b42 + d42) && g42 >= c42 && g42 <= (c42 + e42)) {
            return true;
        }
        else {
            return false;
        }
    }
}
