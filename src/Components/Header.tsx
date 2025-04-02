import classNames from 'classnames';
import React, { useCallback, useContext, useState } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import { Todo } from '../types/Todo';

export const Header: React.FC = React.memo(() => {
  const { todos, setTodos, inputRef } = useContext(TodoContext);
  const [query, setQuery] = useState('');

  const handleAddTodo = () => {
    if (!query.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: query.trim(),
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setQuery('');
    inputRef.current?.focus();
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleAddTodo();
  };

  const handleChangeCompletedAllTodos = useCallback(() => {
    const areAllCompleted = todos.every(todo => todo.completed);

    setTodos(currentTodos =>
      currentTodos.map(todo => ({ ...todo, completed: !areAllCompleted })),
    );
  }, [todos, setTodos]);

  const checkAllActiveTodos = () => todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: checkAllActiveTodos(),
          })}
          data-cy="ToggleAllButton"
          onClick={handleChangeCompletedAllTodos}
        />
      )}
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
});

Header.displayName = 'Header';
