import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  setTodos: (value: (todos: Todo[]) => Todo[]) => void
};

export const Header: React.FC<Props> = ({ setTodos }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle.trim() !== '') {
      const newTodo = {
        id: +new Date().getTime(),
        title: todoTitle,
        completed: false,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTodoTitle('');
    }
  };

  const handleAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setTodoTitle(event.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={addTodo}
      >
        <input
          value={todoTitle}
          onChange={handleAddTitle}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
