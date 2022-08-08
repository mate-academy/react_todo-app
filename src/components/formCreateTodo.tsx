import { FC, useState } from 'react';
import { CreateTodo } from '../types/Todo';

type Props = {
  onSubmit(
    newTodo: CreateTodo,
  ): void;
};

export const FormCreateTodo: FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmut = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: CreateTodo = {
      title: title.trim(),
      userId: 3924,
      completed: false,
    };

    if (title.trim()) {
      onSubmit(newTodo);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmut}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
};
