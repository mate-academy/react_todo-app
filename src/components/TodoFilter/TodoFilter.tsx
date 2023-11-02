import cn from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../../store/TodosContext';
import { FilterOptions } from '../../types/FilterOptions';

export const TodoFilter: React.FC = () => {
  const {
    todos,
    filter,
    setTodos,
    setFilter,
  } = useContext(TodosContext);

  const todosLeftCount = todos.filter(todo => !todo.completed).length;
  const areAnyCompleted = todos.some(todo => todo.completed);
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleFilter = (option: FilterOptions) => {
    setFilter(option);
  };

  const handleLink = (option: string) => {
    if (FilterOptions.All) {
      return '#/';
    }

    return `#/${option.toLowerCase()}`;
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeftCount} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        {Object.values(FilterOptions).map(option => (
          <li key={option}>
            <a
              href={handleLink(option)}
              className={cn({
                selected: filter === option,
              })}
              onClick={() => toggleFilter(option)}
            >
              {option}
            </a>
          </li>
        ))}
      </ul>

      {areAnyCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
