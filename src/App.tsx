/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import { TodosProvider } from "./context/TodosContext";
import { TodoApp } from "./components/TodoApp";
import { FilterProvider } from "./context/FilterContext";

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <FilterProvider>
        <TodoApp />
      </FilterProvider>
    </TodosProvider>
  );
};
