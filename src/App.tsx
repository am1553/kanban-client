import { useEffect } from "react";
import { useTheme } from "./hooks";
import { Outlet, useNavigate, useParams } from "react-router-dom";
function App() {
  const { theme } = useTheme();
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const { boardID } = useParams();

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const veryDarkGrey = "#20212C";
    const lightGreyBg = "#F4F7FD";
    body.style.backgroundColor = theme === "light" ? lightGreyBg : veryDarkGrey;
  }, [theme]);

  useEffect(() => {
    if (user) return;
    navigate("/auth");
  }, [user, navigate]);

  useEffect(() => {
    if (boardID) {
      navigate(`/${boardID}`);
    }
  }, [boardID]);

  return (
    <div
      className={`${
        theme === "light" ? "text-black" : "text-white"
      } text-body-m md:text-body-l h-screen w-screen`}
    >
      <Outlet />
    </div>
  );
}

export default App;
