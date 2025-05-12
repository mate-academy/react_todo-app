import classNames from 'classnames';
import {
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TodoContext } from '../../store/TodoProvider';
import { Todo } from '../../types/todo';

export const Header: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { todos, setTodos } = useContext(TodoContext);
  const [titleValue, setTitleValue] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const todosCompleted = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const todosActive = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const handleAddTodo = (event: FormEvent) => {
    event.preventDefault();

    const cleanTitle = titleValue.trim();

    if (!cleanTitle) {
      return;
    }

    const todo: Todo = {
      id: +new Date(),
      title: cleanTitle,
      completed: false,
    };

    setTodos([...todos, todo]);
    setTitleValue('');
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <header className="todoapp__header">
      {(!!todosCompleted || !!todosActive) && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !todosActive && todosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={titleValue}
          onChange={event => setTitleValue(event.target.value)}
        />
      </form>
    </header>
  );
};
