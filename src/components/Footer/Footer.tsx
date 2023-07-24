/*eslint-disable*/
import React, { useContext, useCallback } from "react";
import { Todo } from "../../types/Todo";
import { TodosContext } from "../../context/TodosContext";
import { TodosFilter } from "../TodosFilter";

export const Footer: React.FC = () => {
  const { todos, onClearCompleted } = useContext(TodosContext);

  const countUnfinished = useCallback(
    (listTodo: Todo[]) => {
      return listTodo.map((todo) => todo.completed).filter((todo) => !todo)
        .length;
    },
    [todos]
  );

  const countFinished = useCallback(
    (listTodo: Todo[]) => {
      return listTodo.map((todo) => todo.completed).filter((todo) => todo)
        .length;
    },
    [todos]
  );
  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {countUnfinished(todos)} items left
      </span>

      <TodosFilter />

      {countFinished(todos) ? (
        <button
          onClick={() => onClearCompleted()}
          type="button"
          className="clear-completed"
        >
          Clear completed
        </button>
      ) : (
        ""
      )}
    </footer>
  );
};
