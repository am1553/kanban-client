import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeContextProvider from "./context/theme/index.tsx";
import { Board, NewTask } from "./features/board/index.ts";
import { Login, Register } from "./features/auth/index.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContextProvider from "./context/auth/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: ":boardID",
        Component: Board,
      },
      {
        path: "new-task",
        Component: NewTask,
      },
    ],
  },
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </ThemeContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
