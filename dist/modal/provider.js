import { jsx as _jsx } from "react/jsx-runtime";
import ModalPositioner from "../utils/positioner";
import usePortal from "../utils/usePortal";
import useTrigger from "../utils/useTrigger";
import { usePortalLayer } from "portal-layer";
import React from "react";
import { ModalContext } from "./context";
const ModalProvider = ({ children, opened: manual, closer = 'button', placement = 'center', options }) => {
    const layer = usePortalLayer();
    const positioner = React.useMemo(() => new ModalPositioner(placement, options), [placement, options]);
    const trigger = useTrigger();
    const { opened, positioning, open, close, modal } = usePortal(layer, closer, positioner);
    React.useEffect(() => {
        if (manual)
            open();
    }, [manual]);
    return (_jsx(ModalContext.Provider, { value: { positioning, closer, opened, open, close, trigger, modal }, children: children }));
};
ModalProvider.displayName = 'ModalProvider';
export default ModalProvider;
