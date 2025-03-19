import type matrix4 from "@native:ohos.matrix4";
import { DVModelParameters } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicView";
import type { DVModel, DVModelEvents } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicView";
import { createDVModelFromJson } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicViewJson";
import type { FlutterMutatorsStack } from './FlutterMutatorsStack';
import type Any from '../../../plugin/common/Any';
export class FlutterMutatorView {
    private mutatorsStack: FlutterMutatorsStack | null = null;
    private screenDensity: number = 0;
    private left: number = 0;
    private top: number = 0;
    private prevLeft: number = 0;
    private prevTop: number = 0;
    private onTouch = (q17: Any) => {
        let r17 = this.model.params as Record<string, number>;
        switch (q17.type) {
            case TouchType.Down:
                this.prevLeft = this.left;
                this.prevTop = this.top;
                r17.translateX = this.left;
                r17.translateY = this.top;
                break;
            case TouchType.Move:
                r17.translateX = this.prevLeft;
                r17.translateY = this.prevTop;
                this.prevLeft = this.left;
                this.prevTop = this.top;
                break;
            case TouchType.Up:
            case TouchType.Cancel:
            default:
                break;
        }
    };
    private model: DVModel = createDVModelFromJson(new DVModelParam("Column", [], { backgroundColor: Color.Red }, { onTouch: this.onTouch }));
    setOnDescendantFocusChangeListener(n17: () => void, o17: () => void) {
        let p17 = this.model.events as Record<string, DVModelEvents>;
        p17.onFocus = n17;
        p17.onBlur = o17;
    }
    public setLayoutParams(k17: DVModelParameters): void {
        if (this.model.params == null) {
            this.model.params = new DVModelParameters();
        }
        let l17 = this.model.params as Record<string, string | number | Array<string | number> | matrix4.Matrix4Transit>;
        let m17 = k17 as Record<string, string | number | Array<string | number> | matrix4.Matrix4Transit>;
        l17.marginLeft = m17['marginLeft'];
        l17.marginTop = m17['marginTop'];
        l17.width = m17['width'];
        l17.height = m17['height'];
        this.left = m17.marginLeft as number;
        this.top = m17.marginTop as number;
    }
    public addDvModel(j17: DVModel): void {
        this.model?.children.push(j17);
    }
    public readyToDisplay(d17: FlutterMutatorsStack, e17: number, f17: number, g17: number, h17: number) {
        this.mutatorsStack = d17;
        this.left = e17;
        this.top = f17;
        let i17 = new DVModelParameters() as Record<string, string | number | Array<string | number> | matrix4.Matrix4Transit>;
        i17['marginLeft'] = e17;
        i17['marginTop'] = f17;
        i17['width'] = g17;
        i17['height'] = h17;
        this.setLayoutParams(i17);
        this.dealMutators();
    }
    private dealMutators() {
        if (this.mutatorsStack == null) {
            return;
        }
        let x16 = this.mutatorsStack.getFinalClippingPaths();
        let y16 = this.mutatorsStack.getFinalClippingRects();
        let z16 = this.mutatorsStack.getFinalMatrix();
        let a17 = this.model.params as Record<string, string | number | Array<string | number> | matrix4.Matrix4Transit>;
        if (!x16.isEmpty()) {
            let c17 = x16.getLast();
            a17.pathWidth = c17.width;
            a17.pathHeight = c17.height;
            a17.pathCommands = c17.commands;
        }
        if (!y16.isEmpty()) {
            let b17 = y16.getLast();
            a17.rectWidth = b17.width;
            a17.rectHeight = b17.height;
            a17.rectRadius = b17.radius;
        }
        a17.matrix = z16;
    }
    public getDvModel(): DVModel | undefined {
        return this.model;
    }
}
class DVModelParam {
    compType: string;
    children: [
    ];
    attributes: Any;
    events: Any;
    constructor(t16: string, u16: [
    ], v16: Any, w16: Any) {
        this.compType = t16;
        this.children = u16;
        this.attributes = v16;
        this.events = w16;
    }
}
;
