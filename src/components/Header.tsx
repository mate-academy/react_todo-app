import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../context/TodosContex';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  focused: boolean;
  setFocused: (value: boolean) => void;
};

export const Header: React.FC<Props> = ({ focused, setFocused }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && focused) {
      inputRef.current.focus();
    }
  }, [focused]);

  const checkActiveTodos = useCallback((): boolean => {
    if (todos.length > 0) {
      return todos.every(todo => todo.completed);
    }

    return false;
  }, [todos]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const addTodo = (todoTitle: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (normalizedTitle.length > 0) {
      addTodo(normalizedTitle);
      setTitle('');
    } else {
      return;
    }
  };

  const toggleAll = () => {
    const allCompleted = checkActiveTodos();

    const toggledTodos = todos.map(todo => ({
      ...todo,
      completed: allCompleted ? false : true,
    }));

    setTodos(toggledTodos);
    setFocused(true);
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: checkActiveTodos(),
          })}
          onClick={toggleAll}
          data-cy="ToggleAllButton"
        />
      )}

      <form
        onSubmit={event => onSubmit(event)}
        onBlur={() => setFocused(false)}
      >
        <input
          data-cy="NewTodoField"
          ref={inputRef}
          value={title}
          onChange={event => onInputChange(event)}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
