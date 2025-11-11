import React from 'react';
import cn from 'classnames';
import { TodoContext } from '../contexts/TodoContext';

export const Header: React.FC = () => {
  const {
    todos,
    handleToggleAll,
    handleTodoSubmission,
    todoTitle,
    setTodoTitle,
  } = React.useContext(TodoContext);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const allTodosCompleted = todos.every(todo => todo.completed);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleTodoSubmission}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          value={todoTitle}
          onChange={event => {
            setTodoTitle(event.target.value);
          }}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
