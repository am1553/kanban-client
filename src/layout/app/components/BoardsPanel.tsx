import { useOnClickOutside, useTheme } from "../../../hooks";
import LinkListItem from "./LinkListItem";
import { PurpleBoard } from "../../../assets";
import ThemeToggle from "./ThemeToggle";
import React, { SetStateAction, useMemo } from "react";
import { useBoards } from "../../../features/board/services";
type Props = {
  setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
  setIsModal?: React.Dispatch<SetStateAction<boolean>>;
};

function BoardsPanel({ setIsOpen, setIsModal }: Props) {
  const { boardsQuery } = useBoards();
  const boards = useMemo(() => {
    return boardsQuery.data;
  }, [boardsQuery.data]);
  const { theme } = useTheme();
  const panelRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(panelRef, () => setIsOpen && setIsOpen(false));
  return (
    <>
      <div
        className={`text-s max-w-80 w-full md:h-full max-md:rounded-md max-md:absolute max-md:-translate-x-2/4 max-md:left-2/4 z-50 top-20 flex flex-col gap-4 py-6 ${
          theme === "light" ? "bg-white" : "bg-dark-grey"
        }`}
        ref={panelRef}
      >
        <span className="uppercase text-medium-grey px-6">
          all boards ({boards?.length})
        </span>

        <nav className="flex flex-col gap-4 md:h-full">
          <ul className="flex flex-col">
            {boards?.map((board: { id: string; name: string }) => (
              <LinkListItem
                key={board.id}
                name={board.name}
                id={board.id}
                onClick={() => setIsOpen && setIsOpen(false)}
              />
            ))}
          </ul>
          <button
            type="button"
            className="flex items-center text-m gap-4 text-main-purple px-6"
            onClick={() => {
              if (setIsOpen) {
                setIsOpen(false);
              }
              if (setIsModal) {
                setIsModal(true);
              }
            }}
          >
            <img src={PurpleBoard} alt="" />
            <span>+ Create New Board</span>
          </button>
        </nav>

        <div className="px-4">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export default BoardsPanel;
