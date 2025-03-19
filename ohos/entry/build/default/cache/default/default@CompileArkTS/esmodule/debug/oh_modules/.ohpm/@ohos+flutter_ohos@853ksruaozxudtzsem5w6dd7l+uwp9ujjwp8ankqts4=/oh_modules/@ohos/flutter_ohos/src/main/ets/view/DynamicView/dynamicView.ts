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
/**
 * Dynamic View creation
 * from a recursive data structure
 *
 * exported @Component: DynamicView
 * exported view model classes:
 * - DVModelContainer
 * - DVModel
 * - DVModelParameters
 * - DVModelEvents
 * - DVModelChildren
 *
 * The purpose of exporting the DVModel classes
 * is to make them available to the converter from
 * JD's XML format and the expression parser. These
 * components are expected to generate and update the
 * DVModel.
 *
 * An application written by JS should only import
 * DynamicView, DVModelContainer to be used in their own ArkUI
 * container view.
 */
/**
 * View Model classes
 */
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
    constructor(compType: string, params: DVModelParameters, events: DVModelEvents, children: DVModelChildren, builder?: Any) {
        this.id_ = nextId++;
        this.compType = compType;
        this.params = params ?? new DVModelParameters;
        this.events = events;
        this.children = children;
        this.builder = builder;
    }
    public getLayoutParams(): DVModelParameters {
        return this.params;
    }
}
// includes the root DVModel objects.
export class DVModelContainer {
    model: DVModel;
    constructor(model: DVModel) {
        this.model = model;
    }
}
export class DynamicView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__model = new SynchedPropertyNesedObjectPU(params.model, this, "model");
        this.__children = new SynchedPropertyNesedObjectPU(params.children, this, "children");
        this.__params = new SynchedPropertyNesedObjectPU(params.params, this, "params");
        this.__events = new SynchedPropertyNesedObjectPU(params.events, this, "events");
        this.customBuilder = undefined;
        this.getParams = (params: DVModelParameters, element: string): string | Any => {
            let params2 = params as Record<string, Any>;
            return params2[element];
        };
        this.getEvents = (events: DVModelEvents, element: string): Any => {
            let events2 = events as Record<string, Any>;
            return events2[element];
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DynamicView_Params) {
        this.__model.set(params.model);
        this.__children.set(params.children);
        this.__params.set(params.params);
        this.__events.set(params.events);
        if (params.customBuilder !== undefined) {
            this.customBuilder = params.customBuilder;
        }
        if (params.getParams !== undefined) {
            this.getParams = params.getParams;
        }
        if (params.getEvents !== undefined) {
            this.getEvents = params.getEvents;
        }
    }
    updateStateVars(params: DynamicView_Params) {
        this.__model.set(params.model);
        this.__children.set(params.children);
        this.__params.set(params.params);
        this.__events.set(params.events);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__model.purgeDependencyOnElmtId(rmElmtId);
        this.__children.purgeDependencyOnElmtId(rmElmtId);
        this.__params.purgeDependencyOnElmtId(rmElmtId);
        this.__events.purgeDependencyOnElmtId(rmElmtId);
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
    buildChildren(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const child = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new DynamicView(this, {
                                model: child as DVModel,
                                params: child.params,
                                events: child.events,
                                children: child.children,
                                customBuilder: child.builder
                            }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/oh_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicView.ets", line: 188, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    model: child as DVModel,
                                    params: child.params,
                                    events: child.events,
                                    children: child.children,
                                    customBuilder: child.builder
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                model: child as DVModel,
                                params: child.params,
                                events: child.events,
                                children: child.children
                            });
                        }
                    }, { name: "DynamicView" });
                }
            };
            this.forEachUpdateFunction(elmtId, this.children, forEachItemGenFunction, (child: Any) => `${child.id_}`, false, false);
        }, ForEach);
        ForEach.pop();
    }
    buildRow(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
    buildColumn(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
    buildStack(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
    buildText(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
    buildImage(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
    // Button with label
    buildButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
    buildNodeContainer(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
    buildCustom(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
    constructor(params: DVModelParameters) {
        this.params = params;
    }
}
