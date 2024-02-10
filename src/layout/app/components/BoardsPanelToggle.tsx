import React from "react";
import { ChevronDown, ChevronUp } from "../../../assets";
import BoardsPanel from "./BoardsPanel";
function BoardsPanelToggle() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex-1">
      <button
        className="flex items-center gap-2 md:hidden"
        type="button"
        onClick={toggleOpen}
      >
        <span className="text-l">Platform Launch</span>
        <img src={isOpen ? ChevronUp : ChevronDown} alt="" />
      </button>
      <span className="max-md:hidden text-xl">Platform Launch</span>
      {isOpen && (
        <div className="after:absolute after:inset-0 after:top-16 after:bg-black after:bg-opacity-50">
          <BoardsPanel setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
}

export default BoardsPanelToggle;
