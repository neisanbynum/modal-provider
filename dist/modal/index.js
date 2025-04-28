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
import { cn } from "@sglara/cn";
import { Portal } from "portal-layer";
import React from "react";
import { useModalContext } from "./context";
import ModalProvider from "./provider";
import Header from "./header";
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
const Content = ({ children, className, icon, title, desc }) => {
    const { positioning, opened, modal } = useModalContext();
    return (_jsx(Portal, { children: _jsxs("div", { className: cn('fixed flex flex-col w-fit border-2 border-card bg-card rounded-lg gap-2 p-4 z-100 pointer-events-auto', opened ? 'opacity-100' : 'opacity-0', className), style: positioning, ref: modal, inert: !opened, "aria-hidden": !opened, slot: 'card', children: [_jsx(Header, { icon: icon, title: title, desc: desc }), children] }) }));
};
Content.displayName = 'Modal.Content';
Modal.Content = Content;
export default Modal;
