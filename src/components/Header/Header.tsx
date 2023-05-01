import { ChangeEvent, useState } from 'react';

type Props = {
  addTodo: (title: string) => void,
};

export const Header: React.FC<Props> = ({ addTodo }) => {
  const [query, setQuery] = useState('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

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
