import hiTraceMeter from "@ohos:hiTraceMeter";
export class TraceSection {
    static taskId: number = 0;
    private static cropSectionName(d83: string): string {
        return d83.length < 124 ? d83 : d83.substring(0, 124) + "...";
    }
    public static begin(c83: string): number {
        TraceSection.taskId++;
        hiTraceMeter.startTrace(TraceSection.cropSectionName(c83), TraceSection.taskId);
        return TraceSection.taskId;
    }
    public static end(b83: string): void {
        hiTraceMeter.finishTrace(TraceSection.cropSectionName(b83), TraceSection.taskId);
    }
    public static endWithId(z82: string, a83: number): void {
        hiTraceMeter.finishTrace(TraceSection.cropSectionName(z82), a83);
    }
}
