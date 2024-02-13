import { useMutation } from "react-query";
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

  const handleAuthSuccess = async (token: string, user: User) => {
    setCookie("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    const fetchBoards = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/boards`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.error(error);
      }
    };
    const boards = await fetchBoards();
    navigate(boards.length < 1 ? "/" : `/${boards[0].id}`);
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
