import React from "react";
const useTrigger = () => {
    const ref = React.useCallback((node) => {
        if (!node)
            return;
        const handleClick = () => open();
        node.addEventListener('click', handleClick);
        return () => node.removeEventListener('click', handleClick);
    }, []);
    return ref;
};
export default useTrigger;
