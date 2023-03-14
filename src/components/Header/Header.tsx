import {
  FC,
  useState,
  useCallback,
} from 'react';
import { createTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  user: User;
  todos: Todo[];
  onAddTodo: (todos: Todo[]) => void;
  setError: (error: boolean) => void;
};

export const Header: FC<Props> = ({
  user,
  todos,
  onAddTodo,
  setError,
}) => {
  const [title, setTitle] = useState('');

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTitle(value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();

        if (!title.trim()) {
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

        onAddTodo([...todos, addedTodo]);
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
