import React from 'react';
import { TodoFilter } from './TodoFilter';
import { useTodos } from '../TodosContext';

export const Footer: React.FC = () => {
  const { todoList, clearCompletedTodos, currentFilter, setCurrentFilter } =
    useTodos();

  if (todoList.length === 0) {
    return null;
  }

  const activeTodosCount = todoList.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todoList.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} item${activeTodosCount !== 1 ? 's' : ''} left`}
      </span>

      <TodoFilter currentFilter={currentFilter} onChange={setCurrentFilter} />
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={() => clearCompletedTodos()}
      >
        Clear completed
      </button>
    </footer>
  );
};
