import type TextInputPlugin from '../../plugin/editing/TextInputPlugin';
import type FlutterEngine from '../engine/FlutterEngine';
import KeyEventChannel, { FlutterKeyEvent } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/KeyEventChannel";
import { KeyEventHandler } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/KeyEventHandler";
export default class KeyboardManager {
    private keyEventChannel: KeyEventChannel | null = null;
    private keyEventHandler: KeyEventHandler;
    constructor(o41: FlutterEngine, p41: TextInputPlugin) {
        this.keyEventChannel = new KeyEventChannel(o41.dartExecutor);
        this.keyEventHandler = new KeyEventHandler(p41);
    }
    onKeyPreIme(m41: KeyEvent): boolean {
        this.keyEventChannel?.sendFlutterKeyEvent(new FlutterKeyEvent(m41), m41.type == KeyType.Up, {
            onFrameworkResponse: (n41: boolean): void => {
            }
        });
        return false;
    }
    onKeyEvent(l41: KeyEvent): boolean {
        this.keyEventHandler.handleKeyEvent(l41);
        return false;
    }
}
