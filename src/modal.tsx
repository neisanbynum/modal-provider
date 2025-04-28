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

	return React.cloneElement(children, { ref: trigger })
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
		title: { fontSize: '1.25rem', fontWeight: 'bold' },
		desc: { fontSize: '1rem' }
	}

	return (
		<div style={styles.header}>
			{icon && (
				<>
					<div style={styles.iconContainer}>
						<icon.icon className={icon.className} style={{ width: '2rem', height: '2rem' }} />
					</div>
					<div style={styles.separator} />
				</>
			)}
			<div style={styles.content}>
				{title && <span style={styles.title}>{title}</span>}
				{desc && <span style={styles.desc}>{desc}</span>}
			</div>
			<div style={{...styles.iconContainer, alignItems: 'start'}}>
				<button onClick={close}>
					<X style={{ width: '1rem', height: '1rem' }} />
				</button>
			</div>
		</div>
	)
}

const Content: typeof Modal.Content = ({ children, className, style, icon, title, desc }) => {
	const { positioning, opened, layer, modal } = useModalContext()

	const CardStyle: typeof style = {
		display: 'flex',
		flexDirection: 'column',
		width: 'fit-content',
		borderRadius: '1rem',
		border: '2px solid',
		position: 'fixed',
		zIndex: 100,
		opacity: opened ? 1 : 0,
		pointerEvents: 'auto',
		...style,
		...positioning
	}

	return createPortal(
		<div className={className} style={CardStyle} ref={modal} inert={!opened} aria-hidden={!opened} slot='card'>
			<Header icon={icon} title={title} desc={desc} />
			{children}
		</div>,
		layer
	)
}
Content.displayName = 'Modal.Content'
Modal.Content = Content

export default Modal
