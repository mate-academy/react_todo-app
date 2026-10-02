import React, { FormEvent, useState } from 'react';
import { useTodos } from '../context/TodosContext';

export const NewTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    addTodo(trimmedTitle);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
        autoFocus
      />
    </form>
  );
};
