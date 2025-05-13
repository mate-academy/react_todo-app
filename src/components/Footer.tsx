import React from 'react';
import { TodoFilter } from './TodoFilter';
import { FilterType } from '../types/FilterType';
import { useTodos } from '../context/TodoContext';

type Props = {
  currentFilter: FilterType;
  onFilterChange: (status: FilterType) => void;
};

export const Footer: React.FC<Props> = ({
  currentFilter,
  onFilterChange: onChange,
}) => {
  const { todos, setTodos } = useTodos();
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const handleClearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} item${activeTodosCount !== 1 ? 's' : ''} left`}
      </span>

      <TodoFilter currentFilter={currentFilter} onChange={onChange} />
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
