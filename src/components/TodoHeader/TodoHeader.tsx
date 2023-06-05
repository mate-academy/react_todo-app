import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  todos: Todo[],
  setHasError: React.Dispatch<React.SetStateAction<ErrorType>>,
  setTodos: (data: Todo[]) => void
};

export const TodoHeader: React.FC<Props> = React.memo(({
  todos,
  setHasError,
  setTodos,
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const isAllTodosActive = useMemo(() => (
    todos.every(todo => todo.completed)
  ), [todos]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      setHasError(ErrorType.Title);

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

  const handleToggleAll = () => {
    if (isAllTodosActive) {
      return setTodos(todos.map(todo => (
        {
          ...todo,
          completed: false,
        }
      )));
    }

    return setTodos(todos.map(todo => (
      todo.completed
        ? todo
        : {
          ...todo,
          completed: true,
        }
    )));
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          aria-label="toggle-all"
          data-cy="toggleAll"
          className={classNames('todoapp__toggle-all', {
            active: isAllTodosActive,
          })}
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
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
