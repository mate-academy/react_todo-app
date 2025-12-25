import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import classNames from 'classnames';

interface Props {}

export const Header: React.FC<Props> = ({}) => {
  const [title, setTitle] = useState('');
  const { todos, addTodo, toggleTodo } = useContext(TodoContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const allTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo(title);
    setTitle('');
  };

  const handleToggleAll = () => {
    const allCompleted =
      todos.length > 0 && todos.every(todo => todo.completed);

    const statusToSet = !allCompleted;

    const todosToUpdate = todos.filter(todo => todo.completed !== statusToSet);

    if (todosToUpdate.length === 0) {
      return;
    }

    todosToUpdate.forEach(todo => toggleTodo(todo.id));
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
          ref={inputRef}
        />
      </form>
    </header>
  );
};
