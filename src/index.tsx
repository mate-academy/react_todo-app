import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { App } from "./App";

import "./styles/index.css";
import "./styles/todo-list.css";
import "./styles/filters.css";

const container = document.getElementById("root") as HTMLDivElement;

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
