/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from 'react';
import { useTodoContext } from '../context/TodoContext';

export const Header: React.FC = () => {
  const { todos, addTodo, toggleAll } = useTodoContext();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const allCompleted = todos.length > 0 && todos.every(t => t.completed);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(newTodoTitle);
    setNewTodoTitle('');
  };

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

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
