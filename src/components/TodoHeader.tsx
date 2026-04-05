import React, { useState } from 'react';
import { useTodoActions, useTodos } from '../context/TodoContext';
import classNames from 'classnames';

export const TodoHeader: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo, toggleAll } = useTodoActions();
  const { todos, allCompleted, newTodoInputRef } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(title);
    setTitle('');
    newTodoInputRef.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={newTodoInputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
