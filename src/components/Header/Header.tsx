import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const Header: React.FC<Props> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const resetInput = () => {
    setValue('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value === '') {
      return;
    }

    onAdd({
      id: +(new Date()),
      title: value,
      completed: false,
    });

    resetInput();
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </header>
  );
};
