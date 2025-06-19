import React, { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../../hooks/useTodoContext';

export const Header: React.FC = () => {
  const { todos, addTodo, toggleAll } = useTodoContext();
  const [title, setTitle] = useState('');
  const allCompleted = todos.every(todo => todo.completed);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
