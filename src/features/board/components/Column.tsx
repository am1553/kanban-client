import Task from "./Task";

function Column({ data }: { data: { name: string; tasks: [] } }) {
  return (
    <div className="flex flex-col gap-6 w-72">
      <div className="flex items-center gap-4">
        <div className="h-4 w-4 rounded-full bg-red"></div>
        <span className="text-s uppercase text-medium-grey">
          {data.name} ({data.tasks.length})
        </span>
      </div>

      <ul className="flex flex-col gap-4">
        {data.tasks.map((task, i) => (
          <Task data={task} key={i} />
        ))}
      </ul>
    </div>
  );
}

export default Column;
