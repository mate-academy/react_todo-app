import { useState } from 'react';

type Props = {
  addTodo: (value: string) => void
};

export const TodoAdd: React.FC<Props> = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const onAdd = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim().length > 0) {
      addTodo(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={onAdd}>
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
