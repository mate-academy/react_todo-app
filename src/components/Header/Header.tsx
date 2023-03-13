import {
  FC,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { createTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';

type Props = {
  onAddTodo: Dispatch<SetStateAction<Todo[]>>;
  setError: (error: boolean) => void;
};

export const Header: FC<Props> = ({ onAddTodo, setError }) => {
  const [title, setTitle] = useState('');
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const user = JSON.parse(localStorage.getItem('user')!) || {
    id: 0,
    name: '',
    username: '',
    email: '',
    phone: '',
  };

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTitle(value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();

        if (!title.trim().length) {
          setTitle('');

          return;
        }

        const newTodo = {
          id: 0,
          title,
          userId: user.id,
          completed: false,
        };

        const addedTodo = await createTodo(user.id, newTodo);

        onAddTodo(currentTodos => [...currentTodos, addedTodo]);
      } catch (error) {
        setError(true);
      } finally {
        setTitle('');
      }
    }, [title],
  );

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChangeEvent}
        />
      </form>
    </header>
  );
};
