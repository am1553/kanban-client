import { useEffect } from "react";
import { useAuth, useTheme } from "./hooks";
import { Outlet } from "react-router-dom";
import { AppLayout, AuthLayout } from "./layout";

function App() {
  const { theme } = useTheme();
  const { token } = useAuth();
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
      } text-body-m md:text-body-l h-screen w-screen`}
    >
      {token ? (
        <AppLayout>
          <Outlet />
        </AppLayout>
      ) : (
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      )}
    </div>
  );
}

export default App;
