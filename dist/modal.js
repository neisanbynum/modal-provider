var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Portal } from 'portal-layer';
import { useModalContext } from './context';
import ModalProvider from './provider';
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@sglara/cn';
const Modal = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return _jsx(ModalProvider, Object.assign({}, rest, { children: children }));
};
const Trigger = ({ children }) => {
    const { trigger } = useModalContext();
    return React.cloneElement(children, { ref: trigger });
};
Trigger.displayName = 'Modal.Trigger';
Modal.Trigger = Trigger;
const Header = ({ icon, title, desc }) => {
    const { close, closer } = useModalContext();
    return (_jsxs("div", { className: 'flex w-full gap-2', children: [icon && (_jsx("div", { className: 'flex justify-center items-center', children: _jsx(icon.icon, { className: cn(icon.className, 'w-8 h-8') }) })), _jsxs("div", { className: 'flex flex-col w-full items-start', children: [title && _jsx("span", { className: 'text-lg font-semibold', children: title }), desc && _jsx("span", { className: 'text-muted text-sm', children: desc })] }), closer !== 'none' && (_jsx("div", { className: 'flex justify-center items-start', children: _jsx("button", { onClick: close, className: 'cursor-pointer disabled:cursor-default touch-manipulation select-none disabled:opacity-50', children: _jsx(X, { className: 'w-5 h-5' }) }) }))] }));
};
const Content = ({ children, className, icon, title, desc }) => {
    const { positioning, opened, modal } = useModalContext();
    return (_jsx(Portal, { children: _jsxs("div", { className: cn('fixed flex flex-col w-fit border-2 border-card bg-card rounded-lg gap-2 p-4 z-100 pointer-events-auto', opened ? 'opacity-100' : 'opacity-0', className), style: positioning, ref: modal, inert: !opened, "aria-hidden": !opened, slot: 'card', children: [_jsx(Header, { icon: icon, title: title, desc: desc }), children] }) }));
};
Content.displayName = 'Modal.Content';
Modal.Content = Content;
export default Modal;
