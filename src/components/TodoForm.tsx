import React, { useEffect, useState } from 'react';
import { useTodos } from '../TodoContext';

export const TodoForm: React.FC = () => {
  const { addTodo, inputRef } = useTodos();
  const [title, setTitle] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(title);

    if (title.trim()) {
      setTitle('');
    }

    inputRef.current?.focus();
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
