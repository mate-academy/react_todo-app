import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { useTodoContext } from '../TodoContext/TodoContext';
import { Todo } from '../types/Todo';

export const Header: React.FC = React.memo(() => {
  const { todos, setTodos, inputRef } = useTodoContext();
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

    setTodos([...todos, newTodo]);
    setQuery('');
    inputRef.current?.focus();
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleAddTodo();
  };

  const handleChangeCompletedAllTodos = useCallback(() => {
    const completed = !todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed,
    }));

    setTodos(updatedTodos);
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
