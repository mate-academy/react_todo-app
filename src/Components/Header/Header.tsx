import React, { useContext, useState } from 'react';
import { ToDoContext } from '../Context/ToDoContext';
import { Todo } from '../../Types/Todo';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(ToDoContext);
  const [title, setTitle] = useState('');

  const handleTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
  };

  const addToDO = () => {
    const newToDo:Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newToDo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) {
      return;
    }

    addToDO();
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
