/*eslint-disable*/
import cn from "classnames";

import React, { useContext } from "react";
import { Todo } from "../../types/Todo";
import { TodosContext } from "../../context/TodosContext";

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleStatus, onDeleteTodo } = useContext(TodosContext);
  return (
    <li className={cn({ completed: todo.completed })}>
      <div className="view">
        <input
          onChange={() => toggleStatus(todo.id)}
          type="checkbox"
          className="toggle"
          id="toggle-view"
        />
        <label htmlFor="toggle-view">{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDeleteTodo(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
