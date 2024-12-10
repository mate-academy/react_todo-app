import React, { useContext } from 'react';
import { TodosContext } from '../../context';
import classNames from 'classnames';
import { myLocalStorage } from '../../localStorage';
import { Names } from '../../enums/Filter';

export const TodoHeader: React.FC = () => {
  // #region vars from contexts

  const {
    todos,
    activeTodos,
    value,
    headerInputRef,
    setTodos,
    setValue,
    onSubmit,
  } = useContext(TodosContext);

  // #endregion
  // #region handlers

  const toogleAll = () => {
    const updatedTodos = todos.map(todo => {
      const { completed } = todo;

      if (activeTodos === 0 && completed) {
        return { ...todo, completed: !completed };
      }

      return { ...todo, completed: true };
    });

    setTodos(updatedTodos);
    myLocalStorage.setItem(Names.todos, JSON.stringify(updatedTodos));
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
