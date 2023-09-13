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

  const handleTodoCompleting = (event: React.ChangeEvent<HTMLInputElement>) => {
    const todosCopy = [...todos];
    const todoIndex = todos.findIndex(({ id: todoId }) => todoId === id);

    todosCopy.splice(todoIndex, 1, {
      ...todo,
      completed: event.target.checked,
    });

    setTodos(todosCopy);
  };

  const handleTodoDeleting = () => {
    const todosCopy = [...todos];
    const todoIndex = todosCopy.findIndex(({ id: todoId }) => todoId === id);

    todosCopy.splice(todoIndex, 1);
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
          onChange={handleTodoCompleting}
        />
        <label
          htmlFor="toggle-view"
        >
          {title}
        </label>
        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleTodoDeleting}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
