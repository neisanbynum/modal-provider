import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ModalPositioner from '@/utils/positioner';
import usePortal from '@/utils/usePortal';
import { Portal, usePortalLayer } from 'portal-layer';
import React from 'react';
import { cn } from '@sglara/cn';
import Header from '@/modal/header';
const useModal = () => {
    // Using Object.assign due to later intergration of modal.confirm
    return modal;
};
const modal = (children, { className, title, desc, icon, offset, margin, closer = 'both', placement = 'center' }) => {
    const layer = usePortalLayer();
    const positioner = React.useMemo(() => new ModalPositioner(placement, { offset, margin }), [offset, margin]);
    const { opened, positioning, open, close, modal } = usePortal(layer, closer, positioner);
    const component = () => {
        return (_jsx(Portal, { children: _jsxs("div", { className: cn('fixed flex flex-col w-fit border-2 border-card bg-card rounded-lg gap-2 p-4 z-100 pointer-events-auto', opened ? 'opacity-100' : 'opacity-0', className), style: positioning, ref: modal, inert: !opened, "aria-hidden": !opened, slot: 'card', children: [_jsx(Header, { icon: icon, title: title, desc: desc }), children] }) }));
    };
    return Object.assign(component, { open, close });
};
export default useModal;
