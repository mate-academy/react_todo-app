import React, { useState } from 'react';

type Props = {
  onAdd: (title: string) => void,
};

export const NewTodoForm: React.FC<Props> = ({
  onAdd,
}) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(title);
    setTitle('');
  };

  return (
    <>
      <h1 className="todoapp__title">todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </>
  );
};
