import type FlutterEngine from "./FlutterEngine";
export default class FlutterEngineCache {
    private static instance: FlutterEngineCache;
    private cachedEngines: Map<String, FlutterEngine> = new Map();
    static getInstance(): FlutterEngineCache {
        if (FlutterEngineCache.instance == null) {
            FlutterEngineCache.instance = new FlutterEngineCache();
        }
        return FlutterEngineCache.instance;
    }
    contains(i6: String): boolean {
        return this.cachedEngines.has(i6);
    }
    get(h6: String): FlutterEngine | null {
        return this.cachedEngines.get(h6) || null;
    }
    put(f6: String, g6: FlutterEngine | null): void {
        if (g6 != null) {
            this.cachedEngines.set(f6, g6);
        }
        else {
            this.cachedEngines.delete(f6);
        }
    }
    remove(e6: String): void {
        this.put(e6, null);
    }
    clear(): void {
        this.cachedEngines.clear();
    }
}
