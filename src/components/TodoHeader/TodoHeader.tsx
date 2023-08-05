import { useState, useContext } from 'react';
import { nanoid } from 'nanoid';

import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';

export const TodoHeader: React.FC = () => {
  const [query, setQuery] = useState('');

  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      completed: false,
      id: nanoid(),
      title: query.trim(),
    };

    addTodo(newTodo);
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
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
