import React, { useContext, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';
import { Todo } from '../../Types/Todo';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const handleTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
  };

  const addTodo = () => {
    const newTodo:Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) {
      return;
    }

    addTodo();
    setTitle('');
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
          onChange={handleTitleChange}
          onBlur={() => setTitle('')}
        />
      </form>
    </header>
  );
};
