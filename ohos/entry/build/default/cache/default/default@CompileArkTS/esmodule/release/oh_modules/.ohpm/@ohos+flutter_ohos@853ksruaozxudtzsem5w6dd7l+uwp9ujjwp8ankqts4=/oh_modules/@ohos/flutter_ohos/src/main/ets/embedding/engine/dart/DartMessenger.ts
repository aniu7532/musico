import Queue from "@ohos:util.Queue";
import taskpool from "@ohos:taskpool";
import worker from "@ohos:worker";
import type { ErrorEvent, MessageEvents } from "@ohos:worker";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import { TaskQueueOptions } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BinaryMessenger";
import type { BinaryMessageHandler, BinaryMessenger, BinaryReply, TaskPriority, TaskQueue } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/BinaryMessenger";
import type FlutterNapi from '../FlutterNapi';
import type { PlatformMessageHandler } from './PlatformMessageHandler';
import { TraceSection } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/TraceSection";
import type SendableBinaryMessageHandler from '../../../plugin/common/SendableBinaryMessageHandler';
const TAG = "DartMessenger";
export class DartMessenger implements BinaryMessenger, PlatformMessageHandler {
    flutterNapi: FlutterNapi;
    messageHandlers: Map<String, HandlerInfo> = new Map();
    pendingReplies: Map<number, BinaryReply> = new Map();
    nextReplyId: number = 1;
    taskQueueFactory: TaskQueueFactory;
    createdTaskQueues: Map<TaskQueue, DartMessengerTaskQueue> = new Map();
    constructor(j5: FlutterNapi) {
        this.flutterNapi = j5;
        this.taskQueueFactory = new DefaultTaskQueueFactory();
    }
    makeBackgroundTaskQueue(g5?: TaskQueueOptions): TaskQueue {
        let h5: DartMessengerTaskQueue = this.taskQueueFactory.makeBackgroundTaskQueue(g5 ?? new TaskQueueOptions());
        let i5: TaskQueueToken = new TaskQueueToken();
        this.createdTaskQueues.set(i5, h5);
        return i5;
    }
    setMessageHandler(b5: String, c5: BinaryMessageHandler | SendableBinaryMessageHandler | null, d5?: TaskQueue, ...e5: Object[]): void {
        if (c5 == null) {
            Log.d(TAG, "Removing handler for channel '" + b5 + "'");
            this.messageHandlers.delete(b5);
            return;
        }
        let f5: DartMessengerTaskQueue | null = null;
        if (d5 !== null && d5 !== undefined) {
            f5 = this.createdTaskQueues.get(d5) ?? null;
            if (f5 == null) {
                throw new Error("Unrecognized TaskQueue, use BinaryMessenger to create your TaskQueue (ex makeBackgroundTaskQueue).");
            }
        }
        Log.d(TAG, "Setting handler for channel '" + b5 + "'");
        this.messageHandlers.set(b5, new HandlerInfo(c5, f5, ...e5));
    }
    send(w4: String, x4: ArrayBuffer, y4?: BinaryReply): void {
        Log.d(TAG, "Sending message over channel '" + w4 + "'");
        let z4: number = TraceSection.begin("DartMessenger#send on " + w4);
        try {
            Log.d(TAG, "Sending message with callback over channel '" + w4 + "'");
            let a5: number = this.nextReplyId++;
            if (y4 != null) {
                this.pendingReplies.set(a5, y4);
            }
            if (x4 == null) {
                this.flutterNapi.dispatchEmptyPlatformMessage(w4, a5);
            }
            else {
                this.flutterNapi.dispatchPlatformMessage(w4, x4, x4.byteLength, a5);
            }
        }
        finally {
            TraceSection.endWithId("DartMessenger#send on " + w4, z4);
        }
        this.IsFlutterNavigationExecuted(w4);
    }
    dispatchMessageToQueue(s4: HandlerInfo, t4: ArrayBuffer, u4: number): void {
        let v4: TaskState = new TaskState(s4.handler as any, t4, ...s4.args);
        s4.taskQueue?.dispatch(v4, new Reply(this.flutterNapi, u4));
    }
    invokeHandler(o4: BinaryMessageHandler | null, p4: ArrayBuffer, q4: number): void {
        if (o4 != null) {
            try {
                Log.d(TAG, "Deferring to registered handler to process message.");
                o4.onMessage(p4, new Reply(this.flutterNapi, q4));
            }
            catch (r4) {
                Log.e(TAG, "Uncaught exception in binary message listener", r4);
                this.flutterNapi.invokePlatformMessageEmptyResponseCallback(q4);
            }
        }
        else {
            Log.d(TAG, "No registered handler for message. Responding to Dart with empty reply message.");
            this.flutterNapi.invokePlatformMessageEmptyResponseCallback(q4);
        }
    }
    handleMessageFromDart(j4: String, k4: ArrayBuffer, l4: number, m4: number): void {
        Log.d(TAG, "Received message from Dart over channel '" + j4 + "'");
        let n4: HandlerInfo | null = this.messageHandlers.get(j4) ?? null;
        if (n4?.taskQueue != null) {
            this.dispatchMessageToQueue(n4, k4, l4);
        }
        else {
            this.invokeHandler(n4?.handler as BinaryMessageHandler, k4, l4);
        }
        this.IsFlutterNavigationExecuted(j4);
    }
    handlePlatformMessageResponse(f4: number, g4: ArrayBuffer): void {
        Log.d(TAG, "Received message reply from Dart.");
        let h4: BinaryReply | null = this.pendingReplies.get(f4) ?? null;
        this.pendingReplies.delete(f4);
        if (h4 != null) {
            try {
                Log.d(TAG, "Invoking registered callback for reply from Dart.");
                h4.reply(g4);
            }
            catch (i4) {
                Log.e(TAG, "Uncaught exception in binary message reply handler", i4);
            }
        }
    }
    getPendingChannelResponseCount(): number {
        return this.pendingReplies.size;
    }
    IsFlutterNavigationExecuted(e4: String): void {
        if (e4 == "flutter/navigation") {
            this.flutterNapi.setFlutterNavigationAction(true);
            Log.d(TAG, "setFlutterNavigationAction -> '" + e4 + "'");
        }
    }
}
class HandlerInfo {
    handler: BinaryMessageHandler | SendableBinaryMessageHandler;
    taskQueue: DartMessengerTaskQueue | null;
    args: Object[];
    constructor(b4: BinaryMessageHandler | SendableBinaryMessageHandler, c4: DartMessengerTaskQueue | null, ...d4: Object[]) {
        this.handler = b4;
        this.taskQueue = c4;
        this.args = d4;
    }
}
class Reply implements BinaryReply {
    flutterNapi: FlutterNapi;
    replyId: number;
    done: boolean = false;
    constructor(z3: FlutterNapi, a4: number) {
        this.flutterNapi = z3;
        this.replyId = a4;
    }
    reply(y3: ArrayBuffer | null) {
        if (this.done) {
            throw new Error("Reply already submitted");
        }
        if (y3 == null) {
            this.flutterNapi.invokePlatformMessageEmptyResponseCallback(this.replyId);
        }
        else {
            this.flutterNapi.invokePlatformMessageResponseCallback(this.replyId, y3, y3.byteLength);
        }
    }
}
export class TaskState {
    handler: SendableBinaryMessageHandler;
    message: ArrayBuffer;
    args: Object[];
    constructor(v3: SendableBinaryMessageHandler, w3: ArrayBuffer, ...x3: Object[]) {
        this.handler = v3;
        this.message = w3;
        this.args = x3;
    }
}
interface DartMessengerTaskQueue {
    dispatch(taskState: TaskState, callback: Reply): void;
}
interface SerialTaskQueue extends DartMessengerTaskQueue {
}
interface TaskQueueFactory {
    makeBackgroundTaskQueue(options: TaskQueueOptions): DartMessengerTaskQueue;
}
class ConcurrentTaskQueue implements DartMessengerTaskQueue {
    private priority: TaskPriority;
    constructor(u3: TaskPriority) {
        this.priority = u3;
    }
    dispatch(p3: TaskState, q3: Reply): void {
        let r3: taskpool.Task = new taskpool.Task(handleMessageInBackground, p3.handler, p3.message, ...p3.args);
        taskpool.execute(r3, this.priority as number).then((t3: Object) => {
            q3.reply(t3 as ArrayBuffer);
        }).catch((s3: string) => {
            q3.reply(null);
            Log.e(TAG, "Oops! Failed to execute task: ", s3);
        });
    }
}
const scriptURL: string = '../workers/PlatformChannelWorker.ets';
class SerialTaskQueueWithWorker implements SerialTaskQueue {
    private static workerInstance: worker.ThreadWorker | null = null;
    constructor() {
        if (!SerialTaskQueueWithWorker.workerInstance) {
            SerialTaskQueueWithWorker.workerInstance =
                new worker.ThreadWorker(scriptURL, { name: 'PlatformChannelWorker' });
        }
    }
    dispatch(l3: TaskState, m3: Reply): void {
        SerialTaskQueueWithWorker.workerInstance!.onmessage = (o3: MessageEvents): void => {
            m3.reply(o3.data as ArrayBuffer);
        };
        SerialTaskQueueWithWorker.workerInstance!.onerror = (n3: ErrorEvent) => {
            m3.reply(null);
            Log.e(TAG, "Oops! Failed to execute task in worker thread: ", n3.message);
        };
        SerialTaskQueueWithWorker.workerInstance!.postMessageWithSharedSendable(l3, [l3.message]);
    }
}
type Runnable = () => Promise<void>;
class SerialTaskQueueWithTaskPool implements SerialTaskQueue {
    private priority: TaskPriority;
    private queue: Queue<Runnable> = new Queue();
    private isRunning: boolean = false;
    constructor(k3: TaskPriority) {
        this.priority = k3;
    }
    dispatch(e3: TaskState, f3: Reply): void {
        let g3: taskpool.Task = new taskpool.Task(handleMessageInBackground, e3.handler, e3.message, ...e3.args);
        const h3: Runnable = async () => {
            try {
                const j3 = await taskpool.execute(g3, this.priority as number);
                f3.reply(j3 as ArrayBuffer);
            }
            catch (i3) {
                f3.reply(null);
                Log.e(TAG, "Oops! Failed to execute task: ", i3);
            }
        };
        this.queue.add(h3);
        if (!this.isRunning) {
            this.runNext();
        }
    }
    private async runNext(): Promise<void> {
        if (this.queue.length > 0) {
            this.isRunning = true;
            const d3 = this.queue.pop();
            try {
                await d3();
            }
            finally {
                this.isRunning = false;
                this.runNext();
            }
        }
    }
}
class DefaultTaskQueueFactory implements TaskQueueFactory {
    makeBackgroundTaskQueue(c3: TaskQueueOptions): DartMessengerTaskQueue {
        if (c3.isSingleThreadMode()) {
            return new SerialTaskQueueWithWorker();
        }
        else {
            if (c3.getIsSerial()) {
                return new SerialTaskQueueWithTaskPool(c3.getPriority());
            }
            return new ConcurrentTaskQueue(c3.getPriority());
        }
    }
}
class TaskQueueToken implements TaskQueue {
}
async function handleMessageInBackground(u2: SendableBinaryMessageHandler, v2: ArrayBuffer, ...w2: Object[]): Promise<ArrayBuffer | null> {
    "use concurrent";
    const x2 = await new Promise<ArrayBuffer | null>((y2, z2) => {
        try {
            u2.onMessage(v2, {
                reply: (b3: ArrayBuffer | null): void => {
                    y2(b3);
                }
            }, ...w2);
        }
        catch (a3) {
            z2(null);
            Log.e('WARNING', "Oops! Failed to handle message in the background: ", a3);
        }
    });
    return x2;
}
