import { useState } from "react";
import { Modal } from "../../../components/portal";
import { useTheme } from "../../../hooks";
import { TaskType, useTasks } from "../services";
import ViewTask from "./ViewTask";
import { EditTask } from "..";
import DeleteConfirmation from "../../../components/delete-confirmation";
import Loader from "../../../components/loader";

function Task({ data }: { data: TaskType }) {
  const { deleteMutation } = useTasks();
  const [isModalViewTask, setIsModalViewTask] = useState<boolean>(false);
  const [isModalEditTask, setIsModalEditTask] = useState<boolean>(false);
  const [isModalDeleteTask, setIsModalDeleteTask] = useState<boolean>(false);
  const { theme } = useTheme();
  const completeSubtasks = data.subtasks.filter(
    (subtask) => subtask.iscompleted
  );
  const handleOpenIsModalViewTask = () => setIsModalViewTask(true);
  const handleCloseIsModalViewTask = () => setIsModalViewTask(false);
  const handleCloseIsModalEditTask = () => setIsModalEditTask(false);
  const handleCloseIsModalDeleteTask = () => setIsModalDeleteTask(false);
  const openModalEditTask = () => {
    setIsModalViewTask(false);
    setIsModalEditTask(true);
  };
  const openModalDeleteTask = () => {
    setIsModalViewTask(false);
    setIsModalDeleteTask(true);
  };
  const handleDeleteTask = () => {
    deleteMutation.mutate(data.id!);
  };
  return (
    <>
      <li
        className={`flex flex-col p-4 rounded-md shadow-md w-full cursor-pointer ${
          theme === "light" ? "bg-white" : "bg-dark-grey"
        }`}
        onClick={handleOpenIsModalViewTask}
      >
        <span className="text-m">{data.title}</span>
        <span className="font-semibold text-medium-grey">
          {completeSubtasks.length} of {data.subtasks.length} subtasks
        </span>
      </li>

      <Modal isOpen={isModalViewTask} onClose={handleCloseIsModalViewTask}>
        <ViewTask
          closeModal={handleCloseIsModalViewTask}
          openModalEditTask={openModalEditTask}
          openModalDeleteTask={openModalDeleteTask}
          data={data}
        />
      </Modal>
      <Modal isOpen={isModalEditTask} onClose={handleCloseIsModalEditTask}>
        <EditTask closeModal={handleCloseIsModalEditTask} data={data} />
      </Modal>
      <Modal isOpen={isModalDeleteTask} onClose={handleCloseIsModalDeleteTask}>
        {deleteMutation.isLoading ? (
          <Loader />
        ) : (
          <DeleteConfirmation
            title="Delete this task?"
            confirmationText={`Are you sure you want to delete the ‘${data.title}’ task and its subtasks? This action cannot be reversed.`}
            onDelete={handleDeleteTask}
            onCancel={handleCloseIsModalDeleteTask}
          />
        )}
      </Modal>
    </>
  );
}

export default Task;
