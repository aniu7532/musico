import type { AccessibilityEventsDelegate } from './AccessibilityEventsDelegate';
export class PlatformOverlayView {
    private accessibilityEventsDelegate: AccessibilityEventsDelegate;
    constructor(context: Context, width: Number, height: Number, accessibilityEventsDelegate: AccessibilityEventsDelegate) {
        this.accessibilityEventsDelegate = accessibilityEventsDelegate;
    }
    public onHoverEvent(): boolean {
        return false;
    }
}
