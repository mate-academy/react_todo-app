/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react';
import { useTodos } from '../store/TodosContext';
import classNames from 'classnames';

export const Header = () => {
  const {
    todos,
    addTodo,
    todosIsEmpty,
    activeTodosCount,
    togleAll,
  } = useTodos();

  const [query, setQuery] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos.length]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim().length !== 0) {
      addTodo(query);
      setQuery('');
    }

    return;
  };

  return (
    <header className="todoapp__header">
      {!todosIsEmpty && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            'active': activeTodosCount === 0,
          })}
          data-cy="ToggleAllButton"
          onClick={() => togleAll()}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
