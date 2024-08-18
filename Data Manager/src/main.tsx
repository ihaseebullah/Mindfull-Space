import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import MYRouter from "./Router/Routes.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MYRouter />
  </StrictMode>
);
