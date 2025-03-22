import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from './SetTodosContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    return null;
  }

  const { filteredTodos, todos, setTodos, inputRef, toggleAllButton } =
    todoContext;

  const toggleActive = filteredTodos.every(todo => todo.completed);
  const hasCompletedTodo = filteredTodos.some(todo => !todo.completed);

  const submitForm = () => {
    if (!query) {
      return;
    }

    setTodos((prev: Todo[]) => [
      ...prev,
      {
        id: Date.now(),
        title: query.trim(),
        completed: false,
      },
    ]);

    setQuery('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: toggleActive,
          })}
          data-cy="ToggleAllButton"
          onClick={() => toggleAllButton(hasCompletedTodo)}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={submitForm}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          value={query}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};
