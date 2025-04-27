import { createPortal } from 'react-dom'
import { useModalContext } from './context'
import ModalProvider from './provider'
import { ModalComponent, ModalHeaderProperties } from './types'
import React from 'react'
import { X } from 'lucide-react'

const Modal: ModalComponent = ({ children, ...rest }) => {
	return <ModalProvider {...rest}>{children}</ModalProvider>
}

const Trigger: typeof Modal.Trigger = ({ children }) => {
	const { trigger } = useModalContext()

	return <div ref={trigger}>{children}</div>
}
Trigger.displayName = 'Modal.Trigger'
Modal.Trigger = Trigger

const Header: React.FC<ModalHeaderProperties> = ({ icon, title, desc }) => {
	const { close } = useModalContext()

	const styles: Record<string, React.CSSProperties> = {
		header: { display: 'flex', width: '100%', gap: '0.5rem', padding: '1rem' },
		iconContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
		separator: { display: 'flex', width: 0, height: '100%', outline: '1px solid' },
		content: { display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'start' },
		icon: { width: '2rem', height: '2rem' },
		title: { fontSize: '1.5rem', fontWeight: 'bold' },
		desc: { fontSize: '1rem' }
	}

	return (
		<div style={styles.header}>
			{icon && (
				<>
					<div style={styles.iconContainer}>
						<icon.icon className={icon.className} style={styles.icon} />
					</div>
					<div style={styles.separator} />
				</>
			)}
			<div style={styles.content}>
				{title && <span style={styles.title}>{title}</span>}
				{desc && <span style={styles.desc}>{desc}</span>}
			</div>
			<div style={styles.iconContainer}>
				<button onClick={close}>
					<X style={styles.icon} />
				</button>
			</div>
		</div>
	)
}

const Content: typeof Modal.Content = ({ children, className, style, icon, title, desc }) => {
	const { rendering, layer, modal } = useModalContext()

	const CardStyle: typeof style = {
		display: 'flex',
		flexDirection: 'column',
		width: 'fit-content',
		borderRadius: '1rem',
		border: '2px solid',
		...style,
		...rendering
	}

	return createPortal(
		<div className={className} style={CardStyle} ref={modal} slot='card'>
			<Header icon={icon} title={title} desc={desc} />
			{children}
		</div>,
		layer
	)
}
Content.displayName = 'Modal.Content'
Modal.Content = Content

export default Modal
