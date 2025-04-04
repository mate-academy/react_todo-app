import React from 'react';
import { useTodo } from '../context/TodoContext';
import { TodoFilter } from './TodoFilter';

export const TodoFooter: React.FC = () => {
  const { todos, activeTodosCount, completedTodosCount, handleClearCompleted } =
    useTodo();

  if (todos.length === 0) {
    return null;
  }

  const handleClearCompletedAndFocus = () => {
    handleClearCompleted();
    const newTodoInput = document.querySelector(
      '.todoapp__new-todo',
    ) as HTMLInputElement;

    if (newTodoInput) {
      newTodoInput.focus();
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
      </span>

      <TodoFilter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompletedAndFocus}
        disabled={completedTodosCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
