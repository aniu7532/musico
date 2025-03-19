import StringUtils from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/StringUtils";
import type MessageCodec from './MessageCodec';
import StringCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StringCodec";
import TreeMap from "@ohos:util.TreeMap";
import HashMap from "@ohos:util.HashMap";
import LightWeightMap from "@ohos:util.LightWeightMap";
import PlainArray from "@ohos:util.PlainArray";
import List from "@ohos:util.List";
import LinkedList from "@ohos:util.LinkedList";
import type Any from './Any';
export default class JSONMessageCodec implements MessageCodec<Object> {
    static INSTANCE = new JSONMessageCodec();
    encodeMessage(a50: Any): ArrayBuffer {
        if (a50 == null) {
            return StringUtils.stringToArrayBuffer("");
        }
        return StringCodec.INSTANCE.encodeMessage(JSON.stringify(this.toBaseData(a50)));
    }
    decodeMessage(s49: ArrayBuffer | null): Any {
        if (s49 == null) {
            return StringUtils.stringToArrayBuffer("");
        }
        try {
            const u49 = StringCodec.INSTANCE.decodeMessage(s49);
            let v49: Record<string, Any> = JSON.parse(u49);
            if (v49 instanceof Object) {
                const w49 = Object.keys(v49);
                if (w49.includes('args')) {
                    let x49: Any = v49['args'];
                    if (x49 instanceof Object && !(x49 instanceof Array)) {
                        let y49: Map<string, Any> = new Map();
                        Object.keys(x49).forEach(z49 => {
                            y49.set(z49, x49[z49]);
                        });
                        v49['args'] = y49;
                    }
                }
            }
            return v49;
        }
        catch (t49) {
            throw new Error("Invalid JSON");
        }
    }
    toBaseData(k49: Any): Any {
        if (k49 == null || k49 == undefined) {
            return null;
        }
        else if (k49 instanceof List || k49 instanceof LinkedList) {
            return this.toBaseData(k49.convertToArray());
        }
        else if (k49 instanceof Map || k49 instanceof HashMap || k49 instanceof TreeMap
            || k49 instanceof LightWeightMap || k49 instanceof PlainArray) {
            let p49: Any = {};
            k49.forEach((q49: Any, r49: Any) => {
                p49[this.toBaseData(r49)] = this.toBaseData(q49);
            });
            return p49;
        }
        else if (k49 instanceof Array) {
            let n49: Array<Any> = [];
            k49.forEach((o49: Any) => {
                n49.push(this.toBaseData(o49));
            });
            return n49;
        }
        else if (k49 instanceof Object) {
            let l49: Any = {};
            Object.keys(k49).forEach((m49: Any) => {
                l49[this.toBaseData(m49)] = this.toBaseData(k49[m49]);
            });
            return l49;
        }
        else {
            return k49;
        }
    }
}
