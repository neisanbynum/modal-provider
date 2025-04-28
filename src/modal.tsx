import { Portal } from 'portal-layer'
import { useModalContext } from './context'
import ModalProvider from './provider'
import { ModalComponent, ModalHeaderProperties } from './types'
import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@sglara/cn'

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
	const { close, closer } = useModalContext()

	return (
		<div className='flex w-full gap-2'>
			{icon && (
				<div className='flex justify-center items-center'>
					<icon.icon className={cn(icon.className, 'w-8 h-8')} />
				</div>
			)}
			<div className='flex flex-col w-full items-start'>
				{title && <span className='text-lg font-semibold'>{title}</span>}
				{desc && <span className='text-muted text-sm'>{desc}</span>}
			</div>
			{closer !== 'none' && (
				<div className='flex justify-center items-start'>
					<button
						onClick={close}
						className='cursor-pointer disabled:cursor-default touch-manipulation select-none disabled:opacity-50'
					>
						<X className='w-5 h-5' />
					</button>
				</div>
			)}
		</div>
	)
}

const Content: typeof Modal.Content = ({ children, className, icon, title, desc }) => {
	const { positioning, opened, modal } = useModalContext()

	return (
		<Portal>
			<div
				className={cn(
					'fixed flex flex-col w-fit border-2 border-card bg-card rounded-lg gap-2 p-4 z-100 pointer-events-auto',
					opened ? 'opacity-100' : 'opacity-0',
					className
				)}
				style={positioning}
				ref={modal}
				inert={!opened}
				aria-hidden={!opened}
				slot='card'
			>
				<Header icon={icon} title={title} desc={desc} />
				{children}
			</div>
		</Portal>
	)
}
Content.displayName = 'Modal.Content'
Modal.Content = Content

export default Modal
