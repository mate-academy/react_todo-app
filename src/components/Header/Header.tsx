import cn from 'classnames';
import './Header.scss';
import { useTodo } from '../../services/TodoHooks';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../../services/TodosContext&Provider';

type Props = {};

export const Header: React.FC<Props> = () => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos } = useContext(TodosContext);
  const { addTodo, toggleAll } = useTodo();

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();

    addTodo(query);
    setQuery('');
  }

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: todos.every(t => t.completed),
        })}
        data-cy="ToggleAllButton"
        onClick={toggleAll}
      />

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={ev => setQuery(ev.target.value)}
        />
      </form>
    </header>
  );
};
