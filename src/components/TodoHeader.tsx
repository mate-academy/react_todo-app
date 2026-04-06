import React, { useState } from 'react';
import classNames from 'classnames';
import { useTodos } from '../context/TodoContext';

export const TodoHeader: React.FC = () => {
  const { todos, addTodo, toggleAll, allCompleted, headerInputRef } =
    useTodos();
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo(title);
    setTitle('');
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
          ref={headerInputRef}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          data-cy="NewTodoField"
        />
      </form>
    </header>
  );
};

export default TodoHeader;
