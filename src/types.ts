import { LucideProps } from "lucide-react"
import React from "react"

export type Thunk<Args extends unknown[] = never[], Return = void> = (...args: Args) => Return
export type HTMLProperties<T extends HTMLElement> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>
export type Icon = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>

type Vertical = 'top' | 'center' | 'bottom'
type Horizontal = 'left' | 'right'
export type ModalPlacement = `${Vertical}-${Horizontal}` | 'center'
export type Coordinates = { top: number; left: number }

// For Modal Positioner
export type ModalOptions = {
	offset?: Partial<Coordinates>
	margin?: number
}

// For Modal Provider
export type ModalProviderProperties = {
	children?: React.ReactNode
	opened?: boolean
	closer?: 'button' | 'overlay' | 'both' | 'none'
	placement?: ModalPlacement
	options?: ModalOptions
}

// For Modal Context
export type ModalContextValues = {
	rendering: React.CSSProperties
	layer: HTMLDivElement
	opened: boolean
	open: Thunk
	close: Thunk
	trigger: React.Ref<HTMLDivElement>
	modal: React.Ref<HTMLDivElement>
}

// For Modal
export type ModalHeaderProperties = {
	title?: string
	desc?: string
	icon?: { icon: Icon, className: React.SVGAttributes<SVGSVGElement>['className'] }
}
export type ModalComponent = React.FC<ModalProviderProperties> & {
	Trigger: React.FC<Pick<HTMLProperties<HTMLDivElement>, 'children'>>
	Content: React.FC<Pick<HTMLProperties<HTMLDivElement>, 'children' | 'className' | 'style'> & ModalHeaderProperties>
}

// For useModal
export type useModalOptions = ModalHeaderProperties & ModalOptions & Pick<ModalProviderProperties, 'placement' | 'closer'>
export type useConfirmModalOptions = Omit<useModalOptions, 'closer'> & { resolve: Thunk<[boolean | PromiseLike<boolean>]>}
export type useModalComponent = Thunk<[React.ReactNode, useModalOptions], React.ReactElement<ModalProviderProperties>> & {
	confirm: Thunk<[React.ReactNode, useConfirmModalOptions], Promise<boolean>>
}
