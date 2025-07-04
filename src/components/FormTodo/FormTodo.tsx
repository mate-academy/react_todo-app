import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../context/TodoContext';

export const FormTodo: React.FC = () => {
  const [isActive, setIsActive] = useState(true);

  const {
    postTodos,
    changeComplite,
    todos,
    isDisabledInput,
    inputRef,
    searchTerm,
    setSearchTerm,
  } = useContext(TodoContext);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    const isAllCompleted = todos.every(todo => todo.completed);

    setIsActive(isAllCompleted);
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', { active: isActive })}
          data-cy="ToggleAllButton"
          onClick={changeComplite}
        />
      )}

      <form
        onSubmit={e => {
          e.preventDefault();
          try {
            postTodos(searchTerm);
          } catch (error) {}
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          ref={inputRef}
          disabled={isDisabledInput}
        />
      </form>
    </header>
  );
};
