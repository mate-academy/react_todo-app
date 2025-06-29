import React, { useRef, useEffect, useState } from 'react';
import { useTodos } from '../TodoContext';

export const Header: React.FC = () => {
  const { addTodo, toggleAll, todos } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const prevTodosLength = useRef(todos.length);

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  useEffect(() => {
    if (todos.length < prevTodosLength.current && inputRef.current) {
      inputRef.current.focus();
    }

    prevTodosLength.current = todos.length;
  }, [todos.length]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      addTodo(newTodoTitle);
      setNewTodoTitle('');
    }
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
      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
