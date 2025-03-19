import type UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
export interface AbilityPluginBinding {
    getAbility(): UIAbility;
    addOnNewWantListener(listener: NewWantListener): void;
    removeOnNewWantListener(listener: NewWantListener): void;
    addOnWindowFocusChangedListener(listener: WindowFocusChangedListener): void;
    removeOnWindowFocusChangedListener(listener: WindowFocusChangedListener): void;
    addOnSaveStateListener(listener: OnSaveStateListener): void;
    removeOnSaveStateListener(listener: OnSaveStateListener): void;
}
export interface NewWantListener {
    onNewWant(want: Want, launchParams: AbilityConstant.LaunchParam): void;
}
export interface WindowFocusChangedListener {
    onWindowFocusChanged(hasFocus: boolean): void;
}
export interface OnSaveStateListener {
    onSaveState(reason: AbilityConstant.StateType, wantParam: Record<string, Object>): AbilityConstant.OnSaveResult;
}
