import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: (data: Todo[]) => void
};

export const TodoHeader: React.FC<Props> = React.memo(({
  todos,
  setTodos,
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);
    setTodoTitle('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => (
    setTodoTitle(event.target.value)
  );

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-todo"
          data-cy="createTodo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={todoTitle}
          onChange={handleChange}
        />
      </form>
    </header>
  );
});
