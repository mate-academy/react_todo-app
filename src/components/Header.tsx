import { useEffect } from 'react';
import { useTodos } from '../context/TodosContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const {
    value: { todos },
    handleSubmit,
    isCreating,
    title,
    setTitle,
    toggleAll,
    inputRef,
  } = useTodos();

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  useEffect(() => {
    if (!isCreating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, isCreating]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={isCreating}
        />
      </form>
    </header>
  );
};
