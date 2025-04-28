import { RectCalculator } from 'dom-rect-calculator'
import { Coordinates, ModalOptions, ModalPlacement, Thunk } from '@/types'

export default class ModalPositioner {
	private _root: DOMRect = new DOMRect()
	private _modal: DOMRect = new DOMRect()
	private _position!: Coordinates
	private _placement: ModalPlacement

	private _offset: Coordinates = { top: 0, left: 0 }
	private _margin: number = 8

	constructor(placement: ModalPlacement, options?: ModalOptions) {
		this._placement = placement
		this.options = options ?? {}
	}

	private set options({ offset, margin }: ModalOptions) {
		if (offset) this._offset = { top: offset.top ?? 0, left: offset.left ?? 0 }
		if (margin) this._margin = margin
	}

	private matchRect: Thunk<[DOMRect, DOMRect], boolean> = (a, b) => {
		return (
			a.top === b.top &&
			a.right === b.right &&
			a.bottom === b.bottom &&
			a.left === b.left &&
			a.width === b.width &&
			a.height === b.height
		)
	}

	position: Thunk<[DOMRect], Coordinates> = (modal) => {
		const root = document.documentElement
		const rootRect = root.getBoundingClientRect()
		if (
			this.matchRect(rootRect, this._root) &&
			this.matchRect(modal, this._modal) &&
			this._position
		) {
			return this._position
		}

		const page = new RectCalculator(rootRect, { dimensions: 'fluid' })
		const portal = new RectCalculator(modal)

		// Set Page Dimensions to account for margin
		page.top = this._margin
		page.right = root.clientWidth - this._margin
		page.bottom = root.clientHeight - this._margin
		page.left = this._margin

		// Adjust Vertical Placement
		if (this._placement.startsWith('top')) {
			portal.top = page.top
		} else if (this._placement.startsWith('center')) {
			portal.centerY = page.centerY
		} else if (this._placement.startsWith('bottom')) {
			portal.bottom = page.bottom
		}

		// Adjust Horizontal Placement
		if (this._placement.endsWith('left')) {
			portal.left = page.left
		} else if (this._placement.endsWith('center')) {
			portal.centerX = page.centerX
		} else if (this._placement.endsWith('right')) {
			portal.right = page.right
		}

		// Apply Offset
		portal.top += this._offset.top
		portal.left += this._offset.left

		this._root = rootRect
		this._modal = modal

		return (this._position = { top: portal.top, left: portal.left })
	}
}
