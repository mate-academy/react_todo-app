import React, { useState } from 'react';
import { ITodo } from '../../types';

type Props = {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
};

export const TodoForm: React.FC<Props> = ({ todos, setTodos }) => {
  const [title, setTitle] = useState('');

  const addNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={addNewTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
