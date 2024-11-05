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

  const completedTodosCount = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    todos
      .filter(todo => todo.completed)
      .forEach(todo => dispatch({ type: 'delete', payload: todo.id }));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {completedTodosCount}{' '}
        {completedTodosCount === 1 ? 'item left' : 'items left'}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(SortBy).map(enumElement => (
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
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={!todos.filter(todo => todo.completed).length}
      >
        Clear completed
      </button>
    </footer>
  );
};
