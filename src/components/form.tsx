import React, { useState, FormEvent } from 'react';
import { InTodo } from './Todo';

interface InAddingFormData {
  setTodos: (current: InTodo[]) => void;
  todos: InTodo[];
}

export const AddingForm = ({ todos, setTodos }: InAddingFormData) => {
  const [query, setQuery] = useState<string>('');
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) {
      return;
    }

    setTodos(
      [
        ...todos,
        {
          id: +new Date(),
          title: query.trim(),
          completed: false,
        },
      ],
    );
    setQuery('');
  };

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={({ target }) => {
          setQuery(target.value.trimLeft());
        }}
      />
    </form>
  );
};
