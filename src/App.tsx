/* eslint-disable jsx-a11y/control-has-associated-label */
/*eslint-disable*/

import React from "react";
import { TodoProvider } from "./TodosContext";
import { TodoApp } from "./components/TodoApp";

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
