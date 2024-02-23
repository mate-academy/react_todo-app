/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import { TodosContextProvider } from "./store";
import { TodoApp } from "./components/TodoApp";

export const App: React.FC = () => {
  return (
    <TodosContextProvider>
      <TodoApp />
    </TodosContextProvider>
  );
};
