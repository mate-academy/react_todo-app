import React, {
  FormEvent,
  ChangeEvent,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const Header = React.memo<Props>(({ todos, setTodos }) => {
  const [title, setTitle] = useState<string>('');

  const getNewId = useMemo(() => {
    const ids = todos.map(todo => todo.id);

    return (todos.length) ? (Math.max(...ids) + 1) : (1);
  }, [todos]);

  const handleBlur = () => {
    if (!title) {
      return;
    }

    const newTodo = {
      id: getNewId,
      title,
      completed: false,
    };

    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleBlur();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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
          value={title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </form>
    </header>
  );
});
