import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContexts from "./Contexts/AuthContexts.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContexts>
        <RouterProvider router={router} />
      </AuthContexts>
    </QueryClientProvider>
  </React.StrictMode>
);
