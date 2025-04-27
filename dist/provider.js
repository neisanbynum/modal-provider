import { jsx as _jsx } from "react/jsx-runtime";
import { usePortalLayer } from 'portal-layer';
import React from 'react';
import ModalPositioner from './positioner';
import { ModalContext } from './context';
const ModalProvider = ({ children, opened: manuallyOpened, closer = 'button', placement = 'center', options }) => {
    const layer = usePortalLayer();
    const portal = React.useRef(null);
    const [opened, setOpened] = React.useState(manuallyOpened !== null && manuallyOpened !== void 0 ? manuallyOpened : false);
    const [rendering, setRendering] = React.useState({});
    React.useEffect(() => {
        if (manuallyOpened)
            open();
    }, [manuallyOpened]);
    const open = () => {
        layer.style.background = 'rgba(0, 0, 0, 0.5)';
        const node = portal.current;
        if (node) {
            node.inert = false;
            node.ariaHidden = 'false';
            setRendering(Object.assign(Object.assign({}, rendering), { opacity: 1 }));
        }
        setOpened(true);
    };
    const close = () => {
        layer.style.background = 'transparent';
        const node = portal.current;
        if (node) {
            node.inert = true;
            node.ariaHidden = 'true';
            setRendering(Object.assign(Object.assign({}, rendering), { opacity: 0 }));
        }
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
        portal.current = node;
        const update = () => {
            const position = positioner.position(node.getBoundingClientRect());
            setRendering(Object.assign(Object.assign({}, rendering), { position: 'fixed', top: position.top, left: position.left }));
        };
        const handleRootClick = (e) => {
            if (closer !== 'button' && closer !== 'none' && e.target === layer)
                close();
        };
        close();
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
    return _jsx(ModalContext.Provider, { value: { rendering, layer, opened, open, close, trigger, modal }, children: children });
};
ModalProvider.displayName = 'ModalProvider';
export default ModalProvider;
