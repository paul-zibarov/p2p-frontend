import { useState, useContext, createContext } from "react";
import { Modal } from '@mui/material';

export const ModalContext = createContext<{
    setOpen: (content: JSX.Element) => void;
    setClose: () => void;
    isOpened: boolean; 
} | null>(null);

export const ModalProvider = ({ children }: { children: JSX.Element }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [content, setContent] = useState(<div></div>)

    const setOpen = (content: JSX.Element) => {
        setIsOpened(true);
        setContent(content)
    }

    const setClose = () => setIsOpened(false);

    return (
        <ModalContext.Provider value={{setOpen, setClose, isOpened}}>
            <Modal open={isOpened} onClose={setClose}>
                {content}
            </Modal>
            {children}
        </ModalContext.Provider>
    )
}

export const useModals = () => {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error(
            "useModals hook must be used with a ModalProvider component"
        );
    }

    return context;
}