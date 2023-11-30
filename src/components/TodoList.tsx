/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';

export const TodoList: React.FC = () => {
  const todos = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <li key={todo.id}>
          <div className="view">
            <input type="checkbox" className="toggle" id={todo.id.toString()} />
            <label htmlFor={todo.id.toString()}>{todo.title}</label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
            />
          </div>
          <input type="text" className="edit" />
        </li>

      ))}
    </ul>
  );
};
