import React, { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContextProvider/TodosContextProvider';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const { id, title, completed } = todo;

  const handleChecking = (event: React.ChangeEvent<HTMLInputElement>) => {
    const todoIndex = todos.findIndex(({ id: todoId }) => todoId === id);

    const todosCopy = [...todos];

    todosCopy.splice(todoIndex, 1, {
      ...todo,
      completed: event.target.checked,
    });

    setTodos(todosCopy);
  };

  return (
    <li className={classNames({ completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleChecking}
        />
        <label
          htmlFor="toggle-view"
        >
          {title}
        </label>
        {/* eslint-disable-next-line */}
        <button type="button" className="destroy" data-cy="deleteTodo" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
