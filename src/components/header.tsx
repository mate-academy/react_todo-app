import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  input: string;
  setInput:(input: string) => void ;
  data:Todo[];
  setData:(data: Todo[]) => void;

};

export const Header: React.FC<Props>
= ({
  input, setInput, data, setData,
}) => {
  const id: number = +new Date();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input) {
      const newInput = {
        id,
        title: input,
        completed: false,
      };

      setData([...data, newInput]);
      setInput('');
    }
  };

  return (
    <header className="header">
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </form>
    </header>
  );
};
