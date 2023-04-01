import { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
  addTodo: (title:string) => void;
};

export const Header: React.FC<Props> = ({ addTodo }) => {
  const [query, setQuery] = useState('');
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    addTodo(query);
    setQuery('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleInput}
        />
      </form>
    </header>
  );
};
