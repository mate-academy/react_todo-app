import { useState, useContext } from 'react';
import { TodosContext } from '../../TodosContext';

export const TodoHeader: React.FC = () => {
  const { handleOnAdd } = useContext(TodosContext);
  const [query, setQuery] = useState('');

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalaziedQuery = query.trim();

    if (normalaziedQuery !== '') {
      handleOnAdd(normalaziedQuery);
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
