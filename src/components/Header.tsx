/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../context/TodoProvider';
import { TodoType } from '../types/TodoType';

type Props = {
  count: {
    active: number;
    completed: number;
    all: number;
  };
};

export const Header: React.FC<Props> = ({ count: { completed, all } }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setTodos, todos } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const handleCreateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      return;
    }

    console.log(trimmedTitle);

    const newTodo: TodoType = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    inputRef.current?.focus();
    setTitle('');
  };

  const handleTogleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
  };

  // autofocus on input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {all > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: completed === all,
          })}
          data-cy="ToggleAllButton"
          onClick={handleTogleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={e => handleCreateTodo(e)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
