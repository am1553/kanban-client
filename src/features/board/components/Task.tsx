import { useTheme } from "../../../hooks";

function Task({
  data,
}: {
  data: {
    title: string;
    description: string;
    status: string;
    subtasks: { title: string; isCompleted: boolean }[];
  };
}) {
  const { theme } = useTheme();
  const completeSubtasks = data.subtasks.filter(
    (subtask) => subtask.isCompleted
  );

  return (
    <li
      className={`flex flex-col p-4 rounded-md shadow-md w-full cursor-move ${
        theme === "light" ? "bg-white" : "bg-dark-grey"
      }`}
      draggable
    >
      <span className="text-m">{data.title}</span>
      <span className="font-semibold text-medium-grey">
        {completeSubtasks.length} of {data.subtasks.length} subtasks
      </span>
    </li>
  );
}

export default Task;
