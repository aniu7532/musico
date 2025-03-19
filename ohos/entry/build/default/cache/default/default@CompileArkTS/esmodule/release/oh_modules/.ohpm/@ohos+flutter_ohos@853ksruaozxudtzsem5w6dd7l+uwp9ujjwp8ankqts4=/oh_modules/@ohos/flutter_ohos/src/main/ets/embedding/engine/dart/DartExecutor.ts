import type resourceManager from "@ohos:resourceManager";
import FlutterInjector from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/FlutterInjector";
import type { BinaryMessageHandler, BinaryReply, TaskQueue, TaskQueueOptions } from '../../../plugin/common/BinaryMessenger';
import type { BinaryMessenger } from '../../../plugin/common/BinaryMessenger';
import StringCodec from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/plugin/common/StringCodec";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import { TraceSection } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/TraceSection";
import type { FlutterCallbackInformation } from '../../../view/FlutterCallbackInformation';
import type FlutterNapi from '../FlutterNapi';
import { DartMessenger } from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/embedding/engine/dart/DartMessenger";
import type SendableBinaryMessageHandler from '../../../plugin/common/SendableBinaryMessageHandler';
const TAG = "DartExecutor";
export default class DartExecutor implements BinaryMessenger {
    flutterNapi: FlutterNapi;
    assetManager: resourceManager.ResourceManager;
    private dartMessenger: DartMessenger;
    private binaryMessenger: BinaryMessenger;
    private isApplicationRunning: boolean = false;
    private isolateServiceId: String = "";
    private isolateServiceIdListener: IsolateServiceIdListener | null = null;
    private isolateChannelMessageHandler: BinaryMessageHandler = new IsolateChannelMessageHandler(this.isolateServiceId, this.isolateServiceIdListener);
    constructor(s2: FlutterNapi, t2: resourceManager.ResourceManager) {
        this.flutterNapi = s2;
        this.assetManager = t2;
        this.dartMessenger = new DartMessenger(s2);
        this.dartMessenger.setMessageHandler("flutter/isolate", this.isolateChannelMessageHandler);
        this.binaryMessenger = new DefaultBinaryMessenger(this.dartMessenger);
        if (s2.isAttached()) {
            this.isApplicationRunning = true;
        }
    }
    onAttachedToNAPI(): void {
        Log.d(TAG, "Attached to NAPI. Registering the platform message handler for this Dart execution context.");
        this.flutterNapi.setPlatformMessageHandler(this.dartMessenger);
    }
    onDetachedFromNAPI(): void {
        Log.d(TAG, "Detached from NAPI. De-registering the platform message handler for this Dart execution context.");
        this.flutterNapi.setPlatformMessageHandler(null);
    }
    isExecutingDart(): boolean {
        return this.isApplicationRunning;
    }
    executeDartEntrypoint(p2: DartEntrypoint, q2?: string[]): void {
        if (this.isApplicationRunning) {
            Log.w(TAG, "Attempted to run a DartExecutor that is already running.");
            return;
        }
        let r2: number = TraceSection.begin("DartExecutor#executeDartEntrypoint");
        try {
            Log.d(TAG, "Executing Dart entrypoint: " + p2);
            this.flutterNapi.runBundleAndSnapshotFromLibrary(p2.pathToBundle, p2.dartEntrypointFunctionName, p2.dartEntrypointLibrary, this.assetManager, q2 ?? []);
            this.isApplicationRunning = true;
        }
        finally {
            TraceSection.endWithId("DartExecutor#executeDartEntrypoint", r2);
        }
    }
    executeDartCallback(n2: DartCallback): void {
        if (this.isApplicationRunning) {
            Log.w(TAG, "Attempted to run a DartExecutor that is already running.");
            return;
        }
        let o2: number = TraceSection.begin("DartExecutor#executeDartCallback");
        try {
            Log.d(TAG, "Executing Dart callback: " + n2);
            this.flutterNapi.runBundleAndSnapshotFromLibrary(n2.pathToBundle, n2.callbackHandle.callbackName, n2.callbackHandle.callbackLibraryPath, n2.resourceManager, []);
            this.isApplicationRunning = true;
        }
        finally {
            TraceSection.endWithId("DartExecutor#executeDartCallback", o2);
        }
    }
    getBinaryMessenger(): BinaryMessenger {
        return this.binaryMessenger;
    }
    makeBackgroundTaskQueue(m2?: TaskQueueOptions): TaskQueue {
        return this.getBinaryMessenger().makeBackgroundTaskQueue(m2);
    }
    send(j2: String, k2: ArrayBuffer, l2?: BinaryReply): void {
        this.getBinaryMessenger().send(j2, k2, l2);
    }
    setMessageHandler(f2: String, g2: BinaryMessageHandler | SendableBinaryMessageHandler | null, h2?: TaskQueue, ...i2: Object[]): void {
        this.getBinaryMessenger().setMessageHandler(f2, g2, h2, ...i2);
    }
    getPendingChannelResponseCount(): number {
        return this.dartMessenger.getPendingChannelResponseCount();
    }
    getIsolateServiceId(): String {
        return this.isolateServiceId;
    }
    setIsolateServiceIdListener(e2: IsolateServiceIdListener): void {
        this.isolateServiceIdListener = e2;
        if (this.isolateServiceIdListener != null && this.isolateServiceId != null) {
            this.isolateServiceIdListener.onIsolateServiceIdAvailable(this.isolateServiceId);
        }
    }
    notifyLowMemoryWarning(): void {
        if (this.flutterNapi.isAttached()) {
            this.flutterNapi.notifyLowMemoryWarning();
        }
    }
}
export class DartEntrypoint {
    pathToBundle: string;
    dartEntrypointLibrary: string;
    dartEntrypointFunctionName: string;
    constructor(b2: string, c2: string, d2: string) {
        this.pathToBundle = b2;
        this.dartEntrypointLibrary = c2;
        this.dartEntrypointFunctionName = d2;
    }
    static createDefault() {
        const a2 = FlutterInjector.getInstance().getFlutterLoader();
        if (!a2.initialized) {
            throw new Error("DartEntrypoints can only be created once a FlutterEngine is created.");
        }
        return new DartEntrypoint(a2.findAppBundlePath(), "", "main");
    }
}
interface IsolateServiceIdListener {
    onIsolateServiceIdAvailable(isolateServiceId: String): void;
}
export class DartCallback {
    public resourceManager: resourceManager.ResourceManager;
    public pathToBundle: string;
    public callbackHandle: FlutterCallbackInformation;
    constructor(x1: resourceManager.ResourceManager, y1: string, z1: FlutterCallbackInformation) {
        this.resourceManager = x1;
        this.pathToBundle = y1;
        this.callbackHandle = z1;
    }
    toString(): String {
        return "DartCallback( bundle path: "
            + this.pathToBundle
            + ", library path: "
            + this.callbackHandle.callbackLibraryPath
            + ", function: "
            + this.callbackHandle.callbackName
            + " )";
    }
}
export class DefaultBinaryMessenger implements BinaryMessenger {
    private messenger: DartMessenger;
    constructor(w1: DartMessenger) {
        this.messenger = w1;
    }
    makeBackgroundTaskQueue(v1?: TaskQueueOptions): TaskQueue {
        return this.messenger.makeBackgroundTaskQueue(v1);
    }
    send(s1: String, t1: ArrayBuffer, u1?: BinaryReply): void {
        this.messenger.send(s1, t1, u1);
    }
    setMessageHandler(o1: String, p1: BinaryMessageHandler | SendableBinaryMessageHandler | null, q1?: TaskQueue, ...r1: Object[]): void {
        this.messenger.setMessageHandler(o1, p1, q1, ...r1);
    }
}
class IsolateChannelMessageHandler implements BinaryMessageHandler {
    private isolateServiceId: String;
    private isolateServiceIdListener: IsolateServiceIdListener | null = null;
    constructor(m1: String, n1: IsolateServiceIdListener | null) {
        this.isolateServiceId = m1;
        this.isolateServiceIdListener = n1;
    }
    onMessage(k1: ArrayBuffer, l1: BinaryReply): void {
        this.isolateServiceId = StringCodec.INSTANCE.decodeMessage(k1);
        if (this.isolateServiceIdListener != null) {
            this.isolateServiceIdListener.onIsolateServiceIdAvailable(this.isolateServiceId);
        }
    }
}
