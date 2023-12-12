import React from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const Todos = () => {
  const { todoList,
    removeItem,
    markAsCompleted
  } = React.useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todoList.map((todoItem) => (
        <li
          className={`item ${todoItem.completed ? 'completed' : ''}`}
          key={todoItem.id}
        >
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-completed" />
            <label htmlFor="toggle-completed">{todoItem}</label>
            <button type="button" className="destroy" data-cy="deleteTodo">
              .
            </button>
          </div>
          <input type="text" className="edit" />
        </li>
      ))}
    </ul>
  );
}
