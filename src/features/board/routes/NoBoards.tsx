import { useState } from "react";
import { NewBoard } from "..";
import { Modal } from "../../../components/portal";

function NoBoards() {
  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
        <span className="text-l text-medium-grey">
          No boards found.Create a board to begin.
        </span>
        <button
          type="button"
          className="flex items-center text-m gap-4 text-main-purple px-6"
          onClick={() => setIsModal(true)}
        >
          <span>+ Create New Board</span>
        </button>
      </div>
      <Modal isOpen={isModal}>
        <NewBoard setIsModal={setIsModal} />
      </Modal>
    </>
  );
}

export default NoBoards;
