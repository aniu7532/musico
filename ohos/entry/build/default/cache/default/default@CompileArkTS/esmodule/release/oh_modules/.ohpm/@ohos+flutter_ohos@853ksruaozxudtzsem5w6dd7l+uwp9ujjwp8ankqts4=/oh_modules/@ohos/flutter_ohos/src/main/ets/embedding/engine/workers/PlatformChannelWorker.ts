import worker from "@ohos:worker";
import type { ErrorEvent, MessageEvents, ThreadWorkerGlobalScope } from "@ohos:worker";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type SendableBinaryMessageHandler from '../../../plugin/common/SendableBinaryMessageHandler';
import type { TaskState } from '../dart/DartMessenger';
const TAG: string = 'PlatformChannelWorker';
const workerPort: ThreadWorkerGlobalScope = worker.workerPort;
workerPort.onmessage = async (v32: MessageEvents) => {
    let w32: TaskState = v32.data;
    let x32: ArrayBuffer | null = await handleMessage(w32.handler, w32.message, w32.args);
    workerPort.postMessage(x32, [x32]);
};
workerPort.onmessageerror = (u32: MessageEvents) => {
    Log.e(TAG, '#onmessageerror = ' + u32.data);
};
workerPort.onerror = (t32: ErrorEvent) => {
    Log.e(TAG, '#onerror = ' + t32.message);
};
async function handleMessage(l32: SendableBinaryMessageHandler, m32: ArrayBuffer, n32: Object[]): Promise<ArrayBuffer | null> {
    const o32 = await new Promise<ArrayBuffer | null>((p32, q32) => {
        try {
            l32.onMessage(m32, {
                reply: (s32: ArrayBuffer | null): void => {
                    p32(s32);
                }
            }, ...n32);
        }
        catch (r32) {
            q32(null);
            Log.e(TAG, "Oops! Failed to handle message in the background: ", r32);
        }
    });
    return o32;
}
