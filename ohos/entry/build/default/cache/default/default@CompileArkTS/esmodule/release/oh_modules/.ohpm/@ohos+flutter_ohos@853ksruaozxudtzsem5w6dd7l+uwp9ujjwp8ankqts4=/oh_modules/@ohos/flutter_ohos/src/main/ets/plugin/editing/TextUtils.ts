import FlutterNapi from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/FlutterNapi";
const LINE_FEED: number = 0x0A;
const CARRIAGE_RETURN: number = 0x0D;
const COMBINING_ENCLOSING_KEYCAP: number = 0x20E3;
const CANCEL_TAG: number = 0xE007F;
const ZERO_WIDTH_JOINER: number = 0x200D;
const TAG = "TextUtils";
export class FlutterTextUtils {
    static isEmoji(g66: number): boolean {
        return FlutterNapi.unicodeIsEmoji(g66);
    }
    static isEmojiModifier(f66: number): boolean {
        return FlutterNapi.unicodeIsEmojiModifier(f66);
    }
    static isEmojiModifierBase(e66: number): boolean {
        return FlutterNapi.unicodeIsEmojiModifierBase(e66);
    }
    static isVariationSelector(d66: number): boolean {
        return FlutterNapi.unicodeIsVariationSelector(d66);
    }
    static isRegionalIndicatorSymbol(c66: number): boolean {
        return FlutterNapi.unicodeIsRegionalIndicatorSymbol(c66);
    }
    static isTagSpecChar(b66: number): boolean {
        return 0xE0020 <= b66 && b66 <= 0xE007E;
    }
    static isKeycapBase(a66: number): boolean {
        return ('0'.charCodeAt(0) <= a66 && a66 <= '9'.charCodeAt(0)) || a66 == '#'.charCodeAt(0) || a66 == '*'.charCodeAt(0);
    }
    static codePointBefore(w65: string, x65: number): number {
        if (x65 <= 0 || x65 > w65.length) {
            throw new RangeError('Offset out of range');
        }
        const y65 = w65[x65 - 1];
        if (x65 > 1 && y65 >= '\uDC00' && y65 <= '\uDFFF') {
            const z65 = w65[x65 - 2];
            if (z65 >= '\uD800' && z65 <= '\uDBFF') {
                return (z65.charCodeAt(0) - 0xD800) * 0x400 + (y65.charCodeAt(0) - 0xDC00) + 0x10000;
            }
        }
        return y65.charCodeAt(0);
    }
    static codePointAt(s65: string, t65: number): number {
        if (t65 >= s65.length) {
            throw new RangeError('Offset out of range');
        }
        let u65 = s65[t65];
        if (u65 >= '\uD800' && u65 <= '\uDBFF' && t65 + 1 < s65.length) {
            const v65 = s65[t65 + 1];
            if (v65 >= '\uDC00' && v65 <= '\uDFFF') {
                return (u65.charCodeAt(0) - 0xD800) * 0x400 + (v65.charCodeAt(0) - 0xDC00) + 0x10000;
            }
        }
        return u65.charCodeAt(0);
    }
    static charCount(r65: number): number {
        if (r65 <= 0xFFFF) {
            return 1;
        }
        return 2;
    }
    static getOffsetBefore(i65: string, j65: number): number {
        if (j65 <= 1) {
            return 0;
        }
        let k65: number = FlutterTextUtils.codePointBefore(i65, j65);
        let l65: number = FlutterTextUtils.charCount(k65);
        let m65: number = j65 - l65;
        if (m65 == 0) {
            return 0;
        }
        if (k65 == LINE_FEED) {
            k65 = FlutterTextUtils.codePointBefore(i65, m65);
            if (k65 == CARRIAGE_RETURN) {
                ++l65;
            }
            return j65 - l65;
        }
        if (FlutterTextUtils.isRegionalIndicatorSymbol(k65)) {
            k65 = FlutterTextUtils.codePointBefore(i65, m65);
            m65 -= FlutterTextUtils.charCount(k65);
            let q65: number = 1;
            while (m65 > 0 && FlutterTextUtils.isRegionalIndicatorSymbol(k65)) {
                k65 = FlutterTextUtils.codePointBefore(i65, m65);
                m65 -= FlutterTextUtils.charCount(k65);
                q65++;
            }
            if (FlutterTextUtils.isRegionalIndicatorSymbol(k65)) {
                q65++;
            }
            if (q65 % 2 == 0) {
                l65 += 2;
            }
            return j65 - l65;
        }
        if (k65 == COMBINING_ENCLOSING_KEYCAP) {
            k65 = FlutterTextUtils.codePointBefore(i65, m65);
            m65 -= FlutterTextUtils.charCount(k65);
            if (m65 > 0 && FlutterTextUtils.isVariationSelector(k65)) {
                let p65: number = FlutterTextUtils.codePointBefore(i65, m65);
                if (FlutterTextUtils.isKeycapBase(p65)) {
                    l65 += FlutterTextUtils.charCount(k65) + FlutterTextUtils.charCount(p65);
                }
            }
            else if (FlutterTextUtils.isKeycapBase(k65)) {
                l65 += FlutterTextUtils.charCount(k65);
            }
            return j65 - l65;
        }
        if (k65 == CANCEL_TAG) {
            k65 = FlutterTextUtils.codePointBefore(i65, m65);
            m65 -= FlutterTextUtils.charCount(k65);
            while (m65 > 0 && FlutterTextUtils.isTagSpecChar(k65)) {
                l65 += FlutterTextUtils.charCount(k65);
                k65 = FlutterTextUtils.codePointBefore(i65, m65);
                m65 -= FlutterTextUtils.charCount(k65);
            }
            if (!FlutterTextUtils.isEmoji(k65)) {
                return j65 - 2;
            }
            l65 += FlutterTextUtils.charCount(k65);
        }
        if (FlutterTextUtils.isVariationSelector(k65)) {
            k65 = FlutterTextUtils.codePointBefore(i65, m65);
            if (!FlutterTextUtils.isEmoji(k65)) {
                return j65 - l65;
            }
            l65 += FlutterTextUtils.charCount(k65);
            m65 -= FlutterTextUtils.charCount(k65);
        }
        if (FlutterTextUtils.isEmoji(k65)) {
            let n65: boolean = false;
            let o65: number = 0;
            do {
                if (n65) {
                    l65 += FlutterTextUtils.charCount(k65) + o65 + 1;
                    n65 = false;
                }
                o65 = 0;
                if (FlutterTextUtils.isEmojiModifier(k65)) {
                    k65 = FlutterTextUtils.codePointBefore(i65, m65);
                    m65 -= FlutterTextUtils.charCount(k65);
                    if (m65 > 0 && FlutterTextUtils.isVariationSelector(k65)) {
                        k65 = FlutterTextUtils.codePointBefore(i65, m65);
                        if (!FlutterTextUtils.isEmoji(k65)) {
                            return j65 - l65;
                        }
                        o65 = FlutterTextUtils.charCount(k65);
                        m65 -= FlutterTextUtils.charCount(k65);
                    }
                    if (FlutterTextUtils.isEmojiModifierBase(k65)) {
                        l65 += o65 + FlutterTextUtils.charCount(k65);
                    }
                    break;
                }
                if (m65 > 0) {
                    k65 = FlutterTextUtils.codePointBefore(i65, m65);
                    m65 -= FlutterTextUtils.charCount(k65);
                    if (k65 == ZERO_WIDTH_JOINER) {
                        n65 = true;
                        k65 = FlutterTextUtils.codePointBefore(i65, m65);
                        m65 -= FlutterTextUtils.charCount(k65);
                        if (m65 > 0 && FlutterTextUtils.isVariationSelector(k65)) {
                            k65 = FlutterTextUtils.codePointBefore(i65, m65);
                            o65 = FlutterTextUtils.charCount(k65);
                            m65 -= FlutterTextUtils.charCount(k65);
                        }
                    }
                }
                if (m65 == 0) {
                    break;
                }
            } while (n65 && FlutterTextUtils.isEmoji(k65));
            if (n65 && m65 == 0) {
                l65 += FlutterTextUtils.charCount(k65) + o65 + 1;
                n65 = false;
            }
        }
        return j65 - l65;
    }
    static getOffsetAfter(w64: string, x64: number): number {
        const y64 = w64.length;
        if (x64 >= y64 - 1) {
            return y64;
        }
        let z64: number = FlutterTextUtils.codePointAt(w64, x64);
        let a65: number = FlutterTextUtils.charCount(z64);
        let b65: number = x64 + a65;
        if (b65 == 0) {
            return 0;
        }
        if (z64 == LINE_FEED) {
            z64 = FlutterTextUtils.codePointAt(w64, b65);
            if (z64 == CARRIAGE_RETURN) {
                ++a65;
            }
            return x64 + a65;
        }
        if (FlutterTextUtils.isRegionalIndicatorSymbol(z64)) {
            if (b65 >= y64 - 1
                || !FlutterTextUtils.isRegionalIndicatorSymbol(FlutterTextUtils.codePointAt(w64, b65))) {
                return x64 + a65;
            }
            let g65: number = 0;
            let h65: number = x64;
            while (h65 > 0
                && FlutterTextUtils.isRegionalIndicatorSymbol(FlutterTextUtils.codePointBefore(w64, h65))) {
                h65 -= FlutterTextUtils.charCount(FlutterTextUtils.codePointBefore(w64, h65));
                g65++;
            }
            if (g65 % 2 == 0) {
                a65 += 2;
            }
            return x64 + a65;
        }
        if (FlutterTextUtils.isKeycapBase(z64)) {
            a65 += FlutterTextUtils.charCount(z64);
        }
        if (z64 == COMBINING_ENCLOSING_KEYCAP) {
            z64 = FlutterTextUtils.codePointBefore(w64, b65);
            b65 += FlutterTextUtils.charCount(z64);
            if (b65 < y64 && FlutterTextUtils.isVariationSelector(z64)) {
                let f65: number = FlutterTextUtils.codePointAt(w64, b65);
                if (FlutterTextUtils.isKeycapBase(f65)) {
                    a65 += FlutterTextUtils.charCount(z64) + FlutterTextUtils.charCount(f65);
                }
            }
            else if (FlutterTextUtils.isKeycapBase(z64)) {
                a65 += FlutterTextUtils.charCount(z64);
            }
            return x64 + a65;
        }
        if (FlutterTextUtils.isEmoji(z64)) {
            let c65: boolean = false;
            let d65: number = 0;
            do {
                if (c65) {
                    a65 += FlutterTextUtils.charCount(z64) + d65 + 1;
                    c65 = false;
                }
                d65 = 0;
                if (FlutterTextUtils.isEmojiModifier(z64)) {
                    break;
                }
                if (b65 < y64) {
                    z64 = FlutterTextUtils.codePointAt(w64, b65);
                    b65 += FlutterTextUtils.charCount(z64);
                    if (z64 == COMBINING_ENCLOSING_KEYCAP) {
                        z64 = FlutterTextUtils.codePointBefore(w64, b65);
                        b65 += FlutterTextUtils.charCount(z64);
                        if (b65 < y64 && FlutterTextUtils.isVariationSelector(z64)) {
                            let e65: number = FlutterTextUtils.codePointAt(w64, b65);
                            if (FlutterTextUtils.isKeycapBase(e65)) {
                                a65 += FlutterTextUtils.charCount(z64) + FlutterTextUtils.charCount(e65);
                            }
                        }
                        else if (FlutterTextUtils.isKeycapBase(z64)) {
                            a65 += FlutterTextUtils.charCount(z64);
                        }
                        return x64 + a65;
                    }
                    if (FlutterTextUtils.isEmojiModifier(z64)) {
                        a65 += d65 + FlutterTextUtils.charCount(z64);
                        break;
                    }
                    if (FlutterTextUtils.isVariationSelector(z64)) {
                        a65 += d65 + FlutterTextUtils.charCount(z64);
                        break;
                    }
                    if (z64 == ZERO_WIDTH_JOINER) {
                        c65 = true;
                        z64 = FlutterTextUtils.codePointAt(w64, b65);
                        b65 += FlutterTextUtils.charCount(z64);
                        if (b65 < y64 && FlutterTextUtils.isVariationSelector(z64)) {
                            z64 = FlutterTextUtils.codePointAt(w64, b65);
                            d65 = FlutterTextUtils.charCount(z64);
                            b65 += FlutterTextUtils.charCount(z64);
                        }
                    }
                }
                if (b65 >= y64) {
                    break;
                }
            } while (c65 && FlutterTextUtils.isEmoji(z64));
            if (c65 && b65 >= y64) {
                a65 += FlutterTextUtils.charCount(z64) + d65 + 1;
                c65 = false;
            }
        }
        return x64 + a65;
    }
}
