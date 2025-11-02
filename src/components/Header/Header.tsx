import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../../styles/todo-list.scss';
import { useTodos } from '../../context/TodoContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { todos, addTodo, toggleAll, handleError, processingIds } = useTodos();
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activeCount = todos.filter((todo) => !todo.completed).length;

  const areAllCompleted = todos.length > 0 && activeCount === 0;

  useEffect(() => {
    inputRef.current!.focus();
  }, []);

  useEffect(() => {
    inputRef.current!.focus();
  }, [todos.length]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const title = newTitle.trim();

      if (title) {
        addTodo(title);
        setNewTitle('');
      } else {
        handleError('EMPTY_TITLE');
      }

      inputRef.current!.focus();
    },
    [addTodo, handleError, newTitle],
  );

  const handleToggleAll = useCallback(() => {
    toggleAll();
  }, [toggleAll]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllCompleted,
          })}
          onClick={handleToggleAll}
          data-cy="ToggleAllButton"
        ></button>
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          ref={inputRef}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          disabled={processingIds.length > 0}
        />
      </form>
    </header>
  );
};
