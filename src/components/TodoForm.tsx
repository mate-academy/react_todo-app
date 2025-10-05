import React, { useState, useRef, useEffect, useContext } from 'react';

import { TodoContext } from '../context/TodoContext';
import { TodoContextType } from '../types/types';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, addTodo } = useContext<TodoContextType>(TodoContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      addTodo(trimmedTitle);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </form>
  );
};
