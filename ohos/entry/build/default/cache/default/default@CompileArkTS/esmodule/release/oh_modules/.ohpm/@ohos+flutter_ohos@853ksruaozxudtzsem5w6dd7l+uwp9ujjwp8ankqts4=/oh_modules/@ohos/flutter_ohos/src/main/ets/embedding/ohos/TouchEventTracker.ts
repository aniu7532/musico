import PlainArray from "@ohos:util.PlainArray";
import type { TouchEvent } from "@ohos:multimodalInput.touchEvent";
import Queue from "@ohos:util.Queue";
export class TouchEventTracker {
    private eventById: PlainArray<TouchEvent>;
    private unusedEvents: Queue<number>;
    private static INSTANCE: TouchEventTracker;
    public static getInstance(): TouchEventTracker {
        if (TouchEventTracker.INSTANCE == null) {
            TouchEventTracker.INSTANCE = new TouchEventTracker();
        }
        return TouchEventTracker.INSTANCE;
    }
    constructor() {
        this.eventById = new PlainArray();
        this.unusedEvents = new Queue();
    }
    public track(j45: TouchEvent): TouchEventId {
        const k45: TouchEventId = TouchEventId.createUnique();
        this.eventById.add(k45.getId(), j45);
        this.unusedEvents.add(k45.getId());
        return k45;
    }
    public pop(h45: TouchEventId): TouchEvent {
        while (this.unusedEvents.length != 0 && this.unusedEvents.getFirst() < h45.getId()) {
            this.eventById.remove(this.unusedEvents.pop());
        }
        if (this.unusedEvents.length != 0 && this.unusedEvents.getFirst() == h45.getId()) {
            this.unusedEvents.pop();
        }
        const i45: TouchEvent = this.eventById.get(h45.getId());
        this.eventById.remove(h45.getId());
        return i45;
    }
}
export class TouchEventId {
    private static ID_COUNTER: number = 0;
    private id: number;
    constructor(g45: number) {
        this.id = g45;
    }
    public static from(f45: number): TouchEventId {
        return new TouchEventId(f45);
    }
    public static createUnique(): TouchEventId {
        return new TouchEventId(TouchEventId.ID_COUNTER++);
    }
    public getId(): number {
        return this.id;
    }
}
