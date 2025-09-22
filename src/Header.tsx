import React, { useState, useRef, useEffect } from 'react';
import { useTodos } from './TodosContext';

export const Header: React.FC = () => {
  const { addTodo, toggleAll, isAllCompleted, todos } = useTodos();
  const [title, setTitle] = useState('');

  const newTodoField = useRef<HTMLInputElement>(null);
  const prevTodosCount = useRef(todos.length);

  useEffect(() => {
    newTodoField.current?.focus();
  }, []);

  useEffect(() => {
    if (todos.length < prevTodosCount.current) {
      newTodoField.current?.focus();
    }

    prevTodosCount.current = todos.length;
  }, [todos]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      addTodo(trimmedTitle);
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {/* The button should be visible if there are ANY todos, not just active ones */}
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${isAllCompleted ? ' active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          ref={newTodoField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
