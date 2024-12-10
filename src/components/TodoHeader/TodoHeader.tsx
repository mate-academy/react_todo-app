import React, { useContext } from 'react';
import { TodosContext } from '../../context';
import classNames from 'classnames';

export const TodoHeader: React.FC = () => {
  // #region vars from contexts

  const {
    todos,
    activeTodos,
    value,
    headerInputRef,
    setValue,
    onSubmit,
    toogleHandler,
  } = useContext(TodosContext);

  // #endregion
  // #region handlers

  const toogleAll = () => {
    if (activeTodos === 0) {
      todos.forEach(todo => toogleHandler(todo.id));

      return;
    }

    todos.forEach(todo => {
      const { completed, id } = todo;

      if (!completed) {
        toogleHandler(id);
      }
    });
  };

  // #endregion

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: activeTodos === 0 && activeTodos !== todos.length,
          })}
          data-cy="ToggleAllButton"
          onClick={toogleAll}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          ref={headerInputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </header>
  );
};
