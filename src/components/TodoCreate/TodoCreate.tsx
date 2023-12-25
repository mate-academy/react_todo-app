import { useState } from 'react';
import { Todo } from '../../libs/types';
import { getRandomId } from '../../libs/helpers';

type Props = {
  onCreate: (todo: Todo) => void;
};

export const TodoCreate: React.FC<Props> = ({ onCreate }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: getRandomId(),
      title,
      completed: false,
    };

    onCreate(newTodo);

    setTitle('');
  };

  return (
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
  );
};
