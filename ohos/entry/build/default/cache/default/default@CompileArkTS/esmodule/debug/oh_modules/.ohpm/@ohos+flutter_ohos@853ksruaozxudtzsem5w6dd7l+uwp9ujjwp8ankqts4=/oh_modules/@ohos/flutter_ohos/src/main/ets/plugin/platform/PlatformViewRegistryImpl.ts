import HashMap from "@ohos:util.HashMap";
import type PlatformViewFactory from './PlatformViewFactory';
import type PlatformViewRegistry from './PlatformViewRegistry';
export default class PlatformViewRegistryImpl implements PlatformViewRegistry {
    // Maps a platform view type id to its factory.
    private viewFactories: HashMap<String, PlatformViewFactory>;
    constructor() {
        this.viewFactories = new HashMap();
    }
    registerViewFactory(viewTypeId: string, factory: PlatformViewFactory): boolean {
        if (this.viewFactories.hasKey(viewTypeId)) {
            return false;
        }
        this.viewFactories.set(viewTypeId, factory);
        return true;
    }
    getFactory(viewTypeId: string): PlatformViewFactory {
        return this.viewFactories.get(viewTypeId);
    }
}
