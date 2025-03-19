import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import BasicMessageChannel from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BasicMessageChannel";
import type { BinaryMessenger } from '@ohos/flutter_ohos/src/main/ets/plugin/common/BinaryMessenger';
import type MessageCodec from '@ohos/flutter_ohos/src/main/ets/plugin/common/MessageCodec';
import StandardMessageCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StandardMessageCodec";
export enum StorageDirectory {
    ROOT = 0,
    MUSIC = 1,
    PODCASTS = 2,
    RINGTONES = 3,
    ALARMS = 4,
    NOTIFICATIONS = 5,
    PICTURES = 6,
    MOVIES = 7,
    DOWNLOADS = 8,
    DCIM = 9,
    DOCUMENTS = 10
}
const TAG: string = "Message";
export default class Messages {
    static wrapError(z98: Error): Array<any> {
        const a99: Array<any> = new Array();
        if (z98 instanceof FlutterError) {
            const b99 = z98;
            a99.push(b99.code);
            a99.push(b99.message);
            a99.push(b99.details);
        }
        else {
            a99.push(z98.name);
            a99.push(z98.message);
            a99.push(z98.stack);
        }
        return a99;
    }
}
export class FlutterError extends Error {
    code: string;
    details: any;
    constructor(w98: string, x98: string, y98: any) {
        super(x98);
        this.code = w98;
        this.details = y98;
    }
}
export abstract class PathProviderApi {
    abstract getTemporaryPath(): string;
    abstract getApplicationSupportPath(): string;
    abstract getApplicationDocumentsPath(): string;
    abstract getApplicationCachePath(): string;
    abstract getExternalStoragePath(): string;
    abstract getExternalCachePaths(): Array<string>;
    abstract getExternalStoragePaths(v98: StorageDirectory): Array<string>;
    static getCodec(): MessageCodec<any> {
        return new StandardMessageCodec();
    }
    static setup(u96: BinaryMessenger, v96: PathProviderApi) {
        {
            const o98: BasicMessageChannel<any> = new BasicMessageChannel<any>(u96, "dev.flutter.pigeon.PathProviderApi.getTemporaryPath", PathProviderApi.getCodec());
            if (v96 != null) {
                o98.setMessageHandler({
                    onMessage: (p98: any, q98: any) => {
                        Log.i(TAG, "setup on message : " + p98);
                        let r98: Array<any> = new Array<any>();
                        try {
                            const u98 = v96.getTemporaryPath();
                            r98.push(u98);
                        }
                        catch (s98) {
                            const t98: Array<any> = Messages.wrapError(s98);
                            r98 = t98;
                        }
                        q98.reply(r98);
                    }
                } as any);
            }
            else {
                o98.setMessageHandler(null);
            }
        }
        {
            const h98: BasicMessageChannel<any> = new BasicMessageChannel<any>(u96, "dev.flutter.pigeon.PathProviderApi.getApplicationSupportPath", PathProviderApi.getCodec());
            if (v96 != null) {
                h98.setMessageHandler({
                    onMessage: (i98: any, j98: any) => {
                        Log.i(TAG, "setup on message : " + i98);
                        let k98: Array<any> = new Array<any>();
                        try {
                            const n98 = v96.getApplicationSupportPath();
                            k98.push(n98);
                        }
                        catch (l98) {
                            const m98: Array<any> = Messages.wrapError(l98);
                            k98 = m98;
                        }
                        j98.reply(k98);
                    }
                } as any);
            }
            else {
                h98.setMessageHandler(null);
            }
        }
        {
            const a98: BasicMessageChannel<any> = new BasicMessageChannel<any>(u96, "dev.flutter.pigeon.PathProviderApi.getApplicationDocumentsPath", PathProviderApi.getCodec());
            if (v96 != null) {
                a98.setMessageHandler({
                    onMessage: (b98: any, c98: any) => {
                        Log.i(TAG, "setup on message : " + b98);
                        let d98: Array<any> = new Array<any>();
                        try {
                            const g98 = v96.getApplicationDocumentsPath();
                            d98.push(g98);
                        }
                        catch (e98) {
                            const f98: Array<any> = Messages.wrapError(e98);
                            d98 = f98;
                        }
                        c98.reply(d98);
                    }
                } as any);
            }
            else {
                a98.setMessageHandler(null);
            }
        }
        {
            const t97: BasicMessageChannel<any> = new BasicMessageChannel<any>(u96, "dev.flutter.pigeon.PathProviderApi.getApplicationCachePath", PathProviderApi.getCodec());
            if (v96 != null) {
                t97.setMessageHandler({
                    onMessage: (u97: any, v97: any) => {
                        Log.i(TAG, "setup on message : " + u97);
                        let w97: Array<any> = new Array<any>();
                        try {
                            const z97 = v96.getApplicationCachePath();
                            w97.push(z97);
                        }
                        catch (x97) {
                            const y97: Array<any> = Messages.wrapError(x97);
                            w97 = y97;
                        }
                        v97.reply(w97);
                    }
                } as any);
            }
            else {
                t97.setMessageHandler(null);
            }
        }
        {
            const m97: BasicMessageChannel<any> = new BasicMessageChannel<any>(u96, "dev.flutter.pigeon.PathProviderApi.getExternalStoragePath", PathProviderApi.getCodec());
            if (v96 != null) {
                m97.setMessageHandler({
                    onMessage: (n97: any, o97: any) => {
                        Log.i(TAG, "setup on message : " + n97);
                        let p97: Array<any> = new Array<any>();
                        try {
                            const s97 = v96.getExternalStoragePath();
                            p97.push(s97);
                        }
                        catch (q97) {
                            const r97: Array<any> = Messages.wrapError(q97);
                            p97 = r97;
                        }
                        o97.reply(p97);
                    }
                } as any);
            }
            else {
                m97.setMessageHandler(null);
            }
        }
        {
            const f97: BasicMessageChannel<any> = new BasicMessageChannel<any>(u96, "dev.flutter.pigeon.PathProviderApi.getExternalCachePaths", PathProviderApi.getCodec());
            if (v96 != null) {
                f97.setMessageHandler({
                    onMessage: (g97: any, h97: any) => {
                        Log.i(TAG, "setup on message : " + g97);
                        let i97: Array<any> = new Array<any>();
                        try {
                            const l97 = v96.getExternalCachePaths();
                            i97.push(l97);
                        }
                        catch (j97) {
                            const k97: Array<any> = Messages.wrapError(j97);
                            i97 = k97;
                        }
                        h97.reply(i97);
                    }
                } as any);
            }
            else {
                f97.setMessageHandler(null);
            }
        }
        {
            const w96: BasicMessageChannel<any> = new BasicMessageChannel<any>(u96, "dev.flutter.pigeon.PathProviderApi.getExternalStoragePaths", PathProviderApi.getCodec());
            if (v96 != null) {
                w96.setMessageHandler({
                    onMessage: (x96: any, y96: any) => {
                        Log.i(TAG, "setup on message : " + x96);
                        let z96: Array<any> = new Array<any>();
                        let a97: Array<any> = x96;
                        const b97: StorageDirectory = a97[0] == null ? null : a97[0];
                        try {
                            const e97 = v96.getExternalStoragePaths(b97);
                            z96.push(e97);
                        }
                        catch (c97) {
                            const d97: Array<any> = Messages.wrapError(c97);
                            z96 = d97;
                        }
                        y96.reply(z96);
                    }
                } as any);
            }
            else {
                w96.setMessageHandler(null);
            }
        }
    }
}
