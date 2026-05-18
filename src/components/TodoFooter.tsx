import React from 'react';

import { FilterType } from '../constants/filters';
import { useTodos } from '../context/TodosContext';
import { TodoFilter } from './TodoFilter';

interface Props {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  focusNewTodoField: () => void;
}

export const TodoFooter: React.FC<Props> = ({
  filter,
  onFilterChange,
  focusNewTodoField,
}) => {
  const { clearCompletedTodos, todos } = useTodos();
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const itemWord = activeTodosCount === 1 ? 'item' : 'items';

  const handleClearCompleted = () => {
    clearCompletedTodos();
    focusNewTodoField();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} ${itemWord} left`}
      </span>

      <TodoFilter filter={filter} onFilterChange={onFilterChange} />

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
