import React, { useState } from 'react';
import { useTodos } from '../context/ TodosContext';

export const Header: React.FC = () => {
  const { todos, addTodo } = useTodos();
  const [title, setTitle] = useState('');

  if (todos.length > 0) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTodo(title);
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      <form onSubmit={handleSubmit}>
        <input
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
