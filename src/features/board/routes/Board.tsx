import { useParams } from "react-router-dom";
import useBoardsData from "../../../hooks/useBoardsData";
import { Column } from "../components";

function Board() {
  const { boardID } = useParams();
  const board = useBoardsData().filter((item) => item.id === boardID)[0];

  return (
    <div className="flex gap-6 p-6 w-fit">
      {board.columns.map((column, i) => (
        <Column data={column} key={i} />
      ))}
    </div>
  );
}

export default Board;
