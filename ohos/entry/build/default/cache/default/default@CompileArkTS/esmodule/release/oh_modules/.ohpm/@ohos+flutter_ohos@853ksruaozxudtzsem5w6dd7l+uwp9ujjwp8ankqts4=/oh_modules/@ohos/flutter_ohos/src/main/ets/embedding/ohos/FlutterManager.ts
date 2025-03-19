import { FlutterView } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/view/FlutterView";
import type UIAbility from "@ohos:app.ability.UIAbility";
import window from "@ohos:window";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import HashMap from "@ohos:util.HashMap";
import List from "@ohos:util.List";
const TAG = "FlutterManager";
export default class FlutterManager {
    private static instance: FlutterManager;
    static getInstance(): FlutterManager {
        if (FlutterManager.instance == null) {
            FlutterManager.instance = new FlutterManager();
        }
        return FlutterManager.instance;
    }
    private flutterViewList = new Map<String, FlutterView>();
    private flutterViewIndex = 1;
    private uiAbilityList = new Array<UIAbility>();
    private windowStageList = new Map<UIAbility, window.WindowStage>();
    private mFullScreenListener: FullScreenListener = new DefaultFullScreenListener();
    private dragEnterCbId: number = 1;
    private dragMoveCbId: number = 1;
    private dragLeaveCbId: number = 1;
    private dropCbId: number = 1;
    private dragEnterCbs: HashMap<number, DragDropCallback> = new HashMap();
    private dragMoveCbs: HashMap<number, DragDropCallback> = new HashMap();
    private dragLeaveCbs: HashMap<number, DragDropCallback> = new HashMap();
    private dropCbs: HashMap<number, DragDropCallback> = new HashMap();
    private getValuesFromMap(n37: HashMap<number, DragDropCallback>): List<DragDropCallback> {
        let o37: List<DragDropCallback> = new List();
        n37.forEach((p37, q37) => {
            o37.add(p37);
        });
        return o37;
    }
    getDragEnterCbs(): List<DragDropCallback> {
        return this.getValuesFromMap(this.dragEnterCbs);
    }
    getDragMoveCbs(): List<DragDropCallback> {
        return this.getValuesFromMap(this.dragMoveCbs);
    }
    getDragLeaveCbs(): List<DragDropCallback> {
        return this.getValuesFromMap(this.dragLeaveCbs);
    }
    getDropCbs(): List<DragDropCallback> {
        return this.getValuesFromMap(this.dropCbs);
    }
    addDragEnterCb(m37: DragDropCallback): number {
        this.dragEnterCbs.set(this.dragEnterCbId, m37);
        return this.dragEnterCbId++;
    }
    addDragMoveCb(l37: DragDropCallback): number {
        this.dragMoveCbs.set(this.dragMoveCbId, l37);
        return this.dragMoveCbId++;
    }
    addDragLeaveCb(k37: DragDropCallback): number {
        this.dragLeaveCbs.set(this.dragLeaveCbId, k37);
        return this.dragLeaveCbId++;
    }
    addDropCb(j37: DragDropCallback): number {
        this.dropCbs.set(this.dropCbId, j37);
        return this.dropCbId++;
    }
    removeDragEnterCb(i37: number) {
        this.dragEnterCbs.remove(i37);
    }
    removeDragMoveCb(h37: number) {
        this.dragMoveCbs.remove(h37);
    }
    removeDragLeaveCb(g37: number) {
        this.dragLeaveCbs.remove(g37);
    }
    removeDropCb(f37: number) {
        this.dropCbs.remove(f37);
    }
    pushUIAbility(e37: UIAbility) {
        this.uiAbilityList.push(e37);
    }
    popUIAbility(b37: UIAbility) {
        let c37 = this.uiAbilityList.findIndex((d37: UIAbility) => d37 == b37);
        if (c37 >= 0) {
            this.uiAbilityList.splice(c37, 1);
        }
    }
    pushWindowStage(z36: UIAbility, a37: window.WindowStage) {
        this.windowStageList.set(z36, a37);
    }
    popWindowStage(y36: UIAbility) {
        this.windowStageList.delete(y36);
    }
    getWindowStage(x36: UIAbility): window.WindowStage {
        return this.windowStageList.get(x36)!!;
    }
    getUIAbility(v36?: Context): UIAbility {
        if (!v36 && this.uiAbilityList.length > 0) {
            return this.uiAbilityList[0];
        }
        return this.uiAbilityList.find((w36: UIAbility) => w36.context == v36)!!;
    }
    hasFlutterView(u36: string): boolean {
        return this.flutterViewList.has(u36);
    }
    getFlutterView(t36: string): FlutterView | null {
        return this.flutterViewList.get(t36) ?? null;
    }
    getFlutterViewList(): Map<String, FlutterView> {
        return this.flutterViewList;
    }
    private putFlutterView(r36: string, s36?: FlutterView): void {
        if (s36 != null) {
            this.flutterViewList.set(r36, s36);
        }
        else {
            this.flutterViewList.delete(r36);
        }
    }
    createFlutterView(p36: Context): FlutterView {
        let q36 = new FlutterView(`oh_flutter_${this.flutterViewIndex++}`, p36);
        this.putFlutterView(q36.getId(), q36);
        return q36;
    }
    clear(): void {
        this.flutterViewList.clear();
    }
    setFullScreenListener(o36: FullScreenListener) {
        this.mFullScreenListener = o36;
    }
    getFullScreenListener(): FullScreenListener {
        return this.mFullScreenListener;
    }
    setUseFullScreen(m36: boolean, n36?: Context | null | undefined) {
        this.mFullScreenListener.setUseFullScreen(m36, n36);
    }
    useFullScreen(): boolean {
        return this.mFullScreenListener.useFullScreen();
    }
}
export interface DragDropCallback {
    do(event: DragEvent, extraParams: string): void;
}
export interface FullScreenListener {
    useFullScreen(): boolean;
    setUseFullScreen(useFullScreen: boolean, context?: Context | null | undefined): void;
    onScreenStateChanged(data: window.WindowStatusType): void;
}
export class DefaultFullScreenListener implements FullScreenListener {
    private fullScreen: boolean = true;
    private skipCheck: boolean = false;
    useFullScreen(): boolean {
        return this.fullScreen;
    }
    setUseFullScreen(j36: boolean, k36?: Context | null | undefined): void {
        this.fullScreen = j36;
        this.skipCheck = true;
        k36 = k36 ?? getContext(this);
        let l36 = FlutterManager.getInstance()
            .getWindowStage(FlutterManager.getInstance().getUIAbility(k36));
        l36.getMainWindowSync().setWindowLayoutFullScreen(j36);
        Log.i(TAG, "WindowLayoutFullScreen is on");
    }
    onScreenStateChanged(i36: window.WindowStatusType): void {
        if (this.skipCheck) {
            Log.i(TAG, "onScreenStateChanged: skipCheck is on, WindowStatusType = " + i36);
            return;
        }
        switch (i36) {
            case window.WindowStatusType.FULL_SCREEN:
            case window.WindowStatusType.SPLIT_SCREEN:
            case window.WindowStatusType.FLOATING:
            case window.WindowStatusType.MAXIMIZE:
                this.fullScreen = true;
                Log.i(TAG, "onScreenStateChanged: fullScreen = true");
                break;
            default:
                this.fullScreen = false;
                Log.i(TAG, "onScreenStateChanged: fullScreen = false");
                break;
        }
    }
}
