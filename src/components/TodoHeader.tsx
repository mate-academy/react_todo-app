import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useTodoContext } from '../TodoContext';

export const TodoHeader: React.FC = () => {
  const {
    handleAddTodo,
    queryTodo,
    setQueryTodo,
    setError,
    isInputDisabled,
    inputRef,
    handleToggleAll,
    todos,
  } = useTodoContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (queryTodo && queryTodo.trim()) {
      handleAddTodo(queryTodo.trim());
    } else {
      setError('Title should not be empty');
    }
  };

  useEffect(() => {
    if (!isInputDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  });

  const allCompleted = todos.every(todo => todo.completed);
  const blurButton = todos.length === 0;

  return (
    <header className="todoapp__header">
      {blurButton ? (
        <div></div>
      ) : (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={queryTodo}
          onChange={event => setQueryTodo(event.target.value)}
          autoFocus
          disabled={isInputDisabled}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
