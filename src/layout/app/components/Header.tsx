import { useNavigate } from "react-router-dom";
import { Add, LogoMobile, VerticalEllipsis } from "../../../assets";
import { PrimaryBtn } from "../../../components/buttons";
import { useTheme } from "../../../hooks";
import BoardsPanelToggle from "./BoardsPanelToggle";

function Header() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleAddTaskNavigation = () => navigate("new-task");
  return (
    <header
      className={`h-16 w-full flex gap-4 items-center px-4 ${
        theme === "light" ? "bg-white" : "bg-dark-grey"
      }`}
    >
      <img src={LogoMobile} alt="" />

      <BoardsPanelToggle />

      <div className="flex items-center gap-2">
        <PrimaryBtn size="small" onClick={handleAddTaskNavigation}>
          <div className="px-4">
            <img src={Add} alt="" />
          </div>
        </PrimaryBtn>
        <button type="button">
          <img src={VerticalEllipsis} alt="" />
        </button>
      </div>
    </header>
  );
}

export default Header;
