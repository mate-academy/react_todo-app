import classNames from 'classnames';
import { useTodos } from '../../providers/TodosProvider';
import React, { useState } from 'react';

export const TodoHeader = () => {
  const { todos, completedAllTodos, setTodos, headerInputRef } = useTodos();
  const [title, setTitle] = useState('');

  const handleCompletedAllTodos = () => {
    setTodos(prev =>
      prev.map(todo => ({ ...todo, completed: !completedAllTodos })),
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    setTodos(prev => [
      ...prev,
      { id: +new Date(), title: title.trim(), completed: false },
    ]);
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            // eslint-disable-next-line prettier/prettier
            active: completedAllTodos,
          })}
          data-cy="ToggleAllButton"
          onClick={handleCompletedAllTodos}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
          ref={headerInputRef}
        />
      </form>
    </header>
  );
};
