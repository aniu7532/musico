import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type { BinaryMessageHandler, BinaryMessenger, BinaryReply, TaskQueue } from './BinaryMessenger';
import type Any from './Any';
import type MethodCodec from './MethodCodec';
import StandardMethodCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StandardMethodCodec";
const TAG = "EventChannel#";
export default class EventChannel {
    private messenger: BinaryMessenger;
    private name: string;
    private codec: MethodCodec;
    private taskQueue: TaskQueue | null;
    constructor(d49: BinaryMessenger, e49: string, f49?: MethodCodec, g49?: TaskQueue) {
        this.messenger = d49;
        this.name = e49;
        this.codec = f49 ? f49 : StandardMethodCodec.INSTANCE;
        this.taskQueue = null;
    }
    setStreamHandler(c49: StreamHandler): void {
        if (this.taskQueue != null) {
            this.messenger.setMessageHandler(this.name, c49 == null ? null : new IncomingStreamRequestHandler(c49, this.name, this.codec, this.messenger), this.taskQueue);
        }
        else {
            this.messenger.setMessageHandler(this.name, c49 == null ? null : new IncomingStreamRequestHandler(c49, this.name, this.codec, this.messenger));
        }
    }
}
export interface StreamHandler {
    onListen(args: Any, events: EventSink): void;
    onCancel(args: Any): void;
}
export interface EventSink {
    success(event: Any): void;
    error(errorCode: string, errorMessage: string, errorDetails: Any): void;
    endOfStream(): void;
}
class IncomingStreamRequestHandler implements BinaryMessageHandler {
    private handler: StreamHandler;
    private activeSink = new AtomicReference<EventSink>(null);
    private codec: MethodCodec;
    private name: string;
    private messenger: BinaryMessenger;
    constructor(y48: StreamHandler, z48: string, a49: MethodCodec, b49: BinaryMessenger) {
        this.handler = y48;
        this.codec = a49;
        this.name = z48;
        this.messenger = b49;
    }
    onMessage(v48: ArrayBuffer, w48: BinaryReply): void {
        const x48 = this.codec.decodeMethodCall(v48);
        if (x48.method == "listen") {
            this.onListen(x48.args, w48);
        }
        else if (x48.method == "cancel") {
            this.onCancel(x48.args, w48);
        }
        else {
            w48.reply(null);
        }
    }
    onListen(p48: Any, q48: BinaryReply): void {
        const r48 = new EventSinkImplementation(this.activeSink, this.name, this.codec, this.messenger);
        const s48 = this.activeSink.getAndSet(r48);
        if (s48 != null) {
            try {
                this.handler.onCancel(null);
            }
            catch (u48) {
                Log.e(TAG + this.name, "Failed to close existing event stream", u48);
            }
        }
        try {
            this.handler.onListen(p48, r48);
            q48.reply(this.codec.encodeSuccessEnvelope(null));
        }
        catch (t48) {
            this.activeSink.set(null);
            Log.e(TAG + this.name, "Failed to open event stream", t48);
            q48.reply(this.codec.encodeErrorEnvelope("error", t48.getMessage(), null));
        }
    }
    onCancel(l48: Any, m48: BinaryReply): void {
        const n48 = this.activeSink.getAndSet(null);
        if (n48 != null) {
            try {
                this.handler.onCancel(l48);
                m48.reply(this.codec.encodeSuccessEnvelope(null));
            }
            catch (o48) {
                Log.e(TAG + this.name, "Failed to close event stream", o48);
                m48.reply(this.codec.encodeErrorEnvelope("error", o48.getMessage(), null));
            }
        }
        else {
            m48.reply(this.codec.encodeErrorEnvelope("error", "No active stream to cancel", null));
        }
    }
}
class EventSinkImplementation implements EventSink {
    private hasEnded = false;
    private activeSink: AtomicReference<EventSink>;
    private messenger: BinaryMessenger;
    private codec: MethodCodec;
    private name: string;
    constructor(h48: AtomicReference<EventSink>, i48: string, j48: MethodCodec, k48: BinaryMessenger) {
        this.activeSink = h48;
        this.codec = j48;
        this.name = i48;
        this.messenger = k48;
    }
    success(g48: Any): void {
        if (this.hasEnded || this.activeSink.get() != this) {
            return;
        }
        this.messenger.send(this.name, this.codec.encodeSuccessEnvelope(g48));
    }
    error(d48: string, e48: string, f48: Any) {
        if (this.hasEnded || this.activeSink.get() != this) {
            return;
        }
        this.messenger.send(this.name, this.codec.encodeErrorEnvelope(d48, e48, f48));
    }
    endOfStream(): void {
        if (this.hasEnded || this.activeSink.get() != this) {
            return;
        }
        this.hasEnded = true;
        this.messenger.send(this.name, new ArrayBuffer(0));
    }
}
class AtomicReference<T> {
    private value: T | null;
    constructor(c48: T | null) {
        this.value = c48;
    }
    get(): T | null {
        return this.value;
    }
    set(b48: T | null): void {
        this.value = b48;
    }
    getAndSet(z47: T | null) {
        const a48 = this.value;
        this.value = z47;
        return a48;
    }
}
