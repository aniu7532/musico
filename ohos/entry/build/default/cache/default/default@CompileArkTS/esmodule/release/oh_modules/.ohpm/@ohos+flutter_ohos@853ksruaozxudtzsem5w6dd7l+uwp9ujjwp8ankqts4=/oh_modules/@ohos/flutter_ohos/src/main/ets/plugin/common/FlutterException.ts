import type Any from './Any';
export default class FlutterException implements Error {
    stack?: string;
    message: string;
    name: string = "";
    code: string;
    details: Any;
    constructor(h49: string, i49: string, j49: Any) {
        this.message = i49;
        this.code = h49;
        this.details = j49;
    }
}
