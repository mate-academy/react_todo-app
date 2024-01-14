import React, { useContext, useState } from 'react';
import { TodosContext } from './Store';

type Props = {};

export const TodoForm: React.FC<Props> = () => {
  const [title, setTitle] = useState('');

  const { addTodo } = useContext(TodosContext);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addTodo({
      id: +new Date(),
      title,
      complete: false,
    });

    setTitle('');
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleTitle}
      />
    </form>
  );
};
