/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { TodoContext } from './Components/TodoContext';
import { Header } from './Components/Header';
import TodoList from './Components/TodoList';
import { FilterType } from './types/FilterType';
import classNames from 'classnames';
import './styles/index.scss';

export const App: React.FC = () => {
  const {
    todos,
    clearCompleted,
    filter,
    setFilter,
    activeTodosCount,
    completedTodosCount,
  } = useContext(TodoContext) ?? {};

  const filterOption = Object.values(FilterType);
  const handleFilterChange = (newFilter: FilterType) => {
    setFilter?.(newFilter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {(todos?.length ?? 0) > 0 && <TodoList />}

        {(todos?.length ?? 0) > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {filterOption.map(option => {
                const label = option.charAt(0).toUpperCase() + option.slice(1);

                return (
                  <a
                    key={option}
                    href={`#/${option}`}
                    className={classNames('filter__link', {
                      selected: filter === option,
                    })}
                    data-cy={`FilterLink${label}`}
                    onClick={() => handleFilterChange(option)}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              data-cy="ClearCompletedButton"
              className="todoapp__clear-completed"
              onClick={clearCompleted}
              disabled={completedTodosCount === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
