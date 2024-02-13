import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeContextProvider from "./context/theme/index.tsx";
import { Board, NoBoards } from "./features/board/index.ts";
import { Login, Register } from "./features/auth/index.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContextProvider from "./context/auth/index.tsx";
import { AuthLayout } from "./layout/index.ts";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: ":boardID",
        Component: Board,
      },
      {
        path: "",
        Component: NoBoards,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
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
