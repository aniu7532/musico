import type AccessibilityBridge from '../../view/AccessibilityBridge';
export class AccessibilityEventsDelegate {
    private accessibilityBridge: AccessibilityBridge | null = null;
    requestSendAccessibilityEvent(k67: AccessibilityBridge): boolean {
        if (k67 == null) {
            return false;
        }
        return true;
    }
    onAccessibilityHoverEvent(j67: AccessibilityBridge): boolean {
        if (j67 == null) {
            return false;
        }
        return true;
    }
    setAccessibilityBridge(i67: AccessibilityBridge | null): void {
        this.accessibilityBridge = i67;
    }
}
