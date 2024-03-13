import { useRef, useState } from "react";
import { useOnClickOutside, useTheme } from "../../../hooks";
import { VerticalEllipsis } from "../../../assets";
import { Checkbox, Dropdown } from "../../../components/form-elements";
import { TaskType, useBoards, useSubtasks, useTasks } from "../services";
import Loader from "../../../components/loader";

function ViewTask({
  closeModal,
  openModalEditTask,
  openModalDeleteTask,
  data,
}: {
  closeModal: () => void;
  openModalEditTask: () => void;
  openModalDeleteTask: () => void;
  data: TaskType;
}) {
  const { boardQuery } = useBoards();
  const { updateMutation: updateSubtaskMutation } = useSubtasks();
  const { editMutation: updateTaskMutation } = useTasks();
  const { theme } = useTheme();
  const [isMenu, setIsMenu] = useState<boolean>(false);

  const board = boardQuery.data;
  const columnOptions = board?.columns.map((column) => ({
    label: column.name,
    value: column.id,
  }));
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const completedSubtasks = data.subtasks.filter(
    (subtask) => subtask.iscompleted
  );

  const handleMenuToggle = () => setIsMenu((prev) => !prev);

  const handleUpdateSubtaskMutation = (data: {
    id: string;
    title: string;
    iscompleted: boolean;
  }) => {
    updateSubtaskMutation.mutate(data);
  };

  const handleUpdateTaskMutation = (data: TaskType) => {
    updateTaskMutation.mutate(data);
  };

  useOnClickOutside(ref, closeModal);
  useOnClickOutside(menuRef, () => setIsMenu(false));
  return updateSubtaskMutation.isLoading || updateTaskMutation.isLoading ? (
    <Loader />
  ) : (
    <div
      className={` p-4 flex flex-col gap-4 max-w-[480px] w-full mx-4 rounded-md shadow-md ${
        theme === "dark" ? "bg-dark-grey" : "bg-white"
      }`}
      ref={ref}
    >
      <div className="relative flex gap-4">
        <span className="text-l flex-1">{data.title}</span>
        <button className="px-1" type="button" onClick={handleMenuToggle}>
          <img src={VerticalEllipsis} alt="" />
        </button>{" "}
        {isMenu && (
          <div
            ref={menuRef}
            className="absolute bg-white p-4 flex flex-col rounded-md shadow-md top-10 right-0 items-start z-50"
          >
            <button
              className="p-1 w-full text-left"
              onClick={openModalEditTask}
            >
              Edit Task
            </button>
            <button
              className="p-1 w-full text-left text-red"
              onClick={openModalDeleteTask}
            >
              Delete Task
            </button>
          </div>
        )}
      </div>

      <p className="text-medium-grey">{data.description}</p>

      <label className="text-medium-grey">
        Subtasks ({completedSubtasks.length} of {data.subtasks.length})
      </label>

      <ul className="flex flex-col gap-2">
        {data.subtasks.map((subtask) => {
          return (
            <li
              className={`p-2 rounded-md  ${
                theme === "dark" ? "bg-dark-grey" : "bg-light-grey-bg"
              } ${subtask.iscompleted ? "line-through" : null}`}
              key={subtask.id}
            >
              <Checkbox
                label={subtask.title}
                name="subtasks"
                onChange={(isChecked) =>
                  handleUpdateSubtaskMutation({
                    ...subtask,
                    id: subtask.id!,
                    iscompleted: isChecked,
                  })
                }
                isChecked={subtask.iscompleted}
              />
            </li>
          );
        })}
      </ul>

      <label className="text-medium-grey">Current Status</label>
      <Dropdown
        options={columnOptions || []}
        defaultSelected={
          columnOptions?.find((column) => column.value === data.column_id) ||
          null
        }
        onSelect={(columnID) =>
          handleUpdateTaskMutation({ ...data, column_id: columnID })
        }
        name={"status"}
      />
    </div>
  );
}

export default ViewTask;
