import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@sglara/cn";
import { X } from "lucide-react";
import { useModalContext } from "./context";
const Header = ({ icon, title, desc }) => {
    const { close, closer } = useModalContext();
    return (_jsxs("div", { className: 'flex w-full gap-2', children: [icon && (_jsx("div", { className: 'flex justify-center items-center', children: _jsx(icon.icon, { className: cn(icon.className, 'w-8 h-8') }) })), _jsxs("div", { className: 'flex flex-col w-full items-start', children: [title && _jsx("span", { className: 'text-lg font-semibold', children: title }), desc && _jsx("span", { className: 'text-muted text-sm', children: desc })] }), closer !== 'none' && (_jsx("div", { className: 'flex justify-center items-start', children: _jsx("button", { onClick: close, className: 'cursor-pointer disabled:cursor-default touch-manipulation select-none disabled:opacity-50', children: _jsx(X, { className: 'w-5 h-5' }) }) }))] }));
};
export default Header;
