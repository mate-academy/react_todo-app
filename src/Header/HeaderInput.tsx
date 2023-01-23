import React, { useState } from 'react';
import { Error } from '../types/ErrorEnum';

type Props = {
  createNewTodo: (title: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  errorNotification: (err: Error) => void;
};

export const HeaderInput: React.FC<Props> = ({
  createNewTodo,
  inputRef,
  errorNotification,
}) => {
  const [query, setQuery] = useState('');

  const handleTodoCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!query) {
      errorNotification(Error.TITLE);

      return;
    }

    try {
      createNewTodo(query);
      setQuery('');
    } catch (error) {
      errorNotification(Error.ADD);
    }
  };

  return (
    <form onSubmit={handleTodoCreate}>
      <input
        data-cy="createTodo"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};
