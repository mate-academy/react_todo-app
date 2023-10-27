import React, { useState, useContext } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from '../contexts/TodosContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title) {
      const newTodo: Todo = {
        id: +(new Date()),
        title,
        completed: false,
      };

      setTitle('');

      setTodos([...todos, newTodo]);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          value={title}
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
