import React from "react";
export const ModalContext = React.createContext(null);
export const useModalContext = () => {
    const context = React.useContext(ModalContext);
    if (!context)
        throw new Error('useModalContext must be used within a ModalProvider');
    return context;
};
