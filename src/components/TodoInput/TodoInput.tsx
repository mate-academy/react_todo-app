import { FormEvent, useState } from 'react';
import { Todo } from '../../Types/Todo';

interface Props {
  setNewTodo: (todo: Todo) => void,
}

export const TodoInput: React.FC<Props> = ({ setNewTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title === '') {
      return;
    }

    setNewTodo({
      id: +new Date(),
      title,
      completed: false,
    });

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
        onChange={(event) => setTitle(event.target.value)}
      />
    </form>
  );
};
