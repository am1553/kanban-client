import { createContext, useEffect, useState } from "react";
import useCookie from "../../hooks/useCookie";
import { auth } from "../../lib/axios-config";

type Context = {
  token: string | null;
  login: (data: LoginData) => Promise<any>;
  register: (data: RegisterData) => Promise<any>;
  logout: () => void;
};
type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
type LoginData = { email: string; password: string };

const defaultContext: Context = {
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
};

export const AuthContext = createContext<Context>(defaultContext);

export default function AuthContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const { setCookie, removeCookie, getCookie } = useCookie();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const tokenExists = getCookie("token");
    if (tokenExists !== "undefined" && tokenExists) {
      setToken(tokenExists);
    }
    if (tokenExists === "undefined") {
      localStorage.removeItem("user");
      removeCookie("token");
    }
  }, [getCookie, removeCookie]);

  const login = async (data: LoginData) => {
    return await auth
      .post("signin", data)
      .then((res) => {
        const { token, user } = res.data;
        setToken(token);
        setCookie("token", token);
        localStorage.setItem("user", user);
        return res.data;
      })
      .catch((err) => err);
  };

  const register = async (data: RegisterData) => {
    return await auth
      .post("users", data)
      .then((res) => {
        const { token, user } = res.data;
        setToken(token);
        setCookie("token", token);
        localStorage.setItem("user", user);
        return res.data;
      })
      .catch((err) => console.error(err));
  };

  const logout = () => {
    setToken(null);
    removeCookie("token");
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  const values = { token, login, register, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
