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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { createPortal } from 'react-dom';
import { useModalContext } from './context';
import ModalProvider from './provider';
import { X } from 'lucide-react';
const Modal = (_a) => {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return _jsx(ModalProvider, Object.assign({}, rest, { children: children }));
};
const Trigger = ({ children }) => {
    const { trigger } = useModalContext();
    return _jsx("div", { ref: trigger, children: children });
};
Trigger.displayName = 'Modal.Trigger';
Modal.Trigger = Trigger;
const Header = ({ icon, title, desc }) => {
    const { close } = useModalContext();
    const styles = {
        header: { display: 'flex', width: '100%', gap: '0.5rem', padding: '1rem' },
        iconContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
        separator: { display: 'flex', width: 0, height: '100%', outline: '1px solid' },
        content: { display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'start' },
        icon: { width: '2rem', height: '2rem' },
        title: { fontSize: '1.5rem', fontWeight: 'bold' },
        desc: { fontSize: '1rem' }
    };
    return (_jsxs("div", { style: styles.header, children: [icon && (_jsxs(_Fragment, { children: [_jsx("div", { style: styles.iconContainer, children: _jsx(icon.icon, { className: icon.className, style: styles.icon }) }), _jsx("div", { style: styles.separator })] })), _jsxs("div", { style: styles.content, children: [title && _jsx("span", { style: styles.title, children: title }), desc && _jsx("span", { style: styles.desc, children: desc })] }), _jsx("div", { style: styles.iconContainer, children: _jsx("button", { onClick: close, children: _jsx(X, { style: styles.icon }) }) })] }));
};
const Content = ({ children, className, style, icon, title, desc }) => {
    const { layer, modal } = useModalContext();
    const CardStyle = Object.assign({ display: 'flex', flexDirection: 'column', width: 'fit-content', borderRadius: '1rem', border: '2px solid' }, style);
    return createPortal(_jsxs("div", { className: className, style: CardStyle, ref: modal, slot: 'card', children: [_jsx(Header, { icon: icon, title: title, desc: desc }), children] }), layer);
};
Content.displayName = 'Modal.Content';
Modal.Content = Content;
export default Modal;
