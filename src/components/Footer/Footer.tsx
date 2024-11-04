import React, { useContext } from 'react';
import cn from 'classnames';

import { SortBy } from '../../types/SortBy';
import { DispatchContext, StateContext } from '../../store/Store';

type Props = {
  howSort: SortBy;
  setHowSort: (el: SortBy) => void;
};

export const Footer: React.FC<Props> = ({ howSort, setHowSort }) => {
  const dispatch = useContext(DispatchContext);
  const todos = useContext(StateContext);

  const handleClearCompleted = () => {
    todos
      .filter(todo => todo.completed)
      .forEach(todo => dispatch({ type: 'delete', payload: todo.id }));
  };

  const completedTodosCount = todos.filter(
    todo => todo.completed !== true,
  ).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {completedTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(SortBy).map(enumElement => {
          return (
            <a
              key={enumElement}
              href="#/"
              className={cn('filter__link', {
                selected: howSort === enumElement,
              })}
              data-cy={`FilterLink${enumElement}`}
              onClick={() => setHowSort(enumElement)}
            >
              {enumElement}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          handleClearCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
