import React from 'react'
import { useModalContext } from './context'
import Modal from './modal'
import { useModalOptions, useModalComponent, Thunk } from './types'

const useModal = () => {
	return modal
}

const modal: useModalComponent = (children, { title, desc, icon, offset, margin, ...rest }) => {
	return (
		<Modal {...rest} options={{ offset, margin }}>
			<ModalContent title={title} desc={desc} icon={icon}>
				{children}
			</ModalContent>
		</Modal>
	)
}

const ModalContent: React.FC<React.PropsWithChildren<Pick<useModalOptions, 'title' | 'desc' | 'icon'>>> = ({
	children,
	title,
	desc,
	icon
}) => {
	const { open } = useModalContext()

	React.useLayoutEffect(() => open(), [])

	return (
		<Modal.Content title={title} desc={desc} icon={icon}>
			{children}
		</Modal.Content>
	)
}

modal.confirm = (children, { title, desc, icon, offset, margin, ...rest }) => {
	return new Promise<boolean>((resolve) => (
		<Modal {...rest} options={{ offset, margin }} closer='none'>
			<ConfirmModalContent resolve={resolve} title={title} desc={desc} icon={icon}>
				{children}
			</ConfirmModalContent>
		</Modal>
	))
}

const ConfirmModalContent: React.FC<
	React.PropsWithChildren<
		Pick<useModalOptions, 'title' | 'desc' | 'icon'> & { resolve: Thunk<[boolean | PromiseLike<boolean>]> }
	>
> = ({ children, title, desc, icon, resolve }) => {
	const { open, close } = useModalContext()

	React.useLayoutEffect(() => open(), [])

	const confirm = () => {
		resolve(true)
		close()
	}

	const cancel = () => {
		resolve(false)
		close()
	}

	const styles: Record<string, React.CSSProperties> = {
		container: {
			display: 'flex',
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
			gap: '1rem',
			padding: '1rem'
		},
		button: {
			display: 'flex',
			width: '100%',
			height: '3rem',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: '0.5rem'
		}
	}

	return (
		<Modal.Content title={title ?? 'Confirm'} desc={desc} icon={icon}>
			{children}
			<div style={styles.container}>
				<button style={styles.button} onClick={confirm}>
					Confirm
				</button>
				<button style={{...styles.button, backgroundColor: 'red' }} onClick={cancel}>
					Cancel
				</button>
			</div>
		</Modal.Content>
	)
}

export default useModal