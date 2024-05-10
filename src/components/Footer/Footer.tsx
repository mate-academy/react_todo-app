import React, { useContext } from 'react';
import { FILTER } from '../../types/Filter';
import { DispatchContext, StateContext } from '../GlobalContext/GlobalContext';
import { Action } from '../../types/Actions';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { todos, filterTodo } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const filterValues = Object.values(FILTER);
  const ActiveTodoLeft = todos.filter(
    (todo: Todo) => todo.completed === false,
  ).length;
  const isDisabled = todos.some(todo => todo.completed);
  let activeFilterLink: string;

  const handleFiltered = (filter: FILTER) => {
    switch (filter) {
      case FILTER.ACTIVE:
        dispatch({ type: Action.filterTodo, payload: FILTER.ACTIVE });
        activeFilterLink = '#/';
        break;
      case FILTER.COMPLETED:
        dispatch({ type: Action.filterTodo, payload: FILTER.COMPLETED });
        activeFilterLink = '#/active';
        break;
      default:
        dispatch({ type: Action.filterTodo, payload: FILTER.ALL });
        activeFilterLink = '#/completed';
        break;
    }
  };

  const handleClearCompleted = () => {
    todos.forEach(todo =>
      todo.completed === true
        ? dispatch({ type: Action.clearTodo, payload: todo.id })
        : todo,
    );
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${ActiveTodoLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterValues.map(filter => (
          <a
            key={filter}
            href={activeFilterLink}
            className={classNames('filter__link', {
              selected: filter === filterTodo,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => handleFiltered(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          disabled: !isDisabled,
        })}
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
