import { DestructiveBtn, SecondaryBtn } from "../buttons";
import { useOnClickOutside, useTheme } from "../../hooks";
import { useRef } from "react";

function DeleteConfirmation({
  title,
  confirmationText,
  onDelete,
  onCancel,
}: {
  title: string;
  confirmationText: string;
  onDelete: () => void;
  onCancel: () => void;
}) {
  const confirmationRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  useOnClickOutside(confirmationRef, onCancel);
  return (
    <div
      ref={confirmationRef}
      className={`p-4 flex flex-col gap-6 max-w-[480px] w-full mx-4 rounded-md shadow-md ${
        theme === "dark" ? "bg-dark-grey" : "bg-white"
      }`}
    >
      <span className="text-red text-l">{title}</span>
      <p className="text-medium-grey">{confirmationText}</p>
      <div className="flex gap-4">
        <DestructiveBtn onClick={onDelete} type="button">
          <span>Delete</span>
        </DestructiveBtn>
        <SecondaryBtn onClick={onCancel} type="button">
          <span>Cancel</span>
        </SecondaryBtn>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
