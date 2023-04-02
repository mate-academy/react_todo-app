import React, { useState } from 'react';

type Props = {
  addTodo: (title: string) => void;
};

export const NewTodoForm: React.FC<Props> = React.memo(
  ({ addTodo }) => {
    const [title, setTitle] = useState('');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      addTodo(title);
      setTitle('');
    };

    // eslint-disable-next-line no-console
    console.log('render Header');

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
  },
);
