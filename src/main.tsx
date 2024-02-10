import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeContextProvider from "./context/theme/index.tsx";
import { Board, NewTask } from "./features/board/index.ts";

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
        path: "new-task",
        Component: NewTask,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </ThemeContextProvider>
  </React.StrictMode>
);
