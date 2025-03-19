import type WrappedPlayer from './WrappedPlayer';
export default class FocusManager {
    private player: WrappedPlayer | null = null;
    constructor(y91: WrappedPlayer) {
        this.player = y91;
    }
    handleStop() {
    }
    maybeRequestAudioFocus(x91: Function) {
        x91();
    }
}
