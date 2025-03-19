import HashMap from "@ohos:util.HashMap";
import type PlatformViewFactory from './PlatformViewFactory';
import type PlatformViewRegistry from './PlatformViewRegistry';
export default class PlatformViewRegistryImpl implements PlatformViewRegistry {
    private viewFactories: HashMap<String, PlatformViewFactory>;
    constructor() {
        this.viewFactories = new HashMap();
    }
    registerViewFactory(u68: string, v68: PlatformViewFactory): boolean {
        if (this.viewFactories.hasKey(u68)) {
            return false;
        }
        this.viewFactories.set(u68, v68);
        return true;
    }
    getFactory(t68: string): PlatformViewFactory {
        return this.viewFactories.get(t68);
    }
}
