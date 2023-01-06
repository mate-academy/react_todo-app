import React, { useState } from 'react';

type Props = {
  createNewTodo: (title: string) => void;
  inputRef: React.RefObject<HTMLInputElement>
};

export const HeaderInput: React.FC<Props> = ({
  createNewTodo,
  inputRef,
}) => {
  const [query, setQuery] = useState('');
  // двічі рендериться хедер інпут, треба з мемоізацією розібратися

  const handleTodoCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      createNewTodo(query);
      setQuery('');
    } catch (error) {
      throw new Error('unable to upload a todo');
    }
  };

  return (
    <form
      onSubmit={handleTodoCreate}
    >
      <input
        type="text"
        data-cy="createTodo"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};
