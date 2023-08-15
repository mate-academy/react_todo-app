import { FC, useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';

export const Header: FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [query, setQuery] = useState('');

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (query.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: query,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setQuery('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
