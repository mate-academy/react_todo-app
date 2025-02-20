import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { FilterType } from '../types/FilterType';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);

  const todosToDelete = state.todos
    .filter(todo => todo.completed)
    .map(todo => todo.id);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {state.todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterType).map(filter => (
          <a
            href={`#/${filter === 'All' ? '' : filter}`}
            className={classNames('filter__link', {
              selected: state.filter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            key={filter}
            onClick={() => dispatch({ type: 'FILTER_TODOS', payload: filter })}
          >
            {filter}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() =>
          dispatch({ type: 'DELETE_COMPLETED_TODOS', payload: todosToDelete })
        }
      >
        Clear completed
      </button>
    </footer>
  );
};
