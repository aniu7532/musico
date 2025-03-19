if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DynamicView_Params {
    model?: DVModel;
    children?: DVModelChildren;
    params?: DVModelParameters;
    events?: DVModelEvents;
    customBuilder?: ($$: BuilderParams) => void;
    getParams?: (params: DVModelParameters, element: string) => string | Any;
    getEvents?: (events: DVModelEvents, element: string) => Any;
}
import type Any from '../../plugin/common/Any';
@Observed
export class DVModelParameters extends Object {
}
@Observed
export class DVModelEvents extends Object {
}
@Observed
export class DVModelChildren extends Array<DVModel> {
}
let nextId: number = 1;
@Observed
export class DVModel {
    id_: number;
    compType: string;
    params: DVModelParameters;
    events: DVModelEvents;
    children: DVModelChildren;
    builder: Any;
    constructor(r85: string, s85: DVModelParameters, t85: DVModelEvents, u85: DVModelChildren, v85?: Any) {
        this.id_ = nextId++;
        this.compType = r85;
        this.params = s85 ?? new DVModelParameters;
        this.events = t85;
        this.children = u85;
        this.builder = v85;
    }
    public getLayoutParams(): DVModelParameters {
        return this.params;
    }
}
export class DVModelContainer {
    model: DVModel;
    constructor(q85: DVModel) {
        this.model = q85;
    }
}
export class DynamicView extends ViewPU {
    constructor(e85, f85, g85, h85 = -1, i85 = undefined, j85) {
        super(e85, g85, h85, j85);
        if (typeof i85 === "function") {
            this.paramsGenerator_ = i85;
        }
        this.__model = new SynchedPropertyNesedObjectPU(f85.model, this, "model");
        this.__children = new SynchedPropertyNesedObjectPU(f85.children, this, "children");
        this.__params = new SynchedPropertyNesedObjectPU(f85.params, this, "params");
        this.__events = new SynchedPropertyNesedObjectPU(f85.events, this, "events");
        this.customBuilder = undefined;
        this.getParams = (n85: DVModelParameters, o85: string): string | Any => {
            let p85 = n85 as Record<string, Any>;
            return p85[o85];
        };
        this.getEvents = (k85: DVModelEvents, l85: string): Any => {
            let m85 = k85 as Record<string, Any>;
            return m85[l85];
        };
        this.setInitiallyProvidedValue(f85);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(d85: DynamicView_Params) {
        this.__model.set(d85.model);
        this.__children.set(d85.children);
        this.__params.set(d85.params);
        this.__events.set(d85.events);
        if (d85.customBuilder !== undefined) {
            this.customBuilder = d85.customBuilder;
        }
        if (d85.getParams !== undefined) {
            this.getParams = d85.getParams;
        }
        if (d85.getEvents !== undefined) {
            this.getEvents = d85.getEvents;
        }
    }
    updateStateVars(c85: DynamicView_Params) {
        this.__model.set(c85.model);
        this.__children.set(c85.children);
        this.__params.set(c85.params);
        this.__events.set(c85.events);
    }
    purgeVariableDependenciesOnElmtId(b85) {
        this.__model.purgeDependencyOnElmtId(b85);
        this.__children.purgeDependencyOnElmtId(b85);
        this.__params.purgeDependencyOnElmtId(b85);
        this.__events.purgeDependencyOnElmtId(b85);
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__children.aboutToBeDeleted();
        this.__params.aboutToBeDeleted();
        this.__events.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __model: SynchedPropertyNesedObjectPU<DVModel>;
    get model() {
        return this.__model.get();
    }
    private __children: SynchedPropertyNesedObjectPU<DVModelChildren>;
    get children() {
        return this.__children.get();
    }
    private __params: SynchedPropertyNesedObjectPU<DVModelParameters>;
    get params() {
        return this.__params.get();
    }
    private __events: SynchedPropertyNesedObjectPU<DVModelEvents>;
    get events() {
        return this.__events.get();
    }
    private __customBuilder?;
    private getParams: (params: DVModelParameters, element: string) => string | Any;
    private getEvents: (events: DVModelEvents, element: string) => Any;
    buildChildren(q84 = null) {
        this.observeComponentCreation2((r84, s84) => {
            ForEach.create();
            const t84 = v84 => {
                const w84 = v84;
                {
                    this.observeComponentCreation2((x84, y84) => {
                        if (y84) {
                            let z84 = new DynamicView(this, {
                                model: w84 as DVModel,
                                params: w84.params,
                                events: w84.events,
                                children: w84.children,
                                customBuilder: w84.builder
                            }, undefined, x84, () => { }, { page: "oh_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/oh_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicView.ets", line: 188, col: 9 });
                            ViewPU.create(z84);
                            let a85 = () => {
                                return {
                                    model: w84 as DVModel,
                                    params: w84.params,
                                    events: w84.events,
                                    children: w84.children,
                                    customBuilder: w84.builder
                                };
                            };
                            z84.paramsGenerator_ = a85;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(x84, {
                                model: w84 as DVModel,
                                params: w84.params,
                                events: w84.events,
                                children: w84.children
                            });
                        }
                    }, { name: "DynamicView" });
                }
            };
            this.forEachUpdateFunction(r84, this.children, t84, (u84: Any) => `${u84.id_}`, false, false);
        }, ForEach);
        ForEach.pop();
    }
    buildRow(n84 = null) {
        this.observeComponentCreation2((o84, p84) => {
            Row.create();
            Row.width(this.getParams(ObservedObject.GetRawObject(this.params), "width"));
            Row.height(this.getParams(ObservedObject.GetRawObject(this.params), "height"));
            Row.backgroundColor(this.getParams(ObservedObject.GetRawObject(this.params), "backgroundColor"));
            Row.onClick(this.getEvents(ObservedObject.GetRawObject(this.events), "onClick"));
            Row.margin({
                left: this.getParams(ObservedObject.GetRawObject(this.params), "marginLeft"),
                right: this.getParams(ObservedObject.GetRawObject(this.params), "marginRight"),
                top: this.getParams(ObservedObject.GetRawObject(this.params), "marginTop"),
                bottom: this.getParams(ObservedObject.GetRawObject(this.params), "marginBottom")
            });
            Row.onTouch(this.getEvents(ObservedObject.GetRawObject(this.events), "onTouch"));
            Row.onFocus(this.getEvents(ObservedObject.GetRawObject(this.events), "onFocus"));
            Row.onBlur(this.getEvents(ObservedObject.GetRawObject(this.events), "onBlur"));
            Row.translate({
                x: this.getParams(ObservedObject.GetRawObject(this.params), "translateX"),
                y: this.getParams(ObservedObject.GetRawObject(this.params), "translateY"),
                z: this.getParams(ObservedObject.GetRawObject(this.params), "translateZ")
            });
            Row.transform(this.getParams(ObservedObject.GetRawObject(this.params), "matrix"));
            Row.direction(this.getParams(ObservedObject.GetRawObject(this.params), "direction"));
            Row.clip(this.getParams(ObservedObject.GetRawObject(this.params), "rectWidth") ? new Rect({
                width: this.getParams(ObservedObject.GetRawObject(this.params), "rectWidth"),
                height: this.getParams(ObservedObject.GetRawObject(this.params), "rectHeight"),
                radius: this.getParams(ObservedObject.GetRawObject(this.params), "rectRadius")
            }) : null);
            Row.clip(this.getParams(ObservedObject.GetRawObject(this.params), "pathWidth") ? new Path({
                width: this.getParams(ObservedObject.GetRawObject(this.params), "pathWidth"),
                height: this.getParams(ObservedObject.GetRawObject(this.params), "pathHeight"),
                commands: this.getParams(ObservedObject.GetRawObject(this.params), "pathCommands")
            }) : null);
        }, Row);
        this.buildChildren.bind(this)();
        Row.pop();
    }
    buildColumn(k84 = null) {
        this.observeComponentCreation2((l84, m84) => {
            Column.create();
            Column.width(this.getParams(ObservedObject.GetRawObject(this.params), "width"));
            Column.height(this.getParams(ObservedObject.GetRawObject(this.params), "height"));
            Column.backgroundColor(this.getParams(ObservedObject.GetRawObject(this.params), "backgroundColor"));
            Column.onClick(this.getEvents(ObservedObject.GetRawObject(this.events), "onClick"));
            Column.margin({
                left: this.getParams(ObservedObject.GetRawObject(this.params), "marginLeft"),
                right: this.getParams(ObservedObject.GetRawObject(this.params), "marginRight"),
                top: this.getParams(ObservedObject.GetRawObject(this.params), "marginTop"),
                bottom: this.getParams(ObservedObject.GetRawObject(this.params), "marginBottom")
            });
            Column.onTouch(this.getEvents(ObservedObject.GetRawObject(this.events), "onTouch"));
            Column.onFocus(this.getEvents(ObservedObject.GetRawObject(this.events), "onFocus"));
            Column.onBlur(this.getEvents(ObservedObject.GetRawObject(this.events), "onBlur"));
            Column.translate({
                x: this.getParams(ObservedObject.GetRawObject(this.params), "translateX"),
                y: this.getParams(ObservedObject.GetRawObject(this.params), "translateY"),
                z: this.getParams(ObservedObject.GetRawObject(this.params), "translateZ")
            });
            Column.transform(this.getParams(ObservedObject.GetRawObject(this.params), "matrix"));
            Column.direction(this.getParams(ObservedObject.GetRawObject(this.params), "direction"));
            Column.clip(this.getParams(ObservedObject.GetRawObject(this.params), "rectWidth") ? new Rect({
                width: this.getParams(ObservedObject.GetRawObject(this.params), "rectWidth"),
                height: this.getParams(ObservedObject.GetRawObject(this.params), "rectHeight"),
                radius: this.getParams(ObservedObject.GetRawObject(this.params), "rectRadius")
            }) : null);
            Column.clip(this.getParams(ObservedObject.GetRawObject(this.params), "pathWidth") ? new Path({
                width: this.getParams(ObservedObject.GetRawObject(this.params), "pathWidth"),
                height: this.getParams(ObservedObject.GetRawObject(this.params), "pathHeight"),
                commands: this.getParams(ObservedObject.GetRawObject(this.params), "pathCommands")
            }) : null);
        }, Column);
        this.buildChildren.bind(this)();
        Column.pop();
    }
    buildStack(h84 = null) {
        this.observeComponentCreation2((i84, j84) => {
            Stack.create();
            Stack.width(this.getParams(ObservedObject.GetRawObject(this.params), "width"));
            Stack.height(this.getParams(ObservedObject.GetRawObject(this.params), "height"));
            Stack.backgroundColor(this.getParams(ObservedObject.GetRawObject(this.params), "backgroundColor"));
            Stack.onClick(this.getEvents(ObservedObject.GetRawObject(this.events), "onClick"));
            Stack.margin({
                left: this.getParams(ObservedObject.GetRawObject(this.params), "marginLeft"),
                right: this.getParams(ObservedObject.GetRawObject(this.params), "marginRight"),
                top: this.getParams(ObservedObject.GetRawObject(this.params), "marginTop"),
                bottom: this.getParams(ObservedObject.GetRawObject(this.params), "marginBottom")
            });
            Stack.onTouch(this.getEvents(ObservedObject.GetRawObject(this.events), "onTouch"));
            Stack.onFocus(this.getEvents(ObservedObject.GetRawObject(this.events), "onFocus"));
            Stack.onBlur(this.getEvents(ObservedObject.GetRawObject(this.events), "onBlur"));
            Stack.translate({
                x: this.getParams(ObservedObject.GetRawObject(this.params), "translateX"),
                y: this.getParams(ObservedObject.GetRawObject(this.params), "translateY"),
                z: this.getParams(ObservedObject.GetRawObject(this.params), "translateZ")
            });
            Stack.transform(this.getParams(ObservedObject.GetRawObject(this.params), "matrix"));
            Stack.direction(this.getParams(ObservedObject.GetRawObject(this.params), "direction"));
            Stack.clip(this.getParams(ObservedObject.GetRawObject(this.params), "rectWidth") ? new Rect({
                width: this.getParams(ObservedObject.GetRawObject(this.params), "rectWidth"),
                height: this.getParams(ObservedObject.GetRawObject(this.params), "rectHeight"),
                radius: this.getParams(ObservedObject.GetRawObject(this.params), "rectRadius")
            }) : null);
            Stack.clip(this.getParams(ObservedObject.GetRawObject(this.params), "pathWidth") ? new Path({
                width: this.getParams(ObservedObject.GetRawObject(this.params), "pathWidth"),
                height: this.getParams(ObservedObject.GetRawObject(this.params), "pathHeight"),
                commands: this.getParams(ObservedObject.GetRawObject(this.params), "pathCommands")
            }) : null);
            Stack.alignContent(this.getParams(ObservedObject.GetRawObject(this.params), "alignContent"));
        }, Stack);
        this.buildChildren.bind(this)();
        Stack.pop();
    }
    buildText(e84 = null) {
        this.observeComponentCreation2((f84, g84) => {
            Text.create(`${this.getParams(ObservedObject.GetRawObject(this.params), "value")}`);
            Text.width(this.getParams(ObservedObject.GetRawObject(this.params), "width"));
            Text.height(this.getParams(ObservedObject.GetRawObject(this.params), "height"));
            Text.backgroundColor(this.getParams(ObservedObject.GetRawObject(this.params), "backgroundColor"));
            Text.onClick(this.getEvents(ObservedObject.GetRawObject(this.events), "onClick"));
            Text.margin({
                left: this.getParams(ObservedObject.GetRawObject(this.params), "marginLeft"),
                right: this.getParams(ObservedObject.GetRawObject(this.params), "marginRight"),
                top: this.getParams(ObservedObject.GetRawObject(this.params), "marginTop"),
                bottom: this.getParams(ObservedObject.GetRawObject(this.params), "marginBottom")
            });
            Text.onTouch(this.getEvents(ObservedObject.GetRawObject(this.events), "onTouch"));
            Text.onFocus(this.getEvents(ObservedObject.GetRawObject(this.events), "onFocus"));
            Text.onBlur(this.getEvents(ObservedObject.GetRawObject(this.events), "onBlur"));
            Text.translate({
                x: this.getParams(ObservedObject.GetRawObject(this.params), "translateX"),
                y: this.getParams(ObservedObject.GetRawObject(this.params), "translateY"),
                z: this.getParams(ObservedObject.GetRawObject(this.params), "translateZ")
            });
            Text.transform(this.getParams(ObservedObject.GetRawObject(this.params), "matrix"));
            Text.direction(this.getParams(ObservedObject.GetRawObject(this.params), "direction"));
            Text.fontColor(this.getParams(ObservedObject.GetRawObject(this.params), "fontColor"));
        }, Text);
        Text.pop();
    }
    buildImage(b84 = null) {
        this.observeComponentCreation2((c84, d84) => {
            Image.create(this.getParams(ObservedObject.GetRawObject(this.params), "src"));
            Image.width(this.getParams(ObservedObject.GetRawObject(this.params), "width"));
            Image.height(this.getParams(ObservedObject.GetRawObject(this.params), "height"));
            Image.backgroundColor(this.getParams(ObservedObject.GetRawObject(this.params), "backgroundColor"));
            Image.onClick(this.getEvents(ObservedObject.GetRawObject(this.events), "onClick"));
            Image.margin({
                left: this.getParams(ObservedObject.GetRawObject(this.params), "marginLeft"),
                right: this.getParams(ObservedObject.GetRawObject(this.params), "marginRight"),
                top: this.getParams(ObservedObject.GetRawObject(this.params), "marginTop"),
                bottom: this.getParams(ObservedObject.GetRawObject(this.params), "marginBottom")
            });
            Image.onTouch(this.getEvents(ObservedObject.GetRawObject(this.events), "onTouch"));
            Image.onFocus(this.getEvents(ObservedObject.GetRawObject(this.events), "onFocus"));
            Image.onBlur(this.getEvents(ObservedObject.GetRawObject(this.events), "onBlur"));
            Image.translate({
                x: this.getParams(ObservedObject.GetRawObject(this.params), "translateX"),
                y: this.getParams(ObservedObject.GetRawObject(this.params), "translateY"),
                z: this.getParams(ObservedObject.GetRawObject(this.params), "translateZ")
            });
            Image.transform(this.getParams(ObservedObject.GetRawObject(this.params), "matrix"));
            Image.direction(this.getParams(ObservedObject.GetRawObject(this.params), "direction"));
        }, Image);
    }
    buildButton(y83 = null) {
        this.observeComponentCreation2((z83, a84) => {
            Button.createWithLabel(this.getParams(ObservedObject.GetRawObject(this.params), "value"));
            Button.width(this.getParams(ObservedObject.GetRawObject(this.params), "width"));
            Button.height(this.getParams(ObservedObject.GetRawObject(this.params), "height"));
            Button.backgroundColor(this.getParams(ObservedObject.GetRawObject(this.params), "backgroundColor"));
            Button.onClick(this.getEvents(ObservedObject.GetRawObject(this.events), "onClick"));
            Button.margin({
                left: this.getParams(ObservedObject.GetRawObject(this.params), "marginLeft"),
                right: this.getParams(ObservedObject.GetRawObject(this.params), "marginRight"),
                top: this.getParams(ObservedObject.GetRawObject(this.params), "marginTop"),
                bottom: this.getParams(ObservedObject.GetRawObject(this.params), "marginBottom")
            });
            Button.onTouch(this.getEvents(ObservedObject.GetRawObject(this.events), "onTouch"));
            Button.onFocus(this.getEvents(ObservedObject.GetRawObject(this.events), "onFocus"));
            Button.onBlur(this.getEvents(ObservedObject.GetRawObject(this.events), "onBlur"));
            Button.translate({
                x: this.getParams(ObservedObject.GetRawObject(this.params), "translateX"),
                y: this.getParams(ObservedObject.GetRawObject(this.params), "translateY"),
                z: this.getParams(ObservedObject.GetRawObject(this.params), "translateZ")
            });
            Button.transform(this.getParams(ObservedObject.GetRawObject(this.params), "matrix"));
            Button.direction(this.getParams(ObservedObject.GetRawObject(this.params), "direction"));
        }, Button);
        Button.pop();
    }
    buildNodeContainer(v83 = null) {
        this.observeComponentCreation2((w83, x83) => {
            NodeContainer.create(this.getParams(ObservedObject.GetRawObject(this.params), "nodeController"));
            NodeContainer.width(this.getParams(ObservedObject.GetRawObject(this.params), "width"));
            NodeContainer.height(this.getParams(ObservedObject.GetRawObject(this.params), "height"));
            NodeContainer.backgroundColor(this.getParams(ObservedObject.GetRawObject(this.params), "backgroundColor"));
            NodeContainer.onClick(this.getEvents(ObservedObject.GetRawObject(this.events), "onClick"));
            NodeContainer.margin({
                left: this.getParams(ObservedObject.GetRawObject(this.params), "marginLeft"),
                right: this.getParams(ObservedObject.GetRawObject(this.params), "marginRight"),
                top: this.getParams(ObservedObject.GetRawObject(this.params), "marginTop"),
                bottom: this.getParams(ObservedObject.GetRawObject(this.params), "marginBottom")
            });
            NodeContainer.onTouch(this.getEvents(ObservedObject.GetRawObject(this.events), "onTouch"));
            NodeContainer.onFocus(this.getEvents(ObservedObject.GetRawObject(this.events), "onFocus"));
            NodeContainer.onBlur(this.getEvents(ObservedObject.GetRawObject(this.events), "onBlur"));
            NodeContainer.translate({
                x: this.getParams(ObservedObject.GetRawObject(this.params), "translateX"),
                y: this.getParams(ObservedObject.GetRawObject(this.params), "translateY"),
                z: this.getParams(ObservedObject.GetRawObject(this.params), "translateZ")
            });
            NodeContainer.transform(this.getParams(ObservedObject.GetRawObject(this.params), "matrix"));
            NodeContainer.direction(this.getParams(ObservedObject.GetRawObject(this.params), "direction"));
            NodeContainer.position({
                x: (this.params as Record<string, any>)['left'] as number,
                y: (this.params as Record<string, any>)['top'] as number
            });
        }, NodeContainer);
    }
    buildCustom(s83 = null) {
        this.observeComponentCreation2((t83, u83) => {
            If.create();
            if (this.customBuilder) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.customBuilder.bind(this)(new BuilderParams(this.params));
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((q83, r83) => {
            If.create();
            if (this.model.compType == "Column") {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildColumn.bind(this)();
                });
            }
            else if (this.model.compType == "Row") {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildRow.bind(this)();
                });
            }
            else if (this.model.compType == "Stack") {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.buildStack.bind(this)();
                });
            }
            else if (this.model.compType == "Text") {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.buildText.bind(this)();
                });
            }
            else if (this.model.compType == "Image") {
                this.ifElseBranchUpdateFunction(4, () => {
                    this.buildImage.bind(this)();
                });
            }
            else if (this.model.compType == "Button") {
                this.ifElseBranchUpdateFunction(5, () => {
                    this.buildButton.bind(this)();
                });
            }
            else if (this.model.compType == "NodeContainer") {
                this.ifElseBranchUpdateFunction(6, () => {
                    this.buildNodeContainer.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(7, () => {
                    this.buildCustom.bind(this)();
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class BuilderParams {
    params: DVModelParameters;
    constructor(p83: DVModelParameters) {
        this.params = p83;
    }
}
