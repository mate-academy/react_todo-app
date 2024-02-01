import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const Header: React.FC = () => {
  const {
    allTodos, setAllTodos, query, setQuery,
  } = useContext(TodosContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimedValue = query.trim();

    if (trimedValue !== '') {
      const newTodo = {
        id: +new Date(),
        title: trimedValue,
        completed: false,
      };

      setAllTodos([...allTodos, newTodo]);
    }

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
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};
