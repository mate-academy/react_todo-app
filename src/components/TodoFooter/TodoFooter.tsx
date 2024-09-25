import React from 'react';
import cn from 'classnames';
import { Filters } from '../../types';
import { useTodosContext } from '../controllers/todos/useTodosContext';
import './TodoFooter.css';

export const TodoFooter: React.FC = () => {
  const { todos, onDeleteCompletedTodos, onChangeFilters, selectedFilter } =
    useTodosContext();
  const filtersValue = Object.values(Filters);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodo = todos.some(todo => todo.completed);
  let isDeletionCompleted = false;

  const handleDeleteCompleted = () => {
    isDeletionCompleted = true;
    onDeleteCompletedTodos();
  };

  return (
    <footer
      className={cn('todoapp__footer', { hidden: !todos.length })}
      data-cy="Footer"
    >
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filtersValue.map(filter => (
          <a
            key={filter}
            href={`#/${filter !== Filters.All ? filter.toLowerCase() : ''}`}
            className={cn('filter__link', {
              selected: filter === selectedFilter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => onChangeFilters(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={isDeletionCompleted || !hasCompletedTodo}
        style={{ visibility: !hasCompletedTodo ? 'hidden' : 'visible' }}
        onClick={handleDeleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
