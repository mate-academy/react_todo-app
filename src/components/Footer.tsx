import React, { useMemo } from 'react';
import { FilterBy } from '../types/FilterBy';
import cn from 'classnames';
import { getTotalActiveTodos } from '../utils/Helpers';
import { useTodos } from '../context/useTodos';
import { deleteTodo } from '../api/todos';
import { ActionTypes } from '../types/ActionTypes';

type Props = {
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>;
  filterBy: FilterBy;
  fieldTitle: React.RefObject<HTMLInputElement>;
};

export const Footer: React.FC<Props> = ({
  setFilterBy,
  filterBy,
  fieldTitle,
}) => {
  const { todos, dispatch } = useTodos();
  const totalTodosActive = useMemo(() => getTotalActiveTodos(todos), [todos]);

  const links = Object.entries(FilterBy);
  const hasTodoCompleted = todos.length - totalTodosActive;

  const onDeleteCompleted = () => {
    todos
      .filter(todo => todo.completed)
      .map(todo => {
        dispatch({ type: ActionTypes.onDelete, payload: todo });
        deleteTodo(todo.id);
      });
    fieldTitle.current?.focus();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {totalTodosActive} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {links.map(([key, value]) => (
          <a
            href={`#/${value === FilterBy.All ? '' : `${value}`}`}
            className={cn('filter__link', { selected: filterBy === value })}
            data-cy={`FilterLink${key}`}
            key={key}
            onClick={() => setFilterBy(value)}
          >
            {key}
          </a>
        ))}
      </nav>

      <button
        disabled={!hasTodoCompleted}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onDeleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
