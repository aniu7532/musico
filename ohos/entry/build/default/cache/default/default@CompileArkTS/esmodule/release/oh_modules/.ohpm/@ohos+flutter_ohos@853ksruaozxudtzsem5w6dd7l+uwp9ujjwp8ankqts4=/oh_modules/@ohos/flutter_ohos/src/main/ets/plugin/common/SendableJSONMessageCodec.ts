import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
import type SendableMessageCodec from './SendableMessageCodec';
import StringCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StringCodec";
import TreeMap from "@ohos:util.TreeMap";
import HashMap from "@ohos:util.HashMap";
import LightWeightMap from "@ohos:util.LightWeightMap";
import PlainArray from "@ohos:util.PlainArray";
import List from "@ohos:util.List";
import LinkedList from "@ohos:util.LinkedList";
import type Any from './Any';
export default class SendableJSONMessageCodec implements SendableMessageCodec<Object> {
    constructor() {
        "use sendable";
    }
    static INSTANCE: SendableJSONMessageCodec = new SendableJSONMessageCodec();
    encodeMessage(r52: Any): ArrayBuffer {
        if (r52 == null) {
            return StringUtils.stringToArrayBuffer("");
        }
        return StringCodec.INSTANCE.encodeMessage(JSON.stringify(this.toBaseData(r52)));
    }
    decodeMessage(j52: ArrayBuffer | null): Any {
        if (j52 == null) {
            return StringUtils.stringToArrayBuffer("");
        }
        try {
            const l52 = StringCodec.INSTANCE.decodeMessage(j52);
            let m52: Record<string, Any> = JSON.parse(l52);
            if (m52 instanceof Object) {
                const n52 = Object.keys(m52);
                if (n52.includes('args')) {
                    let o52: Any = m52['args'];
                    if (o52 instanceof Object && !(o52 instanceof Array)) {
                        let p52: Map<string, Any> = new Map();
                        Object.keys(o52).forEach(q52 => {
                            p52.set(q52, o52[q52]);
                        });
                        m52['args'] = p52;
                    }
                }
            }
            return m52;
        }
        catch (k52) {
            throw new Error("Invalid JSON");
        }
    }
    toBaseData(b52: Any): Any {
        if (b52 == null || b52 == undefined) {
            return "";
        }
        else if (b52 instanceof List || b52 instanceof LinkedList) {
            return this.toBaseData(b52.convertToArray());
        }
        else if (b52 instanceof Map || b52 instanceof HashMap || b52 instanceof TreeMap
            || b52 instanceof LightWeightMap || b52 instanceof PlainArray) {
            let g52: Any = {};
            b52.forEach((h52: Any, i52: Any) => {
                g52[this.toBaseData(i52)] = this.toBaseData(h52);
            });
            return g52;
        }
        else if (b52 instanceof Array) {
            let e52: Array<Any> = [];
            b52.forEach((f52: Any) => {
                e52.push(this.toBaseData(f52));
            });
            return e52;
        }
        else if (b52 instanceof Object) {
            let c52: Any = {};
            Object.keys(b52).forEach((d52: Any) => {
                c52[this.toBaseData(d52)] = this.toBaseData(b52[d52]);
            });
            return c52;
        }
        else {
            return b52;
        }
    }
}
