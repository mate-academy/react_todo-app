import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { Todo } from '../type/Todo';
import classNames from 'classnames';

type HeaderProps = {
  unCompletedTodos: number;
};

export const Header: React.FC<HeaderProps> = ({ unCompletedTodos }) => {
  const { setTodos } = useTodos();
  const [todoTitle, setTodoTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const allCompleted = unCompletedTodos === 0;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  const handleSubmit = (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();

    if (!todoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTodoTitle('');
  };

  const handleToggleAll = () => {
    if (allCompleted) {
      setTodos(currentTodos =>
        currentTodos.map(currentTodo => ({ ...currentTodo, completed: false })),
      );
    } else {
      setTodos(current =>
        current.map(currentTodo => ({ ...currentTodo, completed: true })),
      );
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: allCompleted })}
        data-cy="ToggleAllButton"
        onClick={handleToggleAll}
      />

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={e => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
