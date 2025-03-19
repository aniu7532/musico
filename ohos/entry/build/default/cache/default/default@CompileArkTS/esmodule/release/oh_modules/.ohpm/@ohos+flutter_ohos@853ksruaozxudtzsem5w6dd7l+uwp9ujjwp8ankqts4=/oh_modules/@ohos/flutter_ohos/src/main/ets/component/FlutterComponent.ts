if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FlutterComponent_Params {
}
export default class FlutterComponent extends ViewPU {
    constructor(e1, f1, g1, h1 = -1, i1 = undefined, j1) {
        super(e1, g1, h1, j1);
        if (typeof i1 === "function") {
            this.paramsGenerator_ = i1;
        }
        this.setInitiallyProvidedValue(f1);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(d1: FlutterComponent_Params) {
    }
    updateStateVars(c1: FlutterComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(b1) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((z, a1) => {
            Row.create();
            Row.height('100%');
        }, Row);
        this.observeComponentCreation2((x, y) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((v, w) => {
            Text.create("xxx");
            Text.fontSize(50);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
