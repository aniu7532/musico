import type SendableBinaryMessageHandler from './SendableBinaryMessageHandler';
export interface TaskQueue {
}
export enum TaskPriority {
    HIGH = 0,
    MEDIUM = 1,
    LOW = 2,
    IDLE = 3
}
export class TaskQueueOptions {
    private isSerial: boolean = true;
    private isSingleThread: boolean = false;
    private priority: TaskPriority = TaskPriority.MEDIUM;
    getIsSerial(): boolean {
        return this.isSerial;
    }
    setIsSerial(y47: boolean): TaskQueueOptions {
        this.isSerial = y47;
        return this;
    }
    getPriority(): TaskPriority {
        return this.priority;
    }
    setPriority(x47: TaskPriority): TaskQueueOptions {
        this.priority = x47;
        return this;
    }
    isSingleThreadMode(): boolean {
        return this.isSingleThread;
    }
    setSingleThreadMode(w47: boolean): TaskQueueOptions {
        this.isSingleThread = w47;
        return this;
    }
}
export interface BinaryReply {
    reply: (reply: ArrayBuffer | null) => void;
}
export interface BinaryMessageHandler {
    onMessage(message: ArrayBuffer, reply: BinaryReply): void;
}
export interface BinaryMessenger {
    makeBackgroundTaskQueue(options?: TaskQueueOptions): TaskQueue;
    send(channel: String, message: ArrayBuffer | null): void;
    send(channel: String, message: ArrayBuffer, callback?: BinaryReply | null): void;
    setMessageHandler(channel: String, handler: BinaryMessageHandler | SendableBinaryMessageHandler | null, taskQueue?: TaskQueue, ...args: Object[]): void;
}
