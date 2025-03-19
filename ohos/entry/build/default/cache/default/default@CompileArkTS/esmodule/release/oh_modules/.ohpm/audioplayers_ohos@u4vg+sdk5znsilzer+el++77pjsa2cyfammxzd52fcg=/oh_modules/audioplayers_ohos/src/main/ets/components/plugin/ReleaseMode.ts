export enum ReleaseMode {
    RELEASE = 1,
    LOOP = 2,
    STOP = 3
}
export const parseReleaseMode = (r95: string) => {
    if (r95 == "ReleaseMode.stop") {
        return ReleaseMode.STOP;
    }
    else if (r95 == "ReleaseMode.loop") {
        return ReleaseMode.LOOP;
    }
    return ReleaseMode.RELEASE;
};
