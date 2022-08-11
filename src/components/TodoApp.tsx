import { FC, FormEvent, useState } from 'react';

type Props = {
  addTodo: (title: string) => void
};

export const TodoApp: FC<Props> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      setTitle('');

      return;
    }

    addTodo(title);
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={onSubmit}
      />
    </form>
  );
};
