import type OhosTouchProcessor from '../../embedding/ohos/OhosTouchProcessor';
import { DVModelParameters } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicView";
import type { DVModel } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicView";
import type Any from '../common/Any';
const TAG: string = "PlatformViewWrapper";
export class PlatformViewWrapper {
    private prevLeft: number = 0;
    private prevTop: number = 0;
    private left: number = 0;
    private top: number = 0;
    private bufferWidth: number = 0;
    private bufferHeight: number = 0;
    private touchProcessor: OhosTouchProcessor | null = null;
    private model: DVModel | undefined;
    public setTouchProcessor(m73: OhosTouchProcessor): void {
        this.touchProcessor = m73;
    }
    constructor() {
    }
    public getDvModel(): DVModel {
        return this.model!;
    }
    setParams: (params: DVModelParameters, key: string, element: Any) => void = (i73: DVModelParameters, j73: string, k73: Any): void => {
        let l73 = i73 as Record<string, Any>;
        l73[j73] = k73;
    };
    getParams: (params: DVModelParameters, element: string) => string | Any = (f73: DVModelParameters, g73: string): string | Any => {
        let h73 = f73 as Record<string, Any>;
        return h73[g73];
    };
    public setLayoutParams(e73: DVModelParameters): void {
        if (!this.model) {
            return;
        }
        if (this.model.params == null) {
            this.model.params = new DVModelParameters();
        }
        this.setParams(this.model.params, "marginLeft", this.getParams(e73, "marginLeft"));
        this.setParams(this.model.params, "marginTop", this.getParams(e73, "marginTop"));
        this.left = this.getParams(e73, "marginLeft");
        this.top = this.getParams(e73, "marginTop");
        this.setParams(this.model.params, "width", this.getParams(e73, "width"));
        this.setParams(this.model.params, "height", this.getParams(e73, "height"));
    }
    public addDvModel(d73: DVModel): void {
        this.model = d73;
    }
}
class DVModelParam {
    compType: string;
    children: [
    ];
    constructor(b73: string, c73: [
    ]) {
        this.compType = b73;
        this.children = c73;
    }
}
;
