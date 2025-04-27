import { usePortalLayer } from 'portal-layer'
import React from 'react'
import { ModalProviderProperties } from './types'
import ModalPositioner from './positioner'
import { ModalContext } from './context'

const ModalProvider: React.FC<ModalProviderProperties> = ({
	children,
	opened: manuallyOpened,
	closer = 'button',
	placement = 'center',
	options
}) => {
	const layer = usePortalLayer()
	const portal = React.useRef<HTMLDivElement>(null)

	const [opened, setOpened] = React.useState<boolean>(manuallyOpened ?? false)

	React.useEffect(() => {
		if (manuallyOpened) open()
	}, [manuallyOpened])

	const open = () => {
		layer.style.background = 'rgba(0, 0, 0, 0.5)'

		const node = portal.current
		if (node) {
			node.inert = false
			node.ariaHidden = 'false'
			node.style.opacity = '1'
		}

		setOpened(true)
	}
	const close = () => {
		layer.style.background = 'transparent'

		const node = portal.current
		if (node) {
			node.inert = true
			node.ariaHidden = 'true'
			node.style.opacity = '0'
		}

		setOpened(false)
	}

	const trigger = React.useCallback((node: HTMLDivElement) => {
		if (!node) return

		const handleClick = (e: MouseEvent) => {
			e.stopPropagation()
			open()
		}

		node.addEventListener('click', handleClick)

		return () => node.removeEventListener('click', handleClick)
	}, [])

	const positioner = React.useMemo(() => new ModalPositioner(placement, options), [placement, options])

	const modal = React.useCallback((node: HTMLDivElement) => {
		if (!node) return

		portal.current = node

		const update = () => {
			const position = positioner.position(node.getBoundingClientRect())

			node.style.top = `${position.top}px`
			node.style.left = `${position.left}px`
		}

		const handleRootClick = (e: MouseEvent) => {
			if (closer !== 'button' && closer !== 'none' && e.target === layer) close()
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

	return <ModalContext.Provider value={{ layer, opened, open, close, trigger, modal }}>{children}</ModalContext.Provider>
}
ModalProvider.displayName = 'ModalProvider'

export default ModalProvider
