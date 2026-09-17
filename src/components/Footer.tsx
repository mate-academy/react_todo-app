import type { FC } from 'react';

import { useTodos } from '../context/TodosContext';
import type { Filter as FilterType } from '../types/Filter';
import { Filter } from './Filter';

interface Props {
  selectedFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

export const Footer: FC<Props> = ({
  selectedFilter,
  onSelectFilter,
  onClearCompleted,
}) => {
  const { todos, clearCompleted } = useTodos();
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const handleClearCompleted = () => {
    clearCompleted();
    onClearCompleted();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
      </span>

      <Filter selectedFilter={selectedFilter} onSelect={onSelectFilter} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
