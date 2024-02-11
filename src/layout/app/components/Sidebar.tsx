import { LogoDark, LogoLight } from "../../../assets";
import { useAuth, useTheme } from "../../../hooks";
import BoardsPanel from "./BoardsPanel";

function Sidebar() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  return (
    <div
      className={`max-md:hidden w-72 lg:w-80 flex flex-col border-r  ${
        theme === "light"
          ? "bg-white border-lines-light"
          : "bg-dark-grey border-lines-dark"
      }`}
    >
      <div className="h-16 lg:h-24 w-full flex items-center pl-8">
        <img src={theme === "light" ? LogoDark : LogoLight} alt="" />
      </div>
      <BoardsPanel />
      <button className="px-6 py-2" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
