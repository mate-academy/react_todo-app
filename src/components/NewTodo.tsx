import { useState } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  onAddTodo: (todo: Todo) => void;
}

export const NewTodo: React.FC<Props> = ({
  onAddTodo,
}) => {
  const [title, setTitle] = useState('');

  const handleSubmitNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    onAddTodo(newTodo);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmitNewTodo}>
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
