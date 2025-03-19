export enum PlayerMode {
    MEDIA_PLAYER = 1,
    LOW_LATENCY = 2
}
export const parsePlayerMode = (q95: string) => {
    if (q95 == "PlayerMode.lowLatency") {
        return PlayerMode.LOW_LATENCY;
    }
    return PlayerMode.MEDIA_PLAYER;
};
