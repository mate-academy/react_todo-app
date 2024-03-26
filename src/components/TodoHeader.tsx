import React, { useState, useContext } from 'react';
import { TodosContext } from './TodosContext';

export const TodoHeader: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  function addTodo() {
    if (title.trim().length) {
      const newTodo = {
        title,
        id: +new Date(),
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
