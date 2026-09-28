import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useTodos } from '../../context/TodoContext';

export const NewTodo: React.FC = () => {
  const { todos, addTodo, toggleAll, newTodoFieldRef } = useTodos();
  const [title, setTitle] = useState('');

  useEffect(() => {
    newTodoFieldRef.current?.focus();
  }, [newTodoFieldRef]);

  function handlerSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      addTodo(trimmedTitle);
      setTitle('');
    }
  }

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handlerSubmitForm}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={newTodoFieldRef}
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
