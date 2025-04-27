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
import React from 'react';
import { useModalContext } from './context';
import Modal from './modal';
const useModal = () => {
    return modal;
};
const modal = (children, _a) => {
    var { title, desc, icon, offset, margin } = _a, rest = __rest(_a, ["title", "desc", "icon", "offset", "margin"]);
    return (_jsx(Modal, Object.assign({}, rest, { options: { offset, margin }, children: _jsx(ModalContent, { title: title, desc: desc, icon: icon, children: children }) })));
};
const ModalContent = ({ children, title, desc, icon }) => {
    const { open } = useModalContext();
    React.useLayoutEffect(() => open(), []);
    return (_jsx(Modal.Content, { title: title, desc: desc, icon: icon, children: children }));
};
modal.confirm = (children, _a) => {
    var { title, desc, icon, offset, margin } = _a, rest = __rest(_a, ["title", "desc", "icon", "offset", "margin"]);
    return new Promise((resolve) => (_jsx(Modal, Object.assign({}, rest, { options: { offset, margin }, closer: 'none', children: _jsx(ConfirmModalContent, { resolve: resolve, title: title, desc: desc, icon: icon, children: children }) }))));
};
const ConfirmModalContent = ({ children, title, desc, icon, resolve }) => {
    const { open, close } = useModalContext();
    React.useLayoutEffect(() => open(), []);
    const confirm = () => {
        resolve(true);
        close();
    };
    const cancel = () => {
        resolve(false);
        close();
    };
    const styles = {
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
    };
    return (_jsxs(Modal.Content, { title: title !== null && title !== void 0 ? title : 'Confirm', desc: desc, icon: icon, children: [children, _jsxs("div", { style: styles.container, children: [_jsx("button", { style: styles.button, onClick: confirm, children: "Confirm" }), _jsx("button", { style: Object.assign(Object.assign({}, styles.button), { backgroundColor: 'red' }), onClick: cancel, children: "Cancel" })] })] }));
};
export default useModal;
