/* eslint-disable react/prop-types */
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useClick } from "../hooks/useClick";


const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = (name) => setOpenName(name);
  const close = () => setOpenName("");
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, text}) {
  const { openName, close } = useContext(ModalContext);
  const ref = useClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white bg-opacity-30 backdrop-blur`}
    >
      <div
        ref={ref}
        className={`absolute flex flex-col space-y-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-h-extraLg w-extraLg max-w-full  p-9 bg-white border-none rounded-lg`}
      >
        {text ? (
          <h2 className="text-xl font-bold text-blues-400">{text}</h2>
        ) : null}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
