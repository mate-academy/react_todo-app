import { FC, useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';
import { Todo } from '../types/Todo';

export const Header: FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [query, setQuery] = useState('');

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: +new Date(),
      title: query,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setQuery('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={query}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
