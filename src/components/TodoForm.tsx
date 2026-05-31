import React, { useEffect, useState } from 'react';
import { useTodos } from '../context/TodoContext';

export const TodoForm: React.FC = () => {
  const [value, setValue] = useState('');
  const { addTodo, inputRef } = useTodos();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) {
      return;
    }

    addTodo(value.trim());
    setValue('');
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={e => setValue(e.target.value)}
        ref={inputRef}
      />
    </form>
  );
};
