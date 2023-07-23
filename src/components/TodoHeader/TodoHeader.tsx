import { useState } from 'react';

interface Props {
  handleOnAdd: (newQuery: string) => void,
}

export const TodoHeader: React.FC<Props> = ({ handleOnAdd }) => {
  const [query, setQuery] = useState('');

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query !== '') {
      handleOnAdd(query);
      setQuery('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.currentTarget.value)}
        />
      </form>
    </header>
  );
};
