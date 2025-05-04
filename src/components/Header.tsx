import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import classNames from 'classnames';

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const { todos, changeTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const completedTodos = useMemo(() => {
    return todos.filter(td => td.completed);
  }, [todos]);

  const uncompletedTodos = useMemo(() => {
    return todos.filter(td => !td.completed);
  }, [todos]);

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim().length === 0) {
      return;
    }

    changeTodos(
      {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      },
      'add',
    );

    setTitle('');
  };

  const toggleALL = async () => {
    if (completedTodos.length === todos.length) {
      await Promise.all(
        completedTodos.map(td =>
          changeTodos({ ...td, completed: false }, 'update'),
        ),
      );
    } else {
      await Promise.all(
        uncompletedTodos.map(td =>
          changeTodos({ ...td, completed: true }, 'update'),
        ),
      );
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.length === completedTodos.length,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleALL}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
        />
      </form>
    </header>
  );
};
