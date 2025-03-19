import worker from "@ohos:worker";
import type { ErrorEvent, MessageEvents, ThreadWorkerGlobalScope } from "@ohos:worker";
import Log from "@package:pkg_modules/.ohpm/@ohos+flutter_ohos@853ksruaozxudtzsem5w6dd7l+uwp9ujjwp8ankqts4=/pkg_modules/@ohos/flutter_ohos/src/main/ets/util/Log";
import type SendableBinaryMessageHandler from '../../../plugin/common/SendableBinaryMessageHandler';
import type { TaskState } from '../dart/DartMessenger';
const TAG: string = 'PlatformChannelWorker';
const workerPort: ThreadWorkerGlobalScope = worker.workerPort;
/**
 * Defines the event handler to be called when the worker thread receives a message sent by the host thread.
 * The event handler is executed in the worker thread.
 *
 * @param e message data
 */
workerPort.onmessage = async (e: MessageEvents) => {
    let data: TaskState = e.data;
    let result: ArrayBuffer | null = await handleMessage(data.handler, data.message, data.args);
    workerPort.postMessage(result, [result]);
};
/**
 * Defines the event handler to be called when the worker receives a message that cannot be deserialized.
 * The event handler is executed in the worker thread.
 *
 * @param e message data
 */
workerPort.onmessageerror = (e: MessageEvents) => {
    Log.e(TAG, '#onmessageerror = ' + e.data);
};
/**
 * Defines the event handler to be called when an exception occurs during worker execution.
 * The event handler is executed in the worker thread.
 *
 * @param e error message
 */
workerPort.onerror = (e: ErrorEvent) => {
    Log.e(TAG, '#onerror = ' + e.message);
};
async function handleMessage(handler: SendableBinaryMessageHandler, message: ArrayBuffer, args: Object[]): Promise<ArrayBuffer | null> {
    const result = await new Promise<ArrayBuffer | null>((resolve, reject) => {
        try {
            handler.onMessage(message, {
                reply: (reply: ArrayBuffer | null): void => {
                    resolve(reply);
                }
            }, ...args);
        }
        catch (e) {
            reject(null);
            Log.e(TAG, "Oops! Failed to handle message in the background: ", e);
        }
    });
    return result;
}
