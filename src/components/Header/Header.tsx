import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../../TodoContext';
import classNames from 'classnames';

type Props = {};

export const Header: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos, addTodo } = useContext(TodoContext);

  const completedTodos = todos.filter(todo => todo.completed);
  const allCompleted = completedTodos.length === todos.length;

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCompleteAll = () => {
    if (allCompleted) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));

      return;
    }

    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  useEffect(() => {
    focusInput();
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleCompleteAll}
        />
      )}

      <form
        onSubmit={event => {
          event.preventDefault();

          if (title.trim() === '') {
            return;
          }

          addTodo(title);
          setTitle('');
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={title}
          ref={inputRef}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
