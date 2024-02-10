import { useEffect } from "react";
import { useTheme } from "./hooks";
import AppLayout from "./layout/app";
import { Outlet } from "react-router-dom";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const veryDarkGrey = "#20212C";
    const lightGreyBg = "#F4F7FD";
    body.style.backgroundColor = theme === "light" ? lightGreyBg : veryDarkGrey;
  }, [theme]);
  return (
    <div
      className={`${
        theme === "light" ? "text-black" : "text-white"
      } text-body-m md:text-body-l`}
    >
      <AppLayout>
        <Outlet />
      </AppLayout>
    </div>
  );
}

export default App;
