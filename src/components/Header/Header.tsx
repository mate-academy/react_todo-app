import cn from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../store/Store';

type Props = {};

export const Header: React.FC<Props> = () => {
  const [currentTodoTitle, setCurrentTodoTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useContext(DispatchContext);
  const todos = useContext(StateContext);

  const handleForm: React.FormEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    if (currentTodoTitle.trim()) {
      dispatch({ type: 'add', payload: currentTodoTitle });
      setCurrentTodoTitle('');
    }
  };

  const handleActivationArrow = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    dispatch({ type: 'updateAll', payload: !areAllCompleted });
  };

  const areAllCompleted = todos.every(todo => todo.completed);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: areAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            handleActivationArrow();
          }}
        />
      )}

      <form onSubmit={handleForm}>
        <input
          ref={inputRef}
          autoFocus
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={currentTodoTitle}
          onChange={ev => setCurrentTodoTitle(ev.target.value)}
        />
      </form>
    </header>
  );
};
