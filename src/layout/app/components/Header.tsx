import { Add, LogoMobile, VerticalEllipsis } from "../../../assets";
import { PrimaryBtn } from "../../../components/buttons";
import { useOnClickOutside, useTheme } from "../../../hooks";
import BoardsPanelToggle from "./BoardsPanelToggle";
import { Modal } from "../../../components/portal";
import { EditBoard, NewTask, useBoards } from "../../../features/board";
import { useRef, useState } from "react";
import DeleteConfirmation from "../../../components/delete-confirmation";
import Loader from "../../../components/loader";

function Header() {
  const { boardQuery, deleteMutation } = useBoards();
  const board = boardQuery?.data;
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isModalNewTask, setIsModalNewTask] = useState<boolean>(false);
  const [isModalEditBoard, setIsModalEditBoard] = useState<boolean>(false);
  const [isModalDeleteBoard, setIsModalDeleteBoard] = useState<boolean>(false);
  const { theme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const handleOpenModalNewTask = () => setIsModalNewTask(true);
  const handleOpenModalEditBoard = () => {
    setIsModalEditBoard(true);
    setIsMenu(false);
  };
  const handleOpenModalDeleteBoard = () => {
    setIsModalDeleteBoard(true);
    setIsMenu(false);
  };
  const closeModalNewTask = () => setIsModalNewTask(false);
  const closeModalEditBoard = () => setIsModalEditBoard(false);
  const closeModalDeleteBoard = () => setIsModalDeleteBoard(false);

  const handleDeleteBoard = () => {
    deleteMutation.mutate();
    setIsModalDeleteBoard(false);
  };

  const handleMenu = () => setIsMenu((prev) => !prev);
  useOnClickOutside(menuRef, () => setIsMenu(false));
  return (
    <>
      <header
        className={`h-16 lg:h-24 w-full flex gap-4 items-center px-4 md:px-6 lg:px-8 ${
          theme === "light" ? "bg-white" : "bg-dark-grey"
        }`}
      >
        <img src={LogoMobile} alt="" className="md:hidden" />
        <div className="flex-1">
          {board?.name ? <BoardsPanelToggle /> : null}
        </div>

        <div className="flex items-center md:gap-2 lg:gap-4">
          <PrimaryBtn
            size="small"
            onClick={handleOpenModalNewTask}
            disabled={!board}
          >
            <div className="px-4">
              <img src={Add} alt="" className="md:hidden" />
              <span className="text-m max-md:hidden">+ Add New Task</span>
            </div>
          </PrimaryBtn>
          <button
            type="button"
            onClick={handleMenu}
            className="px-2"
            disabled={!board}
          >
            <img src={VerticalEllipsis} alt="" />
          </button>
          {isMenu && (
            <div
              ref={menuRef}
              className={`absolute ${
                theme === "light" ? "bg-white" : "bg-dark-grey"
              } p-4 flex flex-col rounded-md shadow-md top-20 right-10 items-start`}
            >
              <button
                className="p-1 w-full text-left"
                onClick={handleOpenModalEditBoard}
              >
                Edit Board
              </button>
              <button
                className="p-1 w-full text-left text-red"
                onClick={handleOpenModalDeleteBoard}
              >
                Delete Board
              </button>
            </div>
          )}
        </div>
      </header>
      <Modal isOpen={isModalNewTask}>
        <NewTask closeModal={closeModalNewTask} />
      </Modal>
      <Modal isOpen={isModalEditBoard}>
        <EditBoard closeModal={closeModalEditBoard} />
      </Modal>
      <Modal isOpen={isModalDeleteBoard} onClose={closeModalDeleteBoard}>
        {deleteMutation.isLoading ? (
          <Loader />
        ) : (
          <DeleteConfirmation
            title="Delete this board?"
            confirmationText={`Are you sure you want to delete the ‘${board?.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
            onCancel={closeModalDeleteBoard}
            onDelete={handleDeleteBoard}
          />
        )}
      </Modal>
    </>
  );
}

export default Header;
