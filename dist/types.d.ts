import { LucideProps } from "lucide-react";
import React from "react";
export type Thunk<Args extends unknown[] = never[], Return = void> = (...args: Args) => Return;
export type HTMLProperties<T extends HTMLElement> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;
export type Icon = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
type ClassName = {
    className?: React.HTMLAttributes<HTMLElement>['className'];
};
type Vertical = 'top' | 'center' | 'bottom';
type Horizontal = 'left' | 'right';
export type ModalPlacement = `${Vertical}-${Horizontal}` | 'center';
export type Coordinates = {
    top: number;
    left: number;
};
export type ModalOptions = {
    offset?: Partial<Coordinates>;
    margin?: number;
};
export type Closer = "button" | "overlay" | "both" | "none";
export type ModalProviderProperties = {
    children?: React.ReactNode;
    opened?: boolean;
    closer?: Closer;
    placement?: ModalPlacement;
    options?: ModalOptions;
};
export type usePortalValues = {
    opened: boolean;
    positioning: Coordinates;
    open: Thunk;
    close: Thunk;
    modal: React.Ref<HTMLDivElement>;
};
export type ModalContextValues = {
    positioning: Coordinates;
    closer: Closer;
    opened: boolean;
    open: Thunk;
    close: Thunk;
    trigger: React.Ref<HTMLElement>;
    modal: React.Ref<HTMLDivElement>;
};
export type ModalHeaderProperties = {
    title?: string;
    desc?: string;
    icon?: {
        icon: Icon;
        className?: React.SVGAttributes<SVGSVGElement>['className'];
    };
};
type ModalContentProperties = Pick<HTMLProperties<HTMLDivElement>, 'children' | 'className'> & ModalHeaderProperties;
export type ModalComponent = React.FC<ModalProviderProperties> & {
    Trigger: React.FC<{
        children: React.ReactElement<any>;
    }>;
    Content: React.FC<ModalContentProperties>;
};
export type useModalOptions = ModalHeaderProperties & ModalOptions & Pick<ModalProviderProperties, 'placement' | 'closer'>;
export type useConfirmModalOptions = Omit<useModalOptions, 'closer'> & {
    resolve: Thunk<[boolean | PromiseLike<boolean>]>;
};
export type useModalComponent = Thunk<[React.ReactElement<unknown>, useModalOptions & ClassName], Thunk<[], React.ReactPortal> & {
    open: Thunk;
    close: Thunk;
}>;
export {};
