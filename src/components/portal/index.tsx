import { useRef } from "react";
import ReactDom from "react-dom";
interface ModalProps {
  children: JSX.Element;
  onClose?: () => void;
  isOpen?: boolean;
}

export const Modal = (props: ModalProps) => {
  const { children, isOpen } = props;
  const ref = useRef<HTMLDivElement>(null);
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
