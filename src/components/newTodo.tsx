import React, { FC, useState } from 'react';

type Props = {
  onAdd: (newTitle: string) => void,
};

export const NewTodo: FC<Props> = ({ onAdd }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [hasInputError, setInputError] = useState(false);

  const handleFormSubmitting = (event: React.FormEvent) => {
    event.preventDefault();

    if (todoTitle.length > 0) {
      onAdd(todoTitle);
      setTodoTitle('');
    } else {
      setInputError(true);
    }
  };

  return (
    <form onSubmit={handleFormSubmitting}>
      <input
        type="text"
        data-cy="createTodo"
        value={todoTitle}
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={(event) => {
          setTodoTitle(event.target.value);
          if (hasInputError) {
            setInputError(false);
          }
        }}
      />
      {hasInputError && <p>Please, enter a new todo</p>}
    </form>
  );
};
