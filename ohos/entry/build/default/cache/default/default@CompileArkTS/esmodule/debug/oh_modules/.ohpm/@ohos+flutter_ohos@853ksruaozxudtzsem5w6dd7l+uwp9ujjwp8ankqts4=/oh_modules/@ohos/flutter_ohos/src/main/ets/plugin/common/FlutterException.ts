import type Any from './Any';
export default class FlutterException implements Error {
    stack?: string;
    message: string;
    name: string = "";
    code: string;
    details: Any;
    constructor(code: string, message: string, details: Any) {
        this.message = message;
        this.code = code;
        this.details = details;
    }
}
