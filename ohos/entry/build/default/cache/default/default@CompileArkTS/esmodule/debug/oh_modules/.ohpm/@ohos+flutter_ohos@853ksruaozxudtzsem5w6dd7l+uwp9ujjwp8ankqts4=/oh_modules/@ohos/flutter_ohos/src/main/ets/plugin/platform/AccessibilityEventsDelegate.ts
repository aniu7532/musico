import type AccessibilityBridge from '../../view/AccessibilityBridge';
export class AccessibilityEventsDelegate {
    private accessibilityBridge: AccessibilityBridge | null = null;
    requestSendAccessibilityEvent(accessibilityBridge: AccessibilityBridge): boolean {
        if (accessibilityBridge == null) {
            return false;
        }
        return true;
    }
    onAccessibilityHoverEvent(accessibilityBridge: AccessibilityBridge): boolean {
        if (accessibilityBridge == null) {
            return false;
        }
        return true;
    }
    setAccessibilityBridge(accessibilityBridge: AccessibilityBridge | null): void {
        this.accessibilityBridge = accessibilityBridge;
    }
}
