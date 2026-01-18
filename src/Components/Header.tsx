import classNames from 'classnames';
import { useTodos } from './services/ContextHook';
import { useState } from 'react';

export const Header = () => {
  const [title, setTitle] = useState('');
  const { todos, addTodo, toggleAll, mainInputRef } = useTodos();

  const todoCompleted = todos.every(todo => todo.completed);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newTitle = title.trim();

    if (!newTitle) {
      return;
    }

    addTodo(newTitle);
    setTitle('');
  }

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          aria-label="Toggle all todos status"
          className={classNames('todoapp__toggle-all', {
            active: todoCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          ref={mainInputRef}
          value={title}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
