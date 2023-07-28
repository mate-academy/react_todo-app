/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../Types/Todo';
import { useLocalStorage } from '../../hooks/UseLocalStorege';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [isComplete, setIsComplete] = useState(todo.completed);

  // Функція для видалення todo за id зі списку todos
  const handleDelete = () => {
    const updatedTodos = todos.filter((item) => item.id !== todo.id);

    setTodos(updatedTodos);
  };

  return (
    <li className={classNames({ completed: isComplete })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={isComplete}
          onChange={(event) => setIsComplete(event.target.checked)}
        />
        <label htmlFor={`toggle-view-${todo.id}`}>{todo.titleStorege}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
