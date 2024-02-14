import { useEffect, useRef } from "react";
import ReactDom from "react-dom";
interface ModalProps {
  children: JSX.Element;
  onClose?: () => void;
  isOpen?: boolean;
}

export const Modal = (props: ModalProps) => {
  const { children, isOpen } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    document.addEventListener("DOMContentLoaded", function () {
      if (isOpen) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auth";
      }
    });
  }, [isOpen]);
  if (!isOpen) return;
  return ReactDom.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      ref={ref}
    >
      {children}
    </div>,
    document.getElementById("portal")!
  );
};
