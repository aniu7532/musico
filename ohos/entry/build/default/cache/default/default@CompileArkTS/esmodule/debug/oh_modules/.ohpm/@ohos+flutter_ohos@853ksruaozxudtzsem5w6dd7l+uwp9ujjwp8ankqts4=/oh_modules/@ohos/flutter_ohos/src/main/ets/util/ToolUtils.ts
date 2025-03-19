import type Any from '../plugin/common/Any';
export default class ToolUtils {
    static isObj(object: Object): boolean {
        return object && typeof (object) == 'object';
    }
    static implementsInterface(obj: Any, method: string): boolean {
        return Reflect.has(obj, method) && typeof obj[method] === 'function';
    }
}
