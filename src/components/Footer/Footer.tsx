import React, { RefObject, useMemo } from 'react';
import './Footer.scss';

import { Filter } from '../Filter';
import { FilterType } from '../../types/FilterType';
import { TodoContext } from '../../context/TodoContext';
import { useContext } from 'react';

type Props = {
  filterType: FilterType;
  onFilterType: (filterType: FilterType) => void;
  inputRef: RefObject<HTMLInputElement>;
};

export const Footer: React.FC<Props> = ({
  filterType,
  onFilterType,
  inputRef,
}) => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('TodoContext must be used within TodoProvider');

  const { todos, clearCompleted } = context;

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const handleClickClearBtn = () => {
    clearCompleted();
    inputRef.current?.focus();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <Filter filterType={filterType} onFilterType={onFilterType} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleClickClearBtn}
      >
        Clear completed
      </button>
    </footer>
  );
};
