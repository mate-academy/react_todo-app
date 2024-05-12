import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { DispatchContex, StateContex } from '../../Store';

export const Header: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const dispatch = useContext(DispatchContex);
  const { todos } = useContext(StateContex);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [todos]);

  const isAllCompleted =
    todos.filter(todo => todo.completed).length === todos.length;

  const handlerFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (newTitle.trim()) {
      const newTodo = {
        title: newTitle.trim(),
        completed: false,
        id: +new Date(),
      };

      dispatch({ type: 'add', payload: newTodo });
      setNewTitle('');
    }
  };

  const handlerSetAllStatus = () => {
    todos.forEach(({ id }) => {
      dispatch({
        type: 'set-complete',
        payload: { id, completed: !isAllCompleted },
      });
    });
  };

  return (
    <header className="todoapp__header">
      {/* this button have `active` class only if all todos are completed */}
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllCompleted })}
          data-cy="ToggleAllButton"
          onClick={handlerSetAllStatus}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handlerFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={evt => setNewTitle(evt.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
