import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { DispatchContext, StateContext } from './Store';

export const TodoHeader: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [value, setValue] = useState('');
  const isAllCopleted = todos.every(todo => todo.completed);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const add = () => {
    const newTodo: Todo = {
      id: +new Date(),
      title: value.trim(),
      completed: false,
    };

    dispatch({ type: 'add', payload: newTodo });
  };

  const updateAll = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    if (isAllCopleted) {
      todos.forEach(todo => {
        dispatch({
          type: 'update',
          payload: { id: todo.id, changes: { completed: false } },
        });
      });
    } else {
      activeTodos.forEach(todo => {
        dispatch({
          type: 'update',
          payload: { id: todo.id, changes: { completed: true } },
        });
      });
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    add();
    setValue('');
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCopleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => updateAll()}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </header>
  );
};
