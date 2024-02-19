import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-items-center absolute top-0 z-40 backdrop-blur h-screen w-screen ">
          <div className="relative z-50 m-auto min-h-[200px] min-w-[80%] bg-white border border-black rounded-md p-3">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClose}
                className="w-9 h-9 text-black cursor-pointer"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
