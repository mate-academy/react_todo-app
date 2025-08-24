/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useTodos } from '../context/TodosContext';

export const Header: React.FC<{
  inputRef: React.RefObject<HTMLInputElement>;
}> = ({ inputRef }) => {
  const { todos, addTodo, toggleAll, allCompleted } = useTodos();
  const [title, setTitle] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    addTodo(title);
    setTitle('');
    inputRef.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
