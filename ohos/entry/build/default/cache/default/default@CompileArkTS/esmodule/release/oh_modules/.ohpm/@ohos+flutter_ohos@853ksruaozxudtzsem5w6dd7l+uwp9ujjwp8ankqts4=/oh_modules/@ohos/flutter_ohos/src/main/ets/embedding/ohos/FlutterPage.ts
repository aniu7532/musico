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
    constructor(f41, g41, h41, i41 = -1, j41 = undefined, k41) {
        super(f41, h41, i41, k41);
        if (typeof j41 === "function") {
            this.paramsGenerator_ = j41;
        }
        this.__viewId = new SynchedPropertySimpleOneWayPU(g41.viewId, this, "viewId");
        this.__xComponentType = new SynchedPropertySimpleOneWayPU(g41.xComponentType, this, "xComponentType");
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
        this.setInitiallyProvidedValue(g41);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(e41: FlutterPage_Params) {
        if (e41.viewId === undefined) {
            this.__viewId.set("");
        }
        if (e41.xComponentType === undefined) {
            this.__xComponentType.set(XComponentType.SURFACE);
        }
        if (e41.splashScreenView !== undefined) {
            this.splashScreenView = e41.splashScreenView;
        }
        if (e41.showSplashScreen !== undefined) {
            this.showSplashScreen = e41.showSplashScreen;
        }
        if (e41.checkFullScreen !== undefined) {
            this.checkFullScreen = e41.checkFullScreen;
        }
        if (e41.checkKeyboard !== undefined) {
            this.checkKeyboard = e41.checkKeyboard;
        }
        if (e41.checkGesture !== undefined) {
            this.checkGesture = e41.checkGesture;
        }
        if (e41.checkMouseWheel !== undefined) {
            this.checkMouseWheel = e41.checkMouseWheel;
        }
        if (e41.rootDvModel !== undefined) {
            this.rootDvModel = e41.rootDvModel;
        }
        if (e41.isNeedUpdate !== undefined) {
            this.isNeedUpdate = e41.isNeedUpdate;
        }
        if (e41.flutterView !== undefined) {
            this.flutterView = e41.flutterView;
        }
        if (e41.lastArea !== undefined) {
            this.lastArea = e41.lastArea;
        }
        if (e41.panOption !== undefined) {
            this.panOption = e41.panOption;
        }
    }
    updateStateVars(d41: FlutterPage_Params) {
        this.__viewId.reset(d41.viewId);
        this.__xComponentType.reset(d41.xComponentType);
    }
    purgeVariableDependenciesOnElmtId(c41) {
        this.__viewId.purgeDependencyOnElmtId(c41);
        this.__xComponentType.purgeDependencyOnElmtId(c41);
        this.__showSplashScreen.purgeDependencyOnElmtId(c41);
        this.__checkFullScreen.purgeDependencyOnElmtId(c41);
        this.__checkKeyboard.purgeDependencyOnElmtId(c41);
        this.__checkGesture.purgeDependencyOnElmtId(c41);
        this.__checkMouseWheel.purgeDependencyOnElmtId(c41);
        this.__storageLinkWidth.purgeDependencyOnElmtId(c41);
        this.__storageLinkHeight.purgeDependencyOnElmtId(c41);
        this.__rootDvModel.purgeDependencyOnElmtId(c41);
        this.__isNeedUpdate.purgeDependencyOnElmtId(c41);
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
    set viewId(b41: string) {
        this.__viewId.set(b41);
    }
    private __xComponentType: SynchedPropertySimpleOneWayPU<XComponentType>;
    get xComponentType() {
        return this.__xComponentType.get();
    }
    set xComponentType(a41: XComponentType) {
        this.__xComponentType.set(a41);
    }
    doNothingBuilder(z40 = null) { }
    private __splashScreenView;
    defaultPage(p39 = null) {
        this.observeComponentCreation2((h40, i40) => {
            Stack.create();
            Stack.defaultFocus(true);
            Stack.onAreaChange((x40: Area, y40: Area) => {
                if (this.isNeedUpdate || !this.lastArea || x40.width != y40.width
                    || x40.height != y40.height) {
                    Log.d(TAG, "onAreaChange, old=" + JSON.stringify(x40));
                    Log.d(TAG, "onAreaChange, new=" + JSON.stringify(y40));
                    this.lastArea = y40;
                    this.flutterView?.onAreaChange(y40);
                    this.isNeedUpdate = false;
                }
            });
            Stack.onKeyPreIme((w40: KeyEvent) => {
                return this.flutterView?.onKeyPreIme(w40) ?? false;
            });
            Stack.onKeyEvent((v40: KeyEvent) => {
                return this.flutterView?.onKeyEvent(v40) ?? false;
            });
            Stack.onDragEnter((s40: DragEvent, t40: string) => {
                FlutterManager.getInstance().getDragEnterCbs().forEach(u40 => {
                    u40.do(s40, t40);
                });
                Log.d(TAG, "onDragEnter");
            });
            Stack.onDragMove((p40: DragEvent, q40: string) => {
                FlutterManager.getInstance().getDragMoveCbs().forEach(r40 => {
                    r40.do(p40, q40);
                });
                Log.d(TAG, "onDragMove");
            });
            Stack.onDragLeave((m40: DragEvent, n40: string) => {
                FlutterManager.getInstance().getDragLeaveCbs().forEach(o40 => {
                    o40.do(m40, n40);
                });
                Log.d(TAG, "onDragLeave");
            });
            Stack.onDrop((j40: DragEvent, k40: string) => {
                FlutterManager.getInstance().getDropCbs().forEach(l40 => {
                    l40.do(j40, k40);
                });
                Log.d(TAG, "onDrop");
            });
        }, Stack);
        this.observeComponentCreation2((x39, y39) => {
            ForEach.create();
            const z39 = b40 => {
                const c40 = b40;
                {
                    this.observeComponentCreation2((d40, e40) => {
                        if (e40) {
                            let f40 = new DynamicView(this, {
                                model: c40 as DVModel,
                                params: c40.params,
                                events: c40.events,
                                children: c40.children,
                                customBuilder: c40.builder
                            }, undefined, d40, () => { }, { page: "oh_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/oh_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterPage.ets", line: 37, col: 9 });
                            ViewPU.create(f40);
                            let g40 = () => {
                                return {
                                    model: c40 as DVModel,
                                    params: c40.params,
                                    events: c40.events,
                                    children: c40.children,
                                    customBuilder: c40.builder
                                };
                            };
                            f40.paramsGenerator_ = g40;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(d40, {
                                model: c40 as DVModel,
                                params: c40.params,
                                events: c40.events,
                                children: c40.children
                            });
                        }
                    }, { name: "DynamicView" });
                }
            };
            this.forEachUpdateFunction(x39, this.rootDvModel!!, z39, (a40: any) => `${a40.id_}`, false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((v39, w39) => {
            Text.create('');
            Text.id('emptyFocusText' + this.viewId);
            Text.size({ width: 0, height: 0 });
            Text.opacity(0);
            Text.focusable(true);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((s39, t39) => {
            XComponent.create({ id: this.viewId, type: this.xComponentType, libraryname: 'flutter' }, "com.example.beat/entry");
            XComponent.id(this.viewId);
            XComponent.focusable(true);
            XComponent.onLoad((u39) => {
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
        this.observeComponentCreation2((q39, r39) => {
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
    mouseWheelPage(c38 = null) {
        this.observeComponentCreation2((u38, v38) => {
            Stack.create();
            Stack.defaultFocus(true);
            Stack.onAreaChange((n39: Area, o39: Area) => {
                if (this.isNeedUpdate || !this.lastArea || n39.width != o39.width
                    || n39.height != o39.height) {
                    Log.d(TAG, "onAreaChange, old=" + JSON.stringify(n39));
                    Log.d(TAG, "onAreaChange, new=" + JSON.stringify(o39));
                    this.lastArea = o39;
                    this.flutterView?.onAreaChange(o39);
                    this.isNeedUpdate = false;
                }
            });
            Stack.onKeyPreIme((m39: KeyEvent) => {
                return this.flutterView?.onKeyPreIme(m39) ?? false;
            });
            Stack.onKeyEvent((l39: KeyEvent) => {
                return this.flutterView?.onKeyEvent(l39) ?? false;
            });
            Stack.onDragEnter((i39: DragEvent, j39: string) => {
                FlutterManager.getInstance().getDragEnterCbs().forEach(k39 => {
                    k39.do(i39, j39);
                });
                Log.d(TAG, "onDragEnter");
            });
            Stack.onDragMove((f39: DragEvent, g39: string) => {
                FlutterManager.getInstance().getDragMoveCbs().forEach(h39 => {
                    h39.do(f39, g39);
                });
                Log.d(TAG, "onDragMove");
            });
            Stack.onDragLeave((c39: DragEvent, d39: string) => {
                FlutterManager.getInstance().getDragLeaveCbs().forEach(e39 => {
                    e39.do(c39, d39);
                });
                Log.d(TAG, "onDragLeave");
            });
            Stack.onDrop((z38: DragEvent, a39: string) => {
                FlutterManager.getInstance().getDropCbs().forEach(b39 => {
                    b39.do(z38, a39);
                });
                Log.d(TAG, "onDrop");
            });
            Gesture.create(GesturePriority.Low);
            PanGesture.create(this.panOption);
            PanGesture.onActionStart((y38: GestureEvent) => {
                this.flutterView?.onMouseWheel("actionStart", y38);
            });
            PanGesture.onActionUpdate((x38: GestureEvent) => {
                this.flutterView?.onMouseWheel("actionUpdate", x38);
            });
            PanGesture.onActionEnd((w38: GestureEvent) => {
                this.flutterView?.onMouseWheel("actionEnd", w38);
            });
            PanGesture.pop();
            Gesture.pop();
        }, Stack);
        this.observeComponentCreation2((k38, l38) => {
            ForEach.create();
            const m38 = o38 => {
                const p38 = o38;
                {
                    this.observeComponentCreation2((q38, r38) => {
                        if (r38) {
                            let s38 = new DynamicView(this, {
                                model: p38 as DVModel,
                                params: p38.params,
                                events: p38.events,
                                children: p38.children,
                                customBuilder: p38.builder
                            }, undefined, q38, () => { }, { page: "oh_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/oh_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/FlutterPage.ets", line: 116, col: 9 });
                            ViewPU.create(s38);
                            let t38 = () => {
                                return {
                                    model: p38 as DVModel,
                                    params: p38.params,
                                    events: p38.events,
                                    children: p38.children,
                                    customBuilder: p38.builder
                                };
                            };
                            s38.paramsGenerator_ = t38;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(q38, {
                                model: p38 as DVModel,
                                params: p38.params,
                                events: p38.events,
                                children: p38.children
                            });
                        }
                    }, { name: "DynamicView" });
                }
            };
            this.forEachUpdateFunction(k38, this.rootDvModel!!, m38, (n38: any) => `${n38.id_}`, false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((i38, j38) => {
            Text.create('');
            Text.id('emptyFocusText' + this.viewId);
            Text.size({ width: 0, height: 0 });
            Text.opacity(0);
            Text.focusable(true);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((f38, g38) => {
            XComponent.create({ id: this.viewId, type: this.xComponentType, libraryname: 'flutter' }, "com.example.beat/entry");
            XComponent.id(this.viewId);
            XComponent.focusable(true);
            XComponent.onLoad((h38) => {
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
        this.observeComponentCreation2((d38, e38) => {
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
    set showSplashScreen(b38: boolean) {
        this.__showSplashScreen.set(b38);
    }
    private __checkFullScreen: ObservedPropertySimplePU<boolean>;
    get checkFullScreen() {
        return this.__checkFullScreen.get();
    }
    set checkFullScreen(a38: boolean) {
        this.__checkFullScreen.set(a38);
    }
    private __checkKeyboard: ObservedPropertySimplePU<boolean>;
    get checkKeyboard() {
        return this.__checkKeyboard.get();
    }
    set checkKeyboard(z37: boolean) {
        this.__checkKeyboard.set(z37);
    }
    private __checkGesture: ObservedPropertySimplePU<boolean>;
    get checkGesture() {
        return this.__checkGesture.get();
    }
    set checkGesture(y37: boolean) {
        this.__checkGesture.set(y37);
    }
    private __checkMouseWheel: ObservedPropertySimplePU<boolean>;
    get checkMouseWheel() {
        return this.__checkMouseWheel.get();
    }
    set checkMouseWheel(x37: boolean) {
        this.__checkMouseWheel.set(x37);
    }
    private __storageLinkWidth: ObservedPropertyAbstractPU<number>;
    get storageLinkWidth() {
        return this.__storageLinkWidth.get();
    }
    set storageLinkWidth(w37: number) {
        this.__storageLinkWidth.set(w37);
    }
    private __storageLinkHeight: ObservedPropertyAbstractPU<number>;
    get storageLinkHeight() {
        return this.__storageLinkHeight.get();
    }
    set storageLinkHeight(v37: number) {
        this.__storageLinkHeight.set(v37);
    }
    private __rootDvModel: ObservedPropertyObjectPU<DVModelChildren | undefined>;
    get rootDvModel() {
        return this.__rootDvModel.get();
    }
    set rootDvModel(u37: DVModelChildren | undefined) {
        this.__rootDvModel.set(u37);
    }
    private __isNeedUpdate: ObservedPropertySimplePU<boolean>;
    get isNeedUpdate() {
        return this.__isNeedUpdate.get();
    }
    set isNeedUpdate(t37: boolean) {
        this.__isNeedUpdate.set(t37);
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
        this.observeComponentCreation2((r37, s37) => {
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
