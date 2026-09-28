import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from '../TodoContext';

export const Header: React.FC = () => {
  const { todos, addTodo, toggleAll, focusNewTodo, setFocusNewTodo } =
    useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (focusNewTodo) {
      setTimeout(() => {
        inputRef.current?.focus();
        setFocusNewTodo(false);
      }, 0);
    }
  }, [focusNewTodo, setFocusNewTodo]);

  const [newTitle, setNewTitle] = useState('');

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTitle.trim()) {
      addTodo(newTitle);
      setNewTitle('');
    }
  };

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${areAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
