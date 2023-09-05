import React, { useContext, useState } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      const todo = {
        id: +new Date(),
        title,
        completed: false,
        isEditing: false,
      };

      setTodos([...todos, todo]);
      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
