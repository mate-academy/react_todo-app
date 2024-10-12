import { FC, useContext } from 'react';
import cn from 'classnames';

import { Filter } from '../../types/Filter';

import { DispatchContext, StateContext } from '../../store/store';

export const Footer: FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, filter } = useContext(StateContext);

  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const uncompletedTodos = todos.filter(todo => !todo.completed);

  const handleClearCompleted = () => {
    dispatch({ type: 'changeTodos', payload: uncompletedTodos });
  };

  const message = `${uncompletedTodos.length} ${uncompletedTodos.length === 1 ? 'item' : 'items'} left`;

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {message}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filterTitle => {
          return (
            <a
              key={filterTitle}
              href={`#/${filterTitle.toLowerCase()}`}
              className={cn('filter__link', {
                selected: filter === filterTitle,
              })}
              data-cy={`FilterLink${filterTitle}`}
              onClick={() =>
                dispatch({ type: 'setFilter', payload: filterTitle })
              }
            >
              {filterTitle}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={!completedTodosCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
