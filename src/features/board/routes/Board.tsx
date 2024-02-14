import { useBoards } from "..";
import Loader from "../../../components/loader";
import { Column } from "../components";
import { Column as ColumnType, useTasks } from "../services";

function Board() {
  const { boardQuery } = useBoards();
  const board = boardQuery?.data;
  const { tasksQuery } = useTasks();
  const tasks = tasksQuery?.data;

  return boardQuery.isLoading ? (
    <div className="flex h-full w-full items-center justify-center">
      <Loader />
    </div>
  ) : (
    <div className="flex gap-6 p-6 w-fit">
      {board?.columns?.map((column: ColumnType) => {
        const columnTasks = tasks?.filter(
          (task) => task.column_id === column.id
        );
        const data = { ...column, tasks: columnTasks };
        return <Column data={data} key={column.id} />;
      })}
    </div>
  );
}

export default Board;
