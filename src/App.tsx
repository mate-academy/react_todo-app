/* eslint-disable  */
import React from "react";
import { TodosProvider } from "./context/TodosContext";
import { TodoApp } from "./components/TodoApp";
import { FilterProvider } from "./context/FilterContext";

export const App: React.FC = () => {
  return (
    <FilterProvider>
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </FilterProvider>
  );
};
