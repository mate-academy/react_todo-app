import React from 'react';
import { useTodos } from '../context/TodosContext';
import { Filter as FilterType } from '../types/Filter';
import { Filter } from './Filter';

type Props = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export const Footer: React.FC<Props> = ({ filter, onFilterChange }) => {
  const { todos, clearCompleted } = useTodos();

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleClearCompleted = () => {
    clearCompleted();

    requestAnimationFrame(() => {
      const newTodoField = document.querySelector<HTMLInputElement>(
        '[data-cy="NewTodoField"]',
      );

      newTodoField?.focus();
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <Filter filter={filter} onFilterChange={onFilterChange} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
