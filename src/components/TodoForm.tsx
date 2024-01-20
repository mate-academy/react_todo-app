import { useState } from 'react';
import { Todo } from '../types/todo';

type Props = {
  onSubmit: (todo: Todo) => void,
  todo?: Todo,
};

export const TodoForm: React.FC<Props> = ({ onSubmit, todo }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      id: todo?.id || 0,
      title,
      completed: false,
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
        id="todoTitle"
        name="todoTitle"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleTitleChange}
      />
    </form>
  );
};
