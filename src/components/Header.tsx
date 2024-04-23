import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from './TodoContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos, addTodo } = useContext(TodoContext);

  const completedTodos = todos.filter(todo => todo.completed);
  const allCompleted = completedTodos.length === todos.length;

  const inpRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inpRef.current) {
      inpRef.current.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      return '';
    }

    addTodo(title);
    setTitle('');
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

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={title}
          ref={inpRef}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
