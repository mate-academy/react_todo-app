import React, { useContext, useEffect, useState } from 'react';
import {
  DispatchContext,
  InputContext,
  TodosContext,
} from '../GlobalState/GlobalState';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');

  const todos = useContext(TodosContext);
  const mainInput = useContext(InputContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    mainInput?.current?.focus();
  }, [todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = title.trim();

    dispatch({ type: 'addTodo', payload: trimmed });

    setTitle('');
  };

  const checkCopletedStatus = () => {
    return todos.every(todo => todo.completed);
  };

  const isAllCompleted = checkCopletedStatus();

  const handleClick = () => {
    if (isAllCompleted) {
      dispatch({ type: 'completeAllActive', payload: true });

      return;
    } else {
      dispatch({ type: 'completeAllActive' });
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleClick}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={mainInput}
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
