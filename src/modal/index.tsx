import { ModalComponent } from "../types"
import { cn } from "@sglara/cn"
import { Portal } from "portal-layer"
import React from "react"
import { useModalContext } from "./context"
import ModalProvider from "./provider"
import Header from "./header"

const Modal: ModalComponent = ({ children, ...rest }) => {
	return <ModalProvider {...rest}>{children}</ModalProvider>
}

const Trigger: typeof Modal.Trigger = ({ children }) => {
	const { trigger } = useModalContext()

	return React.cloneElement(children, { ref: trigger })
}
Trigger.displayName = 'Modal.Trigger'
Modal.Trigger = Trigger

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