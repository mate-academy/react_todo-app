import React, { useState, useRef, useEffect } from 'react';
import { useTodos } from '../context/TodoContext';

export const NewTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo, todos, toggleAll } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      addTodo(trimmedTitle);
      setTitle('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as React.KeyboardEvent<HTMLInputElement>);
    }
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

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

      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        autoFocus
      />
    </header>
  );
};
