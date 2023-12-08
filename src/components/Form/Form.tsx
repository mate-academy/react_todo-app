import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const Form: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [query, setQuery] = useState('');

  const mainQuery = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mainQuery.current) {
      mainQuery.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      setQuery('');

      return;
    }

    const newTodo = {
      id: `${+new Date()}`,
      title: query,
      completed: false,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);

    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={mainQuery}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        value={query}
        placeholder="What needs to be done?"
        onChange={({ target }) => setQuery(target.value)}
      />
    </form>
  );
};
