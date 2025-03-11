import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { Filter } from '../utils/Enums';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, setTodos, todosFilter, setTodosFilter } =
    useContext(TodosContext);

  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: todosFilter === Filter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setTodosFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: todosFilter === Filter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setTodosFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: todosFilter === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setTodosFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos.length}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
