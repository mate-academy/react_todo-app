import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../context/TodoContext';
import { TodoContextType } from '../types/Action';

export const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const { todos, addTodo, counterCompletedTodos, toggleAllTodo, inputRef } =
    useContext(TodoContext) as TodoContextType;

  const reset = () => {
    setQuery('');
  };

  const handleQueryChange = (newValue: string) => {
    setQuery(newValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    addTodo({
      id: 0,
      title: query.trim(),
      completed: false,
    });

    reset();
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: counterCompletedTodos === todos.length,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodo}
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
          onChange={event => {
            handleQueryChange(event.target.value);
          }}
        />
      </form>
    </header>
  );
};
