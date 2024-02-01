import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const Header: React.FC = () => {
  const {
    allTodos, setAllTodos, query, setQuery,
  } = useContext(TodosContext);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimedValue = e.currentTarget.value.trim();

      const newTodo = {
        id: +new Date(),
        title: trimedValue,
        completed: false,
      };

      if (trimedValue !== '') {
        setAllTodos([...allTodos, newTodo]);
      }

      setQuery('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
};
