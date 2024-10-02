"use client";

import {
  ButtonHTMLAttributes,
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { PiX } from "react-icons/pi";

interface ModalContextType {
  isOpened: boolean;
  open: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProps {
  children: ReactNode;
}
function Modal({ children }: ModalProps) {
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
  };

  const open = () => {
    setVisible(true);
  };

  return (
    <ModalContext.Provider value={{ isOpened: visible, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement;
}
function Open({ children, ...rest }: OpenProps) {
  const { open } = useContext(ModalContext) as ModalContextType;
  return cloneElement(children, { ...rest, onClick: () => open() });
}

interface WindowProps {
  children: ReactNode;
}
function Window({ children }: WindowProps) {
  const { isOpened, close } = useContext(ModalContext) as ModalContextType;
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div className="absolute bottom-0 left-0 right-0 top-0 flex content-center items-center justify-center bg-neutral-800/70">
      <div className="relative min-w-96 rounded-md border-2 border-neutral-700 bg-neutral-800 text-neutral-200">
        {children}
      </div>
    </div>,
    document.body,
  );
}

interface HeaderProps {
  children: ReactNode;
}
function Header({ children }: HeaderProps) {
  const { close } = useContext(ModalContext) as ModalContextType;

  return (
    <div className="relative border-b-2 border-neutral-700 p-4">
      {children}
      <button onClick={close} className="absolute right-4 top-4">
        <PiX />
      </button>
    </div>
  );
}

interface BodyProps {
  children: ReactElement;
}
function Body({ children }: BodyProps) {
  const { close } = useContext(ModalContext) as ModalContextType;

  return (
    <div className="p-4">{cloneElement(children, { closeModal: close })}</div>
  );
}

Modal.Open = Open;
Modal.Window = Window;
Modal.Header = Header;
Modal.Body = Body;

export default Modal;
