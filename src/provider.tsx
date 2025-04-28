import { usePortalLayer } from 'portal-layer'
import React from 'react'
import { Coordinates, ModalProviderProperties, Thunk } from './types'
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

	const [opened, setOpened] = React.useState<boolean>(manuallyOpened ?? false)
	const [positioning, setPositioning] = React.useState<Coordinates>({ top: 0, left: 0 })

	React.useEffect(() => {
		if (manuallyOpened) open()
	}, [manuallyOpened])

	const open = () => {
		document.documentElement.inert = true
		layer.style.background = 'rgba(0, 0, 0, 0.5)'
		setOpened(true)
	}
	const close: Thunk<[MouseEvent?]> = (e) => {
		if (e) e.stopPropagation()
		document.documentElement.inert = false
		layer.style.background = 'transparent'
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

		const update = () => setPositioning(positioner.position(node.getBoundingClientRect()))

		const handleRootClick = (e: MouseEvent) => {
			if (closer !== 'button' && closer !== 'none' && e.target !== node) close()
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

	return (
		<ModalContext.Provider value={{ positioning, opened, open, close, trigger, modal }}>
			{children}
		</ModalContext.Provider>
	)
}
ModalProvider.displayName = 'ModalProvider'

export default ModalProvider
