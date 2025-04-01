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

export const Header: React.FC<Props> = ({ count }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setTodos, todos } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const handleCreateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      return;
    }

    const newTodo: TodoType = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    setTodos((prev: TodoType[]) => [...prev, newTodo]);
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
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: count.completed === count.all && count.all > 1,
        })}
        hidden={count.all <= 1} // Додайте цю перевірку
        data-cy="ToggleAllButton"
        onClick={handleTogleAll}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={e => handleCreateTodo(e)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={inuput => setTitle(inuput.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
