import { RectCalculator } from 'dom-rect-calculator';
export default class ModalPositioner {
    constructor(placement, options) {
        this._root = new DOMRect();
        this._modal = new DOMRect();
        this._offset = { top: 0, left: 0 };
        this._margin = 8;
        this.matchRect = (a, b) => {
            return (a.top === b.top &&
                a.right === b.right &&
                a.bottom === b.bottom &&
                a.left === b.left &&
                a.width === b.width &&
                a.height === b.height);
        };
        this.position = (modal) => {
            const root = document.documentElement;
            const rootRect = root.getBoundingClientRect();
            if (this.matchRect(rootRect, this._root) &&
                this.matchRect(modal, this._modal) &&
                this._position) {
                return this._position;
            }
            const page = new RectCalculator(rootRect, { dimensions: 'fluid' });
            const portal = new RectCalculator(modal);
            // Set Page Dimensions to account for margin
            page.top = this._margin;
            page.right = root.clientWidth - this._margin;
            page.bottom = root.clientHeight - this._margin;
            page.left = this._margin;
            // Adjust Vertical Placement
            if (this._placement.startsWith('top')) {
                portal.top = page.top;
            }
            else if (this._placement.startsWith('center')) {
                portal.centerY = page.centerY;
            }
            else if (this._placement.startsWith('bottom')) {
                portal.bottom = page.bottom;
            }
            // Adjust Horizontal Placement
            if (this._placement.endsWith('left')) {
                portal.left = page.left;
            }
            else if (this._placement.endsWith('center')) {
                portal.centerX = page.centerX;
            }
            else if (this._placement.endsWith('right')) {
                portal.right = page.right;
            }
            // Apply Offset
            portal.top += this._offset.top;
            portal.left += this._offset.left;
            this._root = rootRect;
            this._modal = modal;
            return (this._position = { top: portal.top, left: portal.left });
        };
        this._placement = placement;
        this.options = options !== null && options !== void 0 ? options : {};
    }
    set options({ offset, margin }) {
        var _a, _b;
        if (offset)
            this._offset = { top: (_a = offset.top) !== null && _a !== void 0 ? _a : 0, left: (_b = offset.left) !== null && _b !== void 0 ? _b : 0 };
        if (margin)
            this._margin = margin;
    }
}
