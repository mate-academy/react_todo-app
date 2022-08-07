import { useState } from 'react';
import { response } from '../../api/api';
import { Todo } from '../../types/Todo';

type Props = {
  userId: number,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const Header: React.FC<Props> = ({ userId, todos, setTodos }) => {
  const [title, setTitle] = useState('');

  const handlerSubmit = async (event: React.SyntheticEvent) => {
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
      })
        .then(({ id }) => (
          setTodos([
            ...todos,
            {
              id,
              title,
              userId,
              completed: false,
            },
          ])));
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
