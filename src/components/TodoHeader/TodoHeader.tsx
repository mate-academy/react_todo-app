import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodoProvider';

export const TodoHeader: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    setTodos([...todos, {
      id: +(new Date()),
      title: trimmedTitle,
      completed: false,
    }]);

    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          value={title}
          placeholder="What needs to be done?"
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
