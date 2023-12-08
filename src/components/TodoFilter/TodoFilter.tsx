import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../store/TodosContext';
import { FilterOptions } from '../../types/FilterOptions';

export const TodoFilter: React.FC = () => {
  const {
    todos,
    filter,
    setTodos,
    setFilter,
  } = useContext(TodosContext);
  const leftTodos = todos.filter(todo => !todo.completed).length;
  const isCompleted = todos.some(todo => todo.completed);
  const normalizeHref = (href: string) => `#/${href.toLowerCase()}`;

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleToggleFilter = (option: FilterOptions) => {
    setFilter(option);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${leftTodos} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        {Object.values(FilterOptions).map(option => (
          <li key={option}>
            <a
              href={option === FilterOptions.ALL ? '#/' : normalizeHref(option)}
              className={classNames({
                selected: filter === option,
              })}
              onClick={() => handleToggleFilter(option)}
            >
              {option}
            </a>
          </li>
        ))}
      </ul>

      {isCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
