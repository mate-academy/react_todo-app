import { useState, useContext } from 'react';
import { nanoid } from 'nanoid';

import { TodoUpdateContext } from '../../context/TodoContext';
import { Todo } from '../../types/Todo';

export const TodoHeader: React.FC = () => {
  const [query, setQuery] = useState('');

  const { addTodo } = useContext(TodoUpdateContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      completed: false,
      id: nanoid(),
      title: query,
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
