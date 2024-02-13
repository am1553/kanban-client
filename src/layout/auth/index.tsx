import { Outlet, useNavigate } from "react-router-dom";
import { useCookie } from "../../hooks";
import { useEffect } from "react";

function AuthLayout() {
  const { getCookie } = useCookie();
  const token = getCookie("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token && token !== "undefined") {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
