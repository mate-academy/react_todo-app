import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import classNames from 'classnames';

export const TodoHeader: React.FC = () => {
  const { todos, addTodo, toggleAll, newTodoInputRef } =
    useContext(TodoContext);
  const [title, setTitle] = useState('');

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed) {
      addTodo(trimmed);
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 ? (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          ref={newTodoInputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
