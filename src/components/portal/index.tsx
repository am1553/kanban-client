import { useRef } from "react";
import ReactDom from "react-dom";
interface ModalProps {
  children: JSX.Element;
  onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
  const { children } = props;
  const ref = useRef<HTMLDivElement>(null);
  return ReactDom.createPortal(
    <div
      className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      ref={ref}
    >
      {children}
    </div>,
    document.getElementById("portal")!
  );
};
