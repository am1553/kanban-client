import { Link, useParams } from "react-router-dom";
import { Board, WhiteBoard } from "../../../assets";

function LinkListItem({
  id,
  name,
  onClick,
}: {
  id: string;
  name: string;
  onClick: () => void;
}) {
  const { boardID } = useParams();
  return (
    <Link
      to={id}
      className={`h-12 rounded-r-full flex items-center gap-4 text-m text-medium-grey px-6 mr-6 ${
        boardID === id ? "bg-main-purple text-white" : "bg-opacity-0"
      }`}
      onClick={onClick}
    >
      <img src={boardID === id ? WhiteBoard : Board} alt="" />
      <span>{name}</span>
    </Link>
  );
}

export default LinkListItem;
