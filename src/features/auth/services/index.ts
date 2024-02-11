import { useMutation } from "react-query";
import { auth } from "../../../lib/axios-config";
import { useNavigate } from "react-router-dom";
import { useAuth, useCookie } from "../../../hooks";

type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export const useAuthServices = () => {
  const navigate = useNavigate();
  const { setCookie } = useCookie();
  const { login, register } = useAuth();

  const handleAuthSuccess = (token: string, user: User) => {
    setCookie("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => login(data),
    onSuccess: (res) => {
      if (!res.token) {
        throw Error(res.response.data.message);
      }
      return handleAuthSuccess(res.token, res.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: (res) => {
      if (!res.token) {
        throw Error(res.response.data.message);
      }
      return handleAuthSuccess(res.token, res.user);
    },
  });

  return { loginMutation, registerMutation, handleAuthSuccess };
};
