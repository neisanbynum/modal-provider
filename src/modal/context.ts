import React from "react";
import { ModalContextValues } from "@/types";

export const ModalContext = React.createContext<ModalContextValues|null>(null)

export const useModalContext = () => {
	const context = React.useContext(ModalContext)
	if (!context) throw new Error('useModalContext must be used within a ModalProvider')
	return context
}