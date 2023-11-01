import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo, TodosContext } from '../TodosContext';
/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    handleCompletedChange,
    handleTodoDelete,
  } = useContext(TodosContext);

  return (
    <li className={cn({ completed: todo.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => handleCompletedChange(todo.id)}
        />
        <label htmlFor="toggle-view">{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleTodoDelete(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
