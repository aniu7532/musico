import type { AccessibilityEventsDelegate } from './AccessibilityEventsDelegate';
export class PlatformOverlayView {
    private accessibilityEventsDelegate: AccessibilityEventsDelegate;
    constructor(k68: Context, l68: Number, m68: Number, n68: AccessibilityEventsDelegate) {
        this.accessibilityEventsDelegate = n68;
    }
    public onHoverEvent(): boolean {
        return false;
    }
}
