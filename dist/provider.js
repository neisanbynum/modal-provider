import { jsx as _jsx } from "react/jsx-runtime";
import { usePortalLayer } from 'portal-layer';
import React from 'react';
import ModalPositioner from './positioner';
import { ModalContext } from './context';
const ModalProvider = ({ children, opened: manuallyOpened, closer = 'button', placement = 'center', options }) => {
    const layer = usePortalLayer();
    const [opened, setOpened] = React.useState(manuallyOpened !== null && manuallyOpened !== void 0 ? manuallyOpened : false);
    const [positioning, setPositioning] = React.useState({ top: 0, left: 0 });
    React.useEffect(() => {
        if (manuallyOpened)
            open();
    }, [manuallyOpened]);
    const open = () => {
        document.documentElement.inert = true;
        layer.style.background = 'rgba(0, 0, 0, 0.5)';
        setOpened(true);
    };
    const close = (e) => {
        if (e)
            e.stopPropagation();
        document.documentElement.inert = false;
        layer.style.background = 'transparent';
        setOpened(false);
    };
    const trigger = React.useCallback((node) => {
        if (!node)
            return;
        const handleClick = (e) => {
            e.stopPropagation();
            open();
        };
        node.addEventListener('click', handleClick);
        return () => node.removeEventListener('click', handleClick);
    }, []);
    const positioner = React.useMemo(() => new ModalPositioner(placement, options), [placement, options]);
    const modal = React.useCallback((node) => {
        if (!node)
            return;
        const update = () => setPositioning(positioner.position(node.getBoundingClientRect()));
        const handleRootClick = (e) => {
            if (closer !== 'button' && closer !== 'none' && e.target !== node)
                close();
        };
        update();
        layer.addEventListener('click', handleRootClick);
        const rootObserver = new ResizeObserver(update);
        rootObserver.observe(layer);
        const nodeObserver = new ResizeObserver(update);
        nodeObserver.observe(node);
        return () => {
            layer.removeEventListener('click', handleRootClick);
            rootObserver.disconnect();
            nodeObserver.disconnect();
        };
    }, []);
    return (_jsx(ModalContext.Provider, { value: { positioning, closer, opened, open, close, trigger, modal }, children: children }));
};
ModalProvider.displayName = 'ModalProvider';
export default ModalProvider;
