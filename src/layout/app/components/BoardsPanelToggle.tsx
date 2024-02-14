import React from "react";
import { ChevronDown, ChevronUp } from "../../../assets";
import BoardsPanel from "./BoardsPanel";
import { NewBoard, useBoards } from "../../../features/board";
import { Modal } from "../../../components/portal";
function BoardsPanelToggle() {
  const { boardQuery } = useBoards();
  const board = boardQuery?.data;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  return (
    <>
      <div className="">
        <button
          className="flex items-center gap-2 md:hidden"
          type="button"
          onClick={toggleOpen}
        >
          <span className="text-l">{board?.name}</span>
          <img src={isOpen ? ChevronUp : ChevronDown} alt="" />
        </button>
        <span className="max-md:hidden text-xl">{board?.name}</span>
        {isOpen && (
          <div className="after:absolute after:inset-0 after:top-16 after:bg-black after:bg-opacity-50">
            <BoardsPanel setIsModal={setIsModal} setIsOpen={setIsOpen} />
          </div>
        )}
      </div>
      <Modal isOpen={isModal}>
        <NewBoard setIsModal={setIsModal} />
      </Modal>
    </>
  );
}

export default BoardsPanelToggle;
