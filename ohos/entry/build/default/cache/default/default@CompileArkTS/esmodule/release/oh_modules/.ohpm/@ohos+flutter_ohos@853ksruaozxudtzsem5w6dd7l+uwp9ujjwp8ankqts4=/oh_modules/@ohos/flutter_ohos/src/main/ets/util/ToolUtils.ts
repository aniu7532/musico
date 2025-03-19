import type Any from '../plugin/common/Any';
export default class ToolUtils {
    static isObj(y82: Object): boolean {
        return y82 && typeof (y82) == 'object';
    }
    static implementsInterface(w82: Any, x82: string): boolean {
        return Reflect.has(w82, x82) && typeof w82[x82] === 'function';
    }
}
