import { useState, type FC, type FormEvent, type RefObject } from 'react';
import classNames from 'classnames';

import { useTodos } from '../context/TodosContext';

interface Props {
  inputRef: RefObject<HTMLInputElement>;
}

export const NewTodo: FC<Props> = ({ inputRef }) => {
  const { todos, addTodo, toggleAll } = useTodos();
  const [title, setTitle] = useState('');
  const areAllTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo(title);
    setTitle('');
    inputRef.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
          aria-label="Toggle all todos"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
