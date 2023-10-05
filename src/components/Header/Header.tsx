import React, { useState, useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo({
      id: todos.length,
      title: title.trim(),
      completed: false,
    });

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
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
