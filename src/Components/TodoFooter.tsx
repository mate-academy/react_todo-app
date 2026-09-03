import React from 'react';
import { TodoFilter } from './TodoFilter';

type Filter = 'all' | 'active' | 'completed';

type Props = {
  todosCount: number;
  completedCount: number;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  clearCompleted: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoFooter: React.FC<Props> = ({
  todosCount,
  completedCount,
  filter,
  setFilter,
  clearCompleted,
  inputRef,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCount - completedCount} items left
      </span>

      <TodoFilter filter={filter} setFilter={setFilter} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
        onClick={() => {
          clearCompleted();
          inputRef.current?.focus();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
