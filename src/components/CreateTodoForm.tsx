import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[]
  onSetTodos: (value: Todo[]) => void
};

export const CreateTodoForm: React.FC<Props> = ({ todos, onSetTodos }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim()) {
      onSetTodos([...todos, {
        id: Number(new Date()),
        title: query,
        completed: false,
      }]);
    }

    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};
