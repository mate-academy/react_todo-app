/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';

import { Todo } from '../Types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const deleteTodo = () => {
    const updatedTodos = todos.filter((item) => item.id !== todo.id);

    setTodos(updatedTodos);
  };

  const chengeChecked = () => {
    const updatedTodos = todos.map(currentTodo => {
      if (currentTodo.id === todo.id) {
        return {
          ...currentTodo,
          completed: !todo.completed,
        };
      }

      return currentTodo;
    });

    setTodos(updatedTodos);
  };

  return (
    <li className={classNames({ completed: todo.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={todo.completed}
          onChange={() => chengeChecked()}
        />
        <label htmlFor={`toggle-view-${todo.id}`}>{todo.titleStorege}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
