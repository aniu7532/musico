export interface PlatformMessageHandler {
    handleMessageFromDart(channel: String, message: ArrayBuffer, replyId: number, messageData: number): void;
    handlePlatformMessageResponse(replyId: number, reply: ArrayBuffer): void;
}
