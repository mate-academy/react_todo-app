import React from "react";
import { TodoApp } from "./components/TodoApp";
import { TodosProvider } from "./components/TodosContext";

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
};
