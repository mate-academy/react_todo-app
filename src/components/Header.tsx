import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from '../context/TodosContext';

export const Header: React.FC = () => {
  const { todos, dispatch } = useTodos();
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch({ type: 'ADD', title });
      setTitle('');
    }
  };

  const allCompleted = todos.every(todo => todo.completed);
  const toggleAll = () =>
    dispatch({ type: 'TOGGLE_ALL', completed: !allCompleted });

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        ></button>
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          ref={inputRef}
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
