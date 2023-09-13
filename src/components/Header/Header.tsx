import { useCallback, useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';

export const Header = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos } = useContext(TodoContext);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    if (title.trim()) {
      setTodos([...todos, newTodo]);

      setTitle('');
    }
  }, [title]);

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        action="/"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          value={title}
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
