import React, { useState } from 'react';

import { Todo } from '../../interfaces/Todo';

type Props = {
  handleAddTodo: (todo: Todo) => void;
};

export const Header: React.FC<Props> = ({ handleAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle.trim().length) {
      return;
    }

    const newTodo: Todo = {
      title: todoTitle,
      id: +new Date(),
      completed: false,
    };

    handleAddTodo(newTodo);
    setTodoTitle('');
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
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
