if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    context?;
    viewId?: string;
}
import type common from "@ohos:app.ability.common";
import { FlutterPage } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/index";
let storage = LocalStorage.getShared();
const EVENT_BACK_PRESS = 'EVENT_BACK_PRESS';
class Index extends ViewPU {
    constructor(l, m, n, o = -1, p = undefined, q) {
        super(l, n, o, q);
        if (typeof p === "function") {
            this.paramsGenerator_ = p;
        }
        this.context = getContext(this) as common.UIAbilityContext;
        this.setInitiallyProvidedValue(m);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(k: Index_Params) {
        if (k.context !== undefined) {
            this.context = k.context;
        }
    }
    updateStateVars(j: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(i) {
        this.__viewId.purgeDependencyOnElmtId(i);
    }
    aboutToBeDeleted() {
        this.__viewId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private context;
    private __viewId: ObservedPropertyAbstractPU<string> = this.createLocalStorageLink<string>('viewId', "", "viewId");
    get viewId() {
        return this.__viewId.get();
    }
    set viewId(h: string) {
        this.__viewId.set(h);
    }
    initialRender() {
        this.observeComponentCreation2((f, g) => {
            Column.create();
        }, Column);
        {
            this.observeComponentCreation2((b, c) => {
                if (c) {
                    let d = new FlutterPage(this, { viewId: this.viewId }, undefined, b, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 30, col: 7 });
                    ViewPU.create(d);
                    let e = () => {
                        return {
                            viewId: this.viewId
                        };
                    };
                    d.paramsGenerator_ = e;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(b, {
                        viewId: this.viewId
                    });
                }
            }, { name: "FlutterPage" });
        }
        Column.pop();
    }
    onBackPress(): boolean {
        this.context.eventHub.emit(EVENT_BACK_PRESS);
        return true;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
if (storage && storage.routeName != undefined && storage.storage != undefined) {
    registerNamedRoute(() => new Index(undefined, {}, storage.useSharedStorage ? LocalStorage.getShared() : storage.storage), storage.routeName, { bundleName: "com.example.beat", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
}
else if (storage && storage.routeName != undefined && storage.storage == undefined) {
    registerNamedRoute(() => new Index(undefined, {}, storage.useSharedStorage ? LocalStorage.getShared() : storage.storage), storage.routeName, { bundleName: "com.example.beat", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
}
else if (storage && storage.routeName == undefined && storage.storage != undefined) {
    registerNamedRoute(() => new Index(undefined, {}, storage.useSharedStorage ? LocalStorage.getShared() : storage.storage), "", { bundleName: "com.example.beat", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
}
else if (storage && storage.useSharedStorage != undefined) {
    registerNamedRoute(() => new Index(undefined, {}, storage.useSharedStorage ? LocalStorage.getShared() : undefined), "", { bundleName: "com.example.beat", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
}
else {
    registerNamedRoute(() => new Index(undefined, {}, storage), "", { bundleName: "com.example.beat", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
}
