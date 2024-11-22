/* eslint-disable react-hooks/exhaustive-deps */
import { Todo } from '../types/Todo';
import { ErrorMessage } from '../types/ErrorMessage';
import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../context/TodosContext';

type Props = {
  visibleTodos: Todo[];
  errorMessage: ErrorMessage;
  setErrorMessage: (errorMessage: ErrorMessage) => void;
  editingTitle: number;
};

function getNewTodoId(todoList: Todo[]) {
  if (todoList.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todoList.map(todo => todo.id));

  return maxId + 1;
}

export const Header: React.FC<Props> = ({
  visibleTodos,
  errorMessage,
  setErrorMessage,
  editingTitle,
}) => {
  const [title, setTitle] = useState<string>('');
  const { todos, setTodos } = useContext(TodosContext);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && !editingTitle) {
      titleField.current.focus();
    }
  }, [visibleTodos]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const titleTrimed: string = title.trim();

    if (!titleTrimed) {
      setErrorMessage({ ...errorMessage, emptyTitle: true });
      setInterval(() => {
        setErrorMessage({ ...errorMessage, emptyTitle: false });
      }, 3000);

      return;
    }

    const id: number = getNewTodoId(todos);

    const newTodo: Todo = {
      id,
      title: titleTrimed,
      completed: false,
    };
    const newTodos = [...todos, newTodo];

    setTodos(newTodos);
    setTitle('');
  }

  const allTodosCompleted = visibleTodos.every(todo => todo.completed);

  function toggleAllTodos() {
    if (allTodosCompleted) {
      const newTodos = todos.map((todo: Todo) => {
        return { ...todo, completed: !todo.completed };
      });

      setTodos(newTodos);

      return;
    }

    const newTodos = todos.map((todo: Todo) => {
      if (todo.completed) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    });

    setTodos(newTodos);
  }

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setErrorMessage({ ...errorMessage, emptyTitle: false });
          }}
          ref={titleField}
        />
      </form>
    </header>
  );
};
