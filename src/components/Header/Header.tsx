import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../context/StateContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const inputField = useRef<HTMLInputElement>(null);

  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    dispatch({
      type: 'addTodo',
      payload: {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      },
    });

    setTitle('');
  };

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggleAll' })}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
          ref={inputField}
        />
      </form>
    </header>
  );
};
