import React from 'react';
import { useTodos } from '../context/TodosContext';

export const TodoHeader: React.FC = () => {
  const { todos, addTodo, toggleAllTodos, newTodoRef } = useTodos();
  const allCompleted = todos.length > 0 && todos.every(t => t.completed);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      'newTodo',
    ) as HTMLInputElement;
    const title = input.value.trim();

    if (title) {
      addTodo(title);
    }

    input.value = '';
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          onClick={toggleAllTodos}
          data-cy="ToggleAllButton"
        />
      )}
      <form onSubmit={handleAdd}>
        <input
          ref={newTodoRef}
          autoFocus
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          name="newTodo"
        />
      </form>
    </header>
  );
};
