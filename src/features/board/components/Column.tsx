import { TaskType } from "../services";
import Task from "./Task";

function Column({
  data,
}: {
  data: {
    name: string;
    id: string;
    color?: string;
    tasks: TaskType[] | undefined;
  };
}) {
  return (
    <div className="flex flex-col gap-6 w-72">
      <div className="flex items-center gap-4">
        <div
          className={`h-4 w-4 rounded-full`}
          style={{ backgroundColor: data.color }}
        ></div>
        <span className="text-s uppercase text-medium-grey">
          {data.name} ({data?.tasks?.length})
        </span>
      </div>

      <ul className="flex flex-col gap-4">
        {data.tasks?.map((task) => (
          <Task data={task} key={task.id} />
        ))}
      </ul>
    </div>
  );
}

export default Column;
