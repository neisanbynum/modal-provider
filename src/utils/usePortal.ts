import React from 'react'
import { Closer, Coordinates, Thunk, usePortalValues } from '@/types'
import ModalPositioner from './positioner'

const usePortal: Thunk<[HTMLElement, Closer, ModalPositioner], usePortalValues> = (layer, closer, positioner) => {
	const [opened, setOpened] = React.useState<boolean>(false)
	const [positioning, setPositioning] = React.useState<Coordinates>({ top: 0, left: 0 })

	const open = () => {
		const root = document.getElementById('root')
		if (root) root.inert = true
		layer.style.background = 'rgba(0, 0, 0, 0.75)'
		setOpened(true)
	}
	const close = () => {
		const root = document.getElementById('root')
		if (root) root.inert = false
		layer.style.background = 'transparent'
		setOpened(false)
	}

	const modal = React.useCallback((node: HTMLDivElement) => {
		if (!node) return

		const update = () => setPositioning(positioner.position(node.getBoundingClientRect()))

		const handleRootClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			if ((closer === 'overlay' || closer === 'both') && !node.contains(target)) close()
		}

		update()

		layer.addEventListener('click', handleRootClick)

		const rootObserver = new ResizeObserver(update)
		rootObserver.observe(layer)
		const nodeObserver = new ResizeObserver(update)
		nodeObserver.observe(node)

		return () => {
			layer.removeEventListener('click', handleRootClick)
			rootObserver.disconnect()
			nodeObserver.disconnect()
		}
	}, [])

	return { opened, positioning, open, close, modal }
}

export default usePortal