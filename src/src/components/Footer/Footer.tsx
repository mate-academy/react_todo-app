import React from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { Error } from '../../types/Error';
import { useTodoContext } from '../context/TodoContext';
import { Todo } from '../../types/Todo';

type Props = {
  activeTodos: Todo[];
  completedTodos: Todo[];
};

export const Footer: React.FC<Props> = ({ activeTodos, completedTodos }) => {
  const { state, dispatch } = useTodoContext();
  const { filter } = state;

  const handleClearCompleted = async () => {
    const completedIds = completedTodos.map(todo => todo.id);

    dispatch({ type: 'SET_DELETING_IDS', payload: completedIds });

    try {
      dispatch({ type: 'CLEAR_COMPLETED' });
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: Error.unableToDelete,
      });
      setTimeout(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
      }, 3000);
    } finally {
      dispatch({ type: 'SET_DELETING_IDS', payload: [] });
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filterOption => (
          <a
            key={filterOption}
            href={`#/${filterOption.toLowerCase()}`}
            onClick={() =>
              dispatch({
                type: 'SET_FILTER',
                payload: filterOption,
              })
            }
            className={classNames('filter__link', {
              selected: filter === filterOption,
            })}
            data-cy={`FilterLink${filterOption}`}
          >
            {filterOption}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
