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
      className={`h-16 lg:h-24 w-full flex gap-4 items-center px-4 md:px-6 lg:px-8 ${
        theme === "light" ? "bg-white" : "bg-dark-grey"
      }`}
    >
      <img src={LogoMobile} alt="" className="md:hidden" />

      <BoardsPanelToggle />

      <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
        <PrimaryBtn size="small" onClick={handleAddTaskNavigation}>
          <div className="px-4">
            <img src={Add} alt="" className="md:hidden" />
            <span className="text-m max-md:hidden">+ Add New Task</span>
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
