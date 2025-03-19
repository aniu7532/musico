import type TextInputPlugin from '../../plugin/editing/TextInputPlugin';
import type FlutterEngine from '../engine/FlutterEngine';
import KeyEventChannel, { FlutterKeyEvent } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/systemchannels/KeyEventChannel";
import { KeyEventHandler } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/ohos/KeyEventHandler";
export default class KeyboardManager {
    private keyEventChannel: KeyEventChannel | null = null;
    private keyEventHandler: KeyEventHandler;
    constructor(engine: FlutterEngine, textInputPlugin: TextInputPlugin) {
        this.keyEventChannel = new KeyEventChannel(engine.dartExecutor);
        this.keyEventHandler = new KeyEventHandler(textInputPlugin);
    }
    onKeyPreIme(event: KeyEvent): boolean {
        this.keyEventChannel?.sendFlutterKeyEvent(new FlutterKeyEvent(event), event.type == KeyType.Up, {
            onFrameworkResponse: (isEventHandled: boolean): void => {
            }
        });
        return false;
    }
    onKeyEvent(event: KeyEvent): boolean {
        this.keyEventHandler.handleKeyEvent(event);
        return false;
    }
}
