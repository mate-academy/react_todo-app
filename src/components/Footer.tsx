import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const completedTodos = todos.filter(todo => !todo.completed);

  const clearComleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${completedTodos.length} items left`}
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">All</a>
        </li>

        <li>
          <a href="#/active">Active</a>
        </li>

        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>

      <button type="button" className="clear-completed" onClick={clearComleted}>
        Clear completed
      </button>
    </footer>
  );
};
