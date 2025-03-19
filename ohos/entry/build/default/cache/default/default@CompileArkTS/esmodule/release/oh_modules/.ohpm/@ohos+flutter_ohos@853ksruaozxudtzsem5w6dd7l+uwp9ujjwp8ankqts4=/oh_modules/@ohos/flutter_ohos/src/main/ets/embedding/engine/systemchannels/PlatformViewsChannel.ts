import type Any from '../../../plugin/common/Any';
import type MethodCall from '../../../plugin/common/MethodCall';
import MethodChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import type { MethodCallHandler, MethodResult } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/MethodChannel";
import StandardMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StandardMethodCodec";
import type { ByteBuffer } from '../../../util/ByteBuffer';
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type DartExecutor from '../dart/DartExecutor';
const TAG = "PlatformViewsChannel";
const NON_TEXTURE_FALLBACK = -2;
export default class PlatformViewsChannel {
    private channel: MethodChannel;
    private handler: PlatformViewsHandler | null = null;
    private parsingHandler = new ParsingCallback();
    constructor(u27: DartExecutor) {
        this.channel = new MethodChannel(u27, "flutter/platform_views", StandardMethodCodec.INSTANCE);
        this.parsingHandler.platformChannel = this;
        this.channel.setMethodCallHandler(this.parsingHandler);
    }
    public setPlatformViewsHandler(t27: PlatformViewsHandler | null): void {
        this.handler = t27;
        this.parsingHandler.handler = t27;
    }
    public invokeViewFocused(s27: number): void {
        if (this.channel == null) {
            return;
        }
        this.channel.invokeMethod("viewFocused", s27);
    }
    create(g27: MethodCall, h27: MethodResult): void {
        const i27: Map<string, Any> = g27.args;
        const j27: boolean = i27.has("hybrid") && i27.get("hybrid") as boolean;
        const k27: ByteBuffer = i27.has("params") ? i27.get("params") : null;
        let l27: Direction = Direction.Ltr;
        if (i27.get("direction") == 0) {
            l27 = Direction.Ltr;
        }
        else if (i27.get("direction") == 1) {
            l27 = Direction.Rtl;
        }
        try {
            if (j27) {
                const r27: PlatformViewCreationRequest = new PlatformViewCreationRequest(i27.get("id"), i27.get("viewType"), 0, 0, 0, 0, l27, k27, RequestedDisplayMode.HYBRID_ONLY);
                this.handler?.createForPlatformViewLayer(r27);
                h27.success(null);
            }
            else {
                const n27: boolean = i27.has("hybridFallback") && i27.get("hybridFallback");
                const o27: RequestedDisplayMode = n27 ? RequestedDisplayMode.TEXTURE_WITH_HYBRID_FALLBACK
                    : RequestedDisplayMode.TEXTURE_WITH_VIRTUAL_FALLBACK;
                const p27: PlatformViewCreationRequest = new PlatformViewCreationRequest(i27.get("id"), i27.get("viewType"), i27.has("top") ? i27.get("top") : 0.0, i27.has("left") ? i27.get("left") : 0.0, i27.get("width"), i27.get("height"), l27, k27, o27);
                Log.i(TAG, `Create texture param id:${p27.viewId},
          type:${p27.viewType},
          w:${p27.logicalWidth},
          h:${p27.logicalHeight},
          l:${p27.logicalLeft},
          t:${p27.logicalTop},
          d:${p27.direction}`);
                const q27 = this.handler?.createForTextureLayer(p27);
                if (q27 == NON_TEXTURE_FALLBACK) {
                    if (!n27) {
                        throw new Error("Platform view attempted to fall back to hybrid mode when not requested.");
                    }
                    h27.success(null);
                }
                else {
                    h27.success(q27);
                }
            }
        }
        catch (m27) {
            Log.e(TAG, "create failed" + m27);
            h27.error("error", m27, null);
        }
    }
    dispose(b27: MethodCall, c27: MethodResult): void {
        const d27: Map<string, Any> = b27.args;
        const e27: number = d27.get("id");
        try {
            this.handler?.dispose(e27);
            c27.success(null);
        }
        catch (f27) {
            Log.e(TAG, "dispose failed", f27);
            c27.error("error", f27, null);
        }
    }
    resize(v26: MethodCall, w26: MethodResult): void {
        const x26: Map<string, Any> = v26.args;
        const y26: PlatformViewResizeRequest = new PlatformViewResizeRequest(x26.get("id"), x26.get("width"), x26.get("height"));
        try {
            let a27 = new ResizeCallback();
            a27.result = w26;
            this.handler?.resize(y26, a27);
        }
        catch (z26) {
            Log.e(TAG, "resize failed", z26);
            w26.error("error", z26, null);
        }
    }
    offset(r26: MethodCall, s26: MethodResult): void {
        const t26: Map<string, Any> = r26.args;
        try {
            this.handler?.offset(t26.get("id"), t26.get("top"), t26.get("left"));
            s26.success(null);
        }
        catch (u26) {
            Log.e(TAG, "offset failed", u26);
            s26.error("error", u26, null);
        }
    }
    touch(l26: MethodCall, m26: MethodResult): void {
        const n26: Array<Any> = l26.args;
        let o26 = 0;
        const p26: PlatformViewTouch = new PlatformViewTouch(n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26++], n26[o26]);
        try {
            this.handler?.onTouch(p26);
            m26.success(null);
        }
        catch (q26) {
            Log.e(TAG, "offset failed", q26);
            m26.error("error", q26, null);
        }
    }
    setDirection(f26: MethodCall, g26: MethodResult): void {
        const h26: Map<string, Any> = f26.args;
        const i26: number = h26.get("id");
        const j26: number = h26.get("direction");
        try {
            this.handler?.setDirection(i26, j26);
            g26.success(null);
        }
        catch (k26) {
            Log.e(TAG, "setDirection failed", k26);
            g26.error("error", k26, null);
        }
    }
    clearFocus(b26: MethodCall, c26: MethodResult): void {
        const d26: number = b26.args;
        try {
            this.handler?.clearFocus(d26);
            c26.success(null);
        }
        catch (e26) {
            Log.e(TAG, "clearFocus failed", e26);
            c26.error("error", e26, null);
        }
    }
    synchronizeToNativeViewHierarchy(x25: MethodCall, y25: MethodResult): void {
        const z25: boolean = x25.args;
        try {
            this.handler?.synchronizeToNativeViewHierarchy(z25);
            y25.success(null);
        }
        catch (a26) {
            Log.e(TAG, "synchronizeToNativeViewHierarchy failed", a26);
            y25.error("error", a26, null);
        }
    }
}
export interface PlatformViewsHandler {
    createForPlatformViewLayer(request: PlatformViewCreationRequest): void;
    createForTextureLayer(request: PlatformViewCreationRequest): number;
    dispose(viewId: number): void;
    resize(request: PlatformViewResizeRequest, onComplete: PlatformViewBufferResized): void;
    offset(viewId: number, top: number, left: number): void;
    onTouch(touch: PlatformViewTouch): void;
    setDirection(viewId: number, direction: Direction): void;
    clearFocus(viewId: number): void;
    synchronizeToNativeViewHierarchy(yes: boolean): void;
}
enum RequestedDisplayMode {
    TEXTURE_WITH_VIRTUAL_FALLBACK = 0,
    TEXTURE_WITH_HYBRID_FALLBACK = 1,
    HYBRID_ONLY = 2
}
export class PlatformViewCreationRequest {
    public viewId: number;
    public viewType: string;
    public logicalWidth: number;
    public logicalHeight: number;
    public logicalTop: number;
    public logicalLeft: number;
    public direction: Direction;
    public displayMode: RequestedDisplayMode;
    public params: ByteBuffer;
    constructor(o25: number, p25: string, q25: number, r25: number, s25: number, t25: number, u25: Direction, v25: ByteBuffer, w25?: RequestedDisplayMode) {
        this.viewId = o25;
        this.viewType = p25;
        this.logicalTop = q25;
        this.logicalLeft = r25;
        this.logicalWidth = s25;
        this.logicalHeight = t25;
        this.direction = u25;
        this.displayMode = w25 ? w25 : RequestedDisplayMode.TEXTURE_WITH_VIRTUAL_FALLBACK;
        this.params = v25;
    }
}
export class PlatformViewResizeRequest {
    public viewId: number;
    public newLogicalWidth: number;
    public newLogicalHeight: number;
    constructor(l25: number, m25: number, n25: number) {
        this.viewId = l25;
        this.newLogicalWidth = m25;
        this.newLogicalHeight = n25;
    }
}
export class PlatformViewBufferSize {
    public width: number;
    public height: number;
    constructor(j25: number, k25: number) {
        this.width = j25;
        this.height = k25;
    }
}
export abstract class PlatformViewBufferResized {
    abstract run(i25: PlatformViewBufferSize): void;
}
export class PlatformViewTouch {
    public viewId: number;
    public downTime: number;
    public eventTime: number;
    public action: number;
    public pointerCount: number;
    public rawPointerPropertiesList: Any;
    public rawPointerCoords: Any;
    public metaState: number;
    public buttonState: number;
    public xPrecision: number;
    public yPrecision: number;
    public deviceId: number;
    public edgeFlags: number;
    public source: number;
    public flags: number;
    public motionEventId: number;
    constructor(s24: number, t24: number, u24: number, v24: number, w24: number, x24: Any, y24: Any, z24: number, a25: number, b25: number, c25: number, d25: number, e25: number, f25: number, g25: number, h25: number) {
        this.viewId = s24;
        this.downTime = t24;
        this.eventTime = u24;
        this.action = v24;
        this.pointerCount = w24;
        this.rawPointerPropertiesList = x24;
        this.rawPointerCoords = y24;
        this.metaState = z24;
        this.buttonState = a25;
        this.xPrecision = b25;
        this.yPrecision = c25;
        this.deviceId = d25;
        this.edgeFlags = e25;
        this.source = f25;
        this.flags = g25;
        this.motionEventId = h25;
    }
}
class ParsingCallback implements MethodCallHandler {
    platformChannel: PlatformViewsChannel | null = null;
    handler: PlatformViewsHandler | null = null;
    onMethodCall(q24: MethodCall, r24: MethodResult) {
        if (this.handler == null) {
            return;
        }
        Log.i(TAG, "Received '" + q24.method + "' message.");
        switch (q24.method) {
            case "create": {
                this.platformChannel?.create(q24, r24);
                break;
            }
            case "dispose": {
                this.platformChannel?.dispose(q24, r24);
                break;
            }
            case "resize": {
                this.platformChannel?.resize(q24, r24);
                break;
            }
            case "offset": {
                this.platformChannel?.offset(q24, r24);
                break;
            }
            case "touch": {
                this.platformChannel?.touch(q24, r24);
                break;
            }
            case "setDirection": {
                this.platformChannel?.setDirection(q24, r24);
                break;
            }
            case "clearFocus": {
                this.platformChannel?.clearFocus(q24, r24);
                break;
            }
            case "synchronizeToNativeViewHierarchy": {
                this.platformChannel?.synchronizeToNativeViewHierarchy(q24, r24);
                break;
            }
            default:
                r24.notImplemented();
        }
    }
}
class ResizeCallback extends PlatformViewBufferResized {
    result: MethodResult | null = null;
    run(o24: PlatformViewBufferSize) {
        if (o24 == null) {
            this.result?.error("error", "Failed to resize the platform view", null);
        }
        else {
            const p24: Map<string, Any> = new Map();
            p24.set("width", o24.width);
            p24.set("height", o24.height);
            this.result?.success(p24);
        }
    }
}
