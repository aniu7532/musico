import type MouseCursorChannel from '../../embedding/engine/systemchannels/MouseCursorChannel';
import type { MouseCursorMethodHandler } from '../../embedding/engine/systemchannels/MouseCursorChannel';
import pointer from "@ohos:multimodalInput.pointer";
import HashMap from "@ohos:util.HashMap";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type Any from '../common/Any';
const TAG: string = "MouseCursorPlugin";
export default class MouseCursorPlugin implements MouseCursorMethodHandler {
    private mouseCursorChannel: MouseCursorChannel;
    private systemCursorConstants: HashMap<string, pointer.PointerStyle> | null = null;
    private windowId: number;
    constructor(g67: number, h67: MouseCursorChannel) {
        this.windowId = g67;
        this.mouseCursorChannel = h67;
        this.mouseCursorChannel.setMethodHandler(this);
    }
    activateSystemCursor(c67: string): void {
        if (this.windowId < 0) {
            Log.w(TAG, "set point style failed windowId is invalid");
            return;
        }
        let d67: pointer.PointerStyle = this.resolveSystemCursor(c67);
        try {
            pointer.setPointerStyle(this.windowId, d67, (f67: Any) => {
                Log.i(TAG, "set point style success kind : " + c67);
            });
        }
        catch (e67) {
            Log.e(TAG, "set point style failed : " + c67 + " " + JSON.stringify(e67));
        }
    }
    private resolveSystemCursor(a67: string): pointer.PointerStyle {
        if (this.systemCursorConstants == null) {
            this.systemCursorConstants = new HashMap();
            this.systemCursorConstants.set("alias", pointer.PointerStyle.DEFAULT);
            this.systemCursorConstants.set("allScroll", pointer.PointerStyle.MOVE);
            this.systemCursorConstants.set("basic", pointer.PointerStyle.DEFAULT);
            this.systemCursorConstants.set("cell", pointer.PointerStyle.DEFAULT);
            this.systemCursorConstants.set("click", pointer.PointerStyle.HAND_POINTING);
            this.systemCursorConstants.set("contextMenu", pointer.PointerStyle.DEFAULT);
            this.systemCursorConstants.set("copy", pointer.PointerStyle.CURSOR_COPY);
            this.systemCursorConstants.set("forbidden", pointer.PointerStyle.CURSOR_FORBID);
            this.systemCursorConstants.set("grab", pointer.PointerStyle.HAND_OPEN);
            this.systemCursorConstants.set("grabbing", pointer.PointerStyle.HAND_GRABBING);
            this.systemCursorConstants.set("help", pointer.PointerStyle.HELP);
            this.systemCursorConstants.set("move", pointer.PointerStyle.MOVE);
            this.systemCursorConstants.set("none", pointer.PointerStyle.DEFAULT);
            this.systemCursorConstants.set("noDrop", pointer.PointerStyle.DEFAULT);
            this.systemCursorConstants.set("precise", pointer.PointerStyle.CROSS);
            this.systemCursorConstants.set("text", pointer.PointerStyle.TEXT_CURSOR);
            this.systemCursorConstants.set("resizeColum", pointer.PointerStyle.NORTH_SOUTH);
            this.systemCursorConstants.set("resizeDown", pointer.PointerStyle.SOUTH);
            this.systemCursorConstants.set("resizeDownLeft", pointer.PointerStyle.SOUTH_WEST);
            this.systemCursorConstants.set("resizeDownRight", pointer.PointerStyle.SOUTH_EAST);
            this.systemCursorConstants.set("resizeLeft", pointer.PointerStyle.WEST);
            this.systemCursorConstants.set("resizeLeftRight", pointer.PointerStyle.RESIZE_LEFT_RIGHT);
            this.systemCursorConstants.set("resizeRight", pointer.PointerStyle.EAST);
            this.systemCursorConstants.set("resizeRow", pointer.PointerStyle.WEST_EAST);
            this.systemCursorConstants.set("resizeUp", pointer.PointerStyle.NORTH);
            this.systemCursorConstants.set("resizeUpDown", pointer.PointerStyle.RESIZE_UP_DOWN);
            this.systemCursorConstants.set("resizeUpLeft", pointer.PointerStyle.NORTH_WEST);
            this.systemCursorConstants.set("resizeUpRight", pointer.PointerStyle.NORTH_EAST);
            this.systemCursorConstants.set("resizeUpLeftDownRight", pointer.PointerStyle.NORTH_WEST_SOUTH_EAST);
            this.systemCursorConstants.set("resizeUpRightDownLeft", pointer.PointerStyle.NORTH_EAST_SOUTH_WEST);
            this.systemCursorConstants.set("verticalText", pointer.PointerStyle.TEXT_CURSOR);
            this.systemCursorConstants.set("wait", pointer.PointerStyle.DEFAULT);
            this.systemCursorConstants.set("zoomIn", pointer.PointerStyle.ZOOM_IN);
            this.systemCursorConstants.set("zoomOut", pointer.PointerStyle.ZOOM_OUT);
            this.systemCursorConstants.set("middleBtnEast", pointer.PointerStyle.MIDDLE_BTN_EAST);
            this.systemCursorConstants.set("middleBtnWest", pointer.PointerStyle.MIDDLE_BTN_WEST);
            this.systemCursorConstants.set("middleBtnSouth", pointer.PointerStyle.MIDDLE_BTN_SOUTH);
            this.systemCursorConstants.set("middleBtnNorth", pointer.PointerStyle.MIDDLE_BTN_NORTH);
            this.systemCursorConstants.set("middleBtnNorthSouth", pointer.PointerStyle.MIDDLE_BTN_NORTH_SOUTH);
            this.systemCursorConstants.set("middleBtnNorthEast", pointer.PointerStyle.MIDDLE_BTN_NORTH_EAST);
            this.systemCursorConstants.set("middleBtnNorthWest", pointer.PointerStyle.MIDDLE_BTN_NORTH_WEST);
            this.systemCursorConstants.set("middleBtnSouthEast", pointer.PointerStyle.MIDDLE_BTN_SOUTH_EAST);
            this.systemCursorConstants.set("middleBtnSouthWest", pointer.PointerStyle.MIDDLE_BTN_SOUTH_WEST);
            this.systemCursorConstants.set("middleBtnNorthSouthWestEast", pointer.PointerStyle.MIDDLE_BTN_NORTH_SOUTH_WEST_EAST);
            this.systemCursorConstants.set("horizontalTextCursor", pointer.PointerStyle.HORIZONTAL_TEXT_CURSOR);
            this.systemCursorConstants.set("cursorCross", pointer.PointerStyle.CURSOR_CROSS);
            this.systemCursorConstants.set("cursorCircle", pointer.PointerStyle.CURSOR_CIRCLE);
            this.systemCursorConstants.set("loading", pointer.PointerStyle.LOADING);
            this.systemCursorConstants.set("running", pointer.PointerStyle.RUNNING);
            this.systemCursorConstants.set("colorSucker", pointer.PointerStyle.COLOR_SUCKER);
            this.systemCursorConstants.set("screenshotChoose", pointer.PointerStyle.SCREENSHOT_CHOOSE);
            this.systemCursorConstants.set("screenshotCursor", pointer.PointerStyle.SCREENSHOT_CURSOR);
        }
        let b67: pointer.PointerStyle = this.systemCursorConstants.get(a67);
        if (b67 === null) {
            return pointer.PointerStyle.DEFAULT;
        }
        return b67;
    }
    destroy(): void {
        this.mouseCursorChannel.setMethodHandler(null);
    }
}
