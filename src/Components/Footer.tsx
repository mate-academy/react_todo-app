import { useContext } from 'react';
import { DispatchContext, StateContext } from './GloballProvider';
import cn from 'classnames';
import { ToDo } from '../Types/ToDo';

type Props = {
  activeTodos: ToDo[];
  completedTodos: ToDo[];
  inputRef: React.RefObject<HTMLInputElement>;
};

export const Footer: React.FC<Props> = ({
  activeTodos,
  completedTodos,
  inputRef,
}) => {
  const dispatch = useContext(DispatchContext);
  const { activeButton } = useContext(StateContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: activeButton === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            dispatch({ type: 'showAll' });
          }}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={cn('filter__link', {
            selected: activeButton === 'active',
          })}
          onClick={() => {
            dispatch({ type: 'showFiltered', payload: 'active' });
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: activeButton === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            dispatch({ type: 'showFiltered', payload: 'completed' });
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          dispatch({ type: 'clearCompleted' });
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
