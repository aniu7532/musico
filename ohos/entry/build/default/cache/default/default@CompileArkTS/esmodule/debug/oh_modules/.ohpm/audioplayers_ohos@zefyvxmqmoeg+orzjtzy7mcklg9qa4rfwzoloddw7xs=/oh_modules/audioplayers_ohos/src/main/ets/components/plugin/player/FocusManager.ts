import type WrappedPlayer from './WrappedPlayer';
export default class FocusManager {
    private player: WrappedPlayer | null = null;
    constructor(player: WrappedPlayer) {
        this.player = player;
    }
    handleStop() {
    }
    maybeRequestAudioFocus(andThen: Function) {
        andThen();
    }
}
