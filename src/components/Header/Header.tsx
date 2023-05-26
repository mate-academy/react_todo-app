import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  addNewTodo: (todo: Todo) => void,
};

export const Header: React.FC<Props> = ({
  addNewTodo,
}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim().length) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      completed: false,
      title,
    };

    addNewTodo(newTodo);
    setTitle('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
