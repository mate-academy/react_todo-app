import React from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const Footer = () => {
  const { state: { todos }, dispatch } = React.useContext(TodosContext);

  const handleAllTasks = () => {
    dispatch({ type: 'SHOW_ALL_TASKS', filter: 'all' });
  };

  const handleActiveTasks = () => {
    dispatch({ type: 'SHOW_ACTIVE_TASKS', filter: 'active' });
  };

  const handleCompletedTasks = () => {
    dispatch({ type: 'SHOW_COMPLETED_TASKS', filter: 'completed' });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.length}
        <span> items left</span>
      </span>

      <ul className="filters">
        <li>
          <a onClick={handleAllTasks} href="#/" className="selected">All</a>
        </li>

        <li>
          <a onClick={handleActiveTasks} href="#/active">Active</a>
        </li>

        <li>
          <a onClick={handleCompletedTasks} href="#/completed">Completed</a>
        </li>
      </ul>

      <button
        type="button"
        onClick={handleClearCompleted}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
