import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from './TodoContext';
import classNames from 'classnames';

export const Header = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [value, setValue] = useState('');
  const mainInput = useRef<HTMLInputElement>(null);
  const isSomeActive = todos.some(t => !t.completed) || !todos.length;

  useEffect(() => {
    if (mainInput.current) {
      mainInput.current.focus();
    }
  }, [todos]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    setTodos([
      ...todos,
      { id: Date.now(), title: value.trim(), completed: false },
    ]);
    setValue('');
  };

  const toggleAll = () => {
    if (isSomeActive) {
      setTodos(todos.map(t => ({ ...t, completed: true })));
    } else {
      setTodos(todos.map(t => ({ ...t, completed: false })));
    }
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !isSomeActive,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={submitHandler}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          ref={mainInput}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </header>
  );
};
