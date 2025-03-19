import type AccessibilityBridge from '../../view/AccessibilityBridge';
export interface PlatformViewsAccessibilityDelegate {
    getPlatformViewById(viewId: number): Object;
    usesVirtualDisplay(id: number): boolean;
    attachAccessibilityBridge(accessibilityBridge: AccessibilityBridge): void;
    detachAccessibilityBridge(): void;
}
