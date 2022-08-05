import { Dispatch, useState } from 'react';
import { response } from '../../api/api';

type Props = {
  userId: number,
  onAdd: Dispatch<React.SetStateAction<boolean>>,
};

export const Header: React.FC<Props> = ({ onAdd, userId }) => {
  const [title, setTitle] = useState('');

  const handlerSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (title && userId > 0) {
      response('/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          userId,
          completed: false,
        }),
      });
      onAdd(true);
      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={(event) => handlerSubmit(event)}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
