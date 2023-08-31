/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useContext } from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const { title, completed, id } = todo;

  const handleCheckboxChange = () => {
    const toggleCompleted = () => {
      return todos.map(currentTodo => {
        if (currentTodo.id === id) {
          return { ...currentTodo, completed: !currentTodo.completed };
        }

        return currentTodo;
      });
    };

    setTodos(toggleCompleted());
  };

  const removeItem = () => {
    const handleRemove = todos.filter(currentTodo => currentTodo.id !== id);

    setTodos(handleRemove);
  };

  return (
    <>
      <li
        className={cn({
          completed,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={completed}
            onChange={handleCheckboxChange}
          />
          <label>{title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={removeItem}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    </>
  );
};
