/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from "react";
import { TodosContext } from "./store";

import { TodoHeader } from "./components/TodoHeader";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <TodoHeader />

      {todos.length > 0 && (
        <>
          <TodoList />
          <TodoFilter />
        </>
      )}
    </div>
  );
};
