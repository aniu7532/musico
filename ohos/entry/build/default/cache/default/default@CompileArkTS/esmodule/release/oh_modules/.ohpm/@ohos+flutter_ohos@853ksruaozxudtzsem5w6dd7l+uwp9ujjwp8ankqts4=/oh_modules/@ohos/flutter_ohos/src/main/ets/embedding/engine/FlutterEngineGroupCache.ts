import type FlutterEngineGroup from './FlutterEngineGroup';
export default class FlutterEngineGroupCache {
    static readonly instance = new FlutterEngineGroupCache();
    private cachedEngineGroups = new Map<String, FlutterEngineGroup>();
    contains(h9: string): boolean {
        return this.cachedEngineGroups.has(h9);
    }
    get(g9: string): FlutterEngineGroup | null {
        return this.cachedEngineGroups.get(g9) ?? null;
    }
    put(e9: string, f9?: FlutterEngineGroup) {
        if (f9 != null) {
            this.cachedEngineGroups.set(e9, f9);
        }
        else {
            this.cachedEngineGroups.delete(e9);
        }
    }
    clear(): void {
        this.cachedEngineGroups.clear();
    }
}
