if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FlutterPage_Params {
    viewId?: string;
    xComponentType?: XComponentType;
    splashScreenView?: () => void;
    showSplashScreen?: boolean;
    checkFullScreen?: boolean;
    checkKeyboard?: boolean;
    checkGesture?: boolean;
    checkMouseWheel?: boolean;
    storageLinkWidth?: number;
    storageLinkHeight?: number;
    rootDvModel?: DVModelChildren | undefined;
    isNeedUpdate?: boolean;
    flutterView?: FlutterView | null;
    lastArea?: Area;
    panOption?: PanGestureOptions;
}
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type { FlutterView } from '../../view/FlutterView';
import FlutterManager from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterManager";
import { DynamicView } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicView";
import type { DVModel, DVModelChildren } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/DynamicView/dynamicView";
const TAG = "FlutterPage";
export const OHOS_FLUTTER_PAGE_UPDATE = "ohos_flutter_page_update";
export class FlutterPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__viewId = new SynchedPropertySimpleOneWayPU(params.viewId, this, "viewId");
        this.__xComponentType = new SynchedPropertySimpleOneWayPU(params.xComponentType, this, "xComponentType");
        this.splashScreenView = this.doNothingBuilder;
        this.__showSplashScreen = new ObservedPropertySimplePU(true, this, "showSplashScreen");
        this.__checkFullScreen = new ObservedPropertySimplePU(true, this, "checkFullScreen");
        this.__checkKeyboard = new ObservedPropertySimplePU(true, this, "checkKeyboard");
        this.__checkGesture = new ObservedPropertySimplePU(true, this, "checkGesture");
        this.__checkMouseWheel = new ObservedPropertySimplePU(true, this, "checkMouseWheel");
        this.__storageLinkWidth = this.createStorageLink('nodeWidth', 0, "storageLinkWidth");
        this.__storageLinkHeight = this.createStorageLink('nodeHeight', 0, "storageLinkHeight");
        this.__rootDvModel = new ObservedPropertyObjectPU(undefined, this, "rootDvModel");
        this.__isNeedUpdate = new ObservedPropertySimplePU(false, this, "isNeedUpdate");
        this.flutterView = undefined;
        this.lastArea = undefined;
        this.panOption = new PanGestureOptions({ direction: PanDirection.Up | PanDirection.Down });
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FlutterPage_Params) {
        if (params.viewId === undefined) {
            this.__viewId.set("");
        }
        if (params.xComponentType === undefined) {
            this.__xComponentType.set(XComponentType.SURFACE);
        }
        if (params.splashScreenView !== undefined) {
            this.splashScreenView = params.splashScreenView;
        }
        if (params.showSplashScreen !== undefined) {
            this.showSplashScreen = params.showSplashScreen;
        }
        if (params.checkFullScreen !== undefined) {
            this.checkFullScreen = params.checkFullScreen;
        }
        if (params.checkKeyboard !== undefined) {
            this.checkKeyboard = params.checkKeyboard;
        }
        if (params.checkGesture !== undefined) {
            this.checkGesture = params.checkGesture;
        }
        if (params.checkMouseWheel !== undefined) {
            this.checkMouseWheel = params.checkMouseWheel;
        }
        if (params.rootDvModel !== undefined) {
            this.rootDvModel = params.rootDvModel;
        }
        if (params.isNeedUpdate !== undefined) {
            this.isNeedUpdate = params.isNeedUpdate;
        }
        if (params.flutterView !== undefined) {
            this.flutterView = params.flutterView;
        }
        if (params.lastArea !== undefined) {
            this.lastArea = params.lastArea;
        }
        if (params.panOption !== undefined) {
            this.panOption = params.panOption;
        }
    }
    updateStateVars(params: FlutterPage_Params) {
        this.__viewId.reset(params.viewId);
        this.__xComponentType.reset(params.xComponentType);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__viewId.purgeDependencyOnElmtId(rmElmtId);
        this.__xComponentType.purgeDependencyOnElmtId(rmElmtId);
        this.__showSplashScreen.purgeDependencyOnElmtId(rmElmtId);
        this.__checkFullScreen.purgeDependencyOnElmtId(rmElmtId);
        this.__checkKeyboard.purgeDependencyOnElmtId(rmElmtId);
        this.__checkGesture.purgeDependencyOnElmtId(rmElmtId);
        this.__checkMouseWheel.purgeDependencyOnElmtId(rmElmtId);
        this.__storageLinkWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__storageLinkHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__rootDvModel.purgeDependencyOnElmtId(rmElmtId);
        this.__isNeedUpdate.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__viewId.aboutToBeDeleted();
        this.__xComponentType.aboutToBeDeleted();
        this.__showSplashScreen.aboutToBeDeleted();
        this.__checkFullScreen.aboutToBeDeleted();
        this.__checkKeyboard.aboutToBeDeleted();
        this.__checkGesture.aboutToBeDeleted();
        this.__checkMouseWheel.aboutToBeDeleted();
        this.__storageLinkWidth.aboutToBeDeleted();
        this.__storageLinkHeight.aboutToBeDeleted();
        this.__rootDvModel.aboutToBeDeleted();
        this.__isNeedUpdate.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __viewId: SynchedPropertySimpleOneWayPU<string>;
    get viewId() {
        return this.__viewId.get();
    }
    set viewId(newValue: string) {
        this.__viewId.set(newValue);
    }
    private __xComponentType: SynchedPropertySimpleOneWayPU<XComponentType>;
    get xComponentType() {
        return this.__xComponentType.get();
    }
    set xComponentType(newValue: XComponentType) {
        this.__xComponentType.set(newValue);
    }
    doNothingBuilder(parent = null) { }
    private __splashScreenView;
    defaultPage(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.defaultFocus(true);
            Stack.onAreaChange((oldValue: Area, newValue: Area) => {
                if (this.isNeedUpdate || !this.lastArea || oldValue.width != newValue.width
                    || oldValue.height != newValue.height) {
                    Log.d(TAG, "onAreaChange, old=" + JSON.stringify(oldValue));
                    Log.d(TAG, "onAreaChange, new=" + JSON.stringify(newValue));
                    this.lastArea = newValue;
                    this.flutterView?.onAreaChange(newValue);
                    this.isNeedUpdate = false;
                }
            });
            Stack.onKeyPreIme((event: KeyEvent) => {
                return this.flutterView?.onKeyPreIme(event) ?? false;
            });
            Stack.onKeyEvent((event: KeyEvent) => {
                return this.flutterView?.onKeyEvent(event) ?? false;
            });
            Stack.onDragEnter((event: DragEvent, extraParams: string) => {
                FlutterManager.getInstance().getDragEnterCbs().forEach(dragEnterCb => {
                    dragEnterCb.do(event, extraParams);
                });
                Log.d(TAG, "onDragEnter");
            });
            Stack.onDragMove((event: DragEvent, extraParams: string) => {
                FlutterManager.getInstance().getDragMoveCbs().forEach(dragMoveCb => {
                    dragMoveCb.do(event, extraParams);
                });
                Log.d(TAG, "onDragMove");
            });
            Stack.onDragLeave((event: DragEvent, extraParams: string) => {
                FlutterManager.getInstance().getDragLeaveCbs().forEach(dragLeaveCb => {
                    dragLeaveCb.do(event, extraParams);
                });
                Log.d(TAG, "onDragLeave");
            });
            Stack.onDrop((event: DragEvent, extraParams: string) => {
                FlutterManager.getInstance().getDropCbs().forEach(dropCb => {
                    dropCb.do(event, extraParams);
                });
                Log.d(TAG, "onDrop");
            });
        }, Stack);
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
                            }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/oh_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterPage.ets", line: 37, col: 9 });
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
            this.forEachUpdateFunction(elmtId, this.rootDvModel!!, forEachItemGenFunction, (child: any) => `${child.id_}`, false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('');
            Text.id('emptyFocusText' + this.viewId);
            Text.size({ width: 0, height: 0 });
            Text.opacity(0);
            Text.focusable(true);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            XComponent.create({ id: this.viewId, type: this.xComponentType, libraryname: 'flutter' }, "com.example.beat/entry");
            XComponent.id(this.viewId);
            XComponent.focusable(true);
            XComponent.onLoad((context) => {
                this.flutterView?.onSurfaceCreated();
                Log.d(TAG, "XComponent onLoad ");
            });
            XComponent.onDestroy(() => {
                Log.d(TAG, "XComponent onDestroy ");
                this.flutterView?.onSurfaceDestroyed();
            });
            XComponent.renderFit(RenderFit.TOP_LEFT);
            XComponent.backgroundColor(Color.Transparent);
        }, XComponent);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showSplashScreen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.splashScreenView.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    mouseWheelPage(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.defaultFocus(true);
            Stack.onAreaChange((oldValue: Area, newValue: Area) => {
                if (this.isNeedUpdate || !this.lastArea || oldValue.width != newValue.width
                    || oldValue.height != newValue.height) {
                    Log.d(TAG, "onAreaChange, old=" + JSON.stringify(oldValue));
                    Log.d(TAG, "onAreaChange, new=" + JSON.stringify(newValue));
                    this.lastArea = newValue;
                    this.flutterView?.onAreaChange(newValue);
                    this.isNeedUpdate = false;
                }
            });
            Stack.onKeyPreIme((event: KeyEvent) => {
                return this.flutterView?.onKeyPreIme(event) ?? false;
            });
            Stack.onKeyEvent((event: KeyEvent) => {
                return this.flutterView?.onKeyEvent(event) ?? false;
            });
            Stack.onDragEnter((event: DragEvent, extraParams: string) => {
                FlutterManager.getInstance().getDragEnterCbs().forEach(dragEnterCb => {
                    dragEnterCb.do(event, extraParams);
                });
                Log.d(TAG, "onDragEnter");
            });
            Stack.onDragMove((event: DragEvent, extraParams: string) => {
                FlutterManager.getInstance().getDragMoveCbs().forEach(dragMoveCb => {
                    dragMoveCb.do(event, extraParams);
                });
                Log.d(TAG, "onDragMove");
            });
            Stack.onDragLeave((event: DragEvent, extraParams: string) => {
                FlutterManager.getInstance().getDragLeaveCbs().forEach(dragLeaveCb => {
                    dragLeaveCb.do(event, extraParams);
                });
                Log.d(TAG, "onDragLeave");
            });
            Stack.onDrop((event: DragEvent, extraParams: string) => {
                FlutterManager.getInstance().getDropCbs().forEach(dropCb => {
                    dropCb.do(event, extraParams);
                });
                Log.d(TAG, "onDrop");
            });
            Gesture.create(GesturePriority.Low);
            PanGesture.create(this.panOption);
            PanGesture.onActionStart((event: GestureEvent) => {
                this.flutterView?.onMouseWheel("actionStart", event);
            });
            PanGesture.onActionUpdate((event: GestureEvent) => {
                this.flutterView?.onMouseWheel("actionUpdate", event);
            });
            PanGesture.onActionEnd((event: GestureEvent) => {
                this.flutterView?.onMouseWheel("actionEnd", event);
            });
            PanGesture.pop();
            Gesture.pop();
        }, Stack);
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
                            }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/oh_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterPage.ets", line: 116, col: 9 });
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
            this.forEachUpdateFunction(elmtId, this.rootDvModel!!, forEachItemGenFunction, (child: any) => `${child.id_}`, false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('');
            Text.id('emptyFocusText' + this.viewId);
            Text.size({ width: 0, height: 0 });
            Text.opacity(0);
            Text.focusable(true);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            XComponent.create({ id: this.viewId, type: this.xComponentType, libraryname: 'flutter' }, "com.example.beat/entry");
            XComponent.id(this.viewId);
            XComponent.focusable(true);
            XComponent.onLoad((context) => {
                this.flutterView?.onSurfaceCreated();
                Log.d(TAG, "XComponent onLoad ");
            });
            XComponent.onDestroy(() => {
                Log.d(TAG, "XComponent onDestroy ");
                this.flutterView?.onSurfaceDestroyed();
            });
            XComponent.renderFit(RenderFit.TOP_LEFT);
            XComponent.backgroundColor(Color.Transparent);
        }, XComponent);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showSplashScreen) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.splashScreenView.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    private __showSplashScreen: ObservedPropertySimplePU<boolean>;
    get showSplashScreen() {
        return this.__showSplashScreen.get();
    }
    set showSplashScreen(newValue: boolean) {
        this.__showSplashScreen.set(newValue);
    }
    private __checkFullScreen: ObservedPropertySimplePU<boolean>;
    get checkFullScreen() {
        return this.__checkFullScreen.get();
    }
    set checkFullScreen(newValue: boolean) {
        this.__checkFullScreen.set(newValue);
    }
    private __checkKeyboard: ObservedPropertySimplePU<boolean>;
    get checkKeyboard() {
        return this.__checkKeyboard.get();
    }
    set checkKeyboard(newValue: boolean) {
        this.__checkKeyboard.set(newValue);
    }
    private __checkGesture: ObservedPropertySimplePU<boolean>;
    get checkGesture() {
        return this.__checkGesture.get();
    }
    set checkGesture(newValue: boolean) {
        this.__checkGesture.set(newValue);
    }
    private __checkMouseWheel: ObservedPropertySimplePU<boolean>;
    get checkMouseWheel() {
        return this.__checkMouseWheel.get();
    }
    set checkMouseWheel(newValue: boolean) {
        this.__checkMouseWheel.set(newValue);
    }
    private __storageLinkWidth: ObservedPropertyAbstractPU<number>;
    get storageLinkWidth() {
        return this.__storageLinkWidth.get();
    }
    set storageLinkWidth(newValue: number) {
        this.__storageLinkWidth.set(newValue);
    }
    private __storageLinkHeight: ObservedPropertyAbstractPU<number>;
    get storageLinkHeight() {
        return this.__storageLinkHeight.get();
    }
    set storageLinkHeight(newValue: number) {
        this.__storageLinkHeight.set(newValue);
    }
    private __rootDvModel: ObservedPropertyObjectPU<DVModelChildren | undefined>;
    get rootDvModel() {
        return this.__rootDvModel.get();
    }
    set rootDvModel(newValue: DVModelChildren | undefined) {
        this.__rootDvModel.set(newValue);
    }
    private __isNeedUpdate: ObservedPropertySimplePU<boolean>;
    get isNeedUpdate() {
        return this.__isNeedUpdate.get();
    }
    set isNeedUpdate(newValue: boolean) {
        this.__isNeedUpdate.set(newValue);
    }
    private flutterView?: FlutterView | null;
    private lastArea?: Area;
    private panOption: PanGestureOptions;
    aboutToAppear() {
        this.flutterView = FlutterManager.getInstance().getFlutterView(this.viewId);
        this.flutterView?.addFirstFrameListener(this);
        this.flutterView?.setCheckFullScreen(this.checkFullScreen);
        this.flutterView?.setCheckKeyboard(this.checkKeyboard);
        this.flutterView?.setCheckGesture(this.checkGesture);
        this.rootDvModel = this.flutterView!!.getDVModel().children;
        getContext().eventHub.on(OHOS_FLUTTER_PAGE_UPDATE, () => {
            this.isNeedUpdate = true;
        });
    }
    aboutToDisappear() {
        this.flutterView?.removeFirstFrameListener(this);
        getContext()?.eventHub.off(OHOS_FLUTTER_PAGE_UPDATE);
    }
    onFirstFrame() {
        this.showSplashScreen = false;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.checkMouseWheel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.mouseWheelPage.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.defaultPage.bind(this)();
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
