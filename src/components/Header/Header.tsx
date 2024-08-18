import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';

export const Header: React.FC = () => {
  const { todos, setTodos, choseEditItem } = useContext(TodosContext);

  const [query, setQuery] = useState('');
  const activeToggleButton = todos.every(({ completed }) => completed);

  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textFieldRef.current && !choseEditItem) {
      textFieldRef.current?.focus();
    }
  }, [todos, choseEditItem]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newQuery = query.trim();

    if (!newQuery) {
      setQuery('');

      return;
    }

    setTodos([
      ...todos,
      {
        id: +new Date(),
        title: newQuery,
        completed: false,
      },
    ]);

    setQuery('');
  };

  const onToggleCopmpleted = () => {
    const newValue = todos.map(item => ({
      ...item,
      completed: !activeToggleButton,
    }));

    setTodos(newValue);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: activeToggleButton,
          })}
          data-cy="ToggleAllButton"
          onClick={onToggleCopmpleted}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={onSubmit}>
        <input
          ref={textFieldRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
