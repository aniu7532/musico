import type { DVModel } from '../../view/DynamicView/dynamicView';
export declare class Params {
    direction: Direction;
    platformView: PlatformView;
}
export default abstract class PlatformView {
    getType(): string {
        return 'default';
    }
    abstract getView(): WrappedBuilder<[
        Params
    ]>;
    onFlutterViewAttached(o68: DVModel): void { }
    onFlutterViewDetached(): void { }
    abstract dispose(): void;
    onInputConnectionLocked(): void { }
    onInputConnectionUnlocked(): void { }
}
