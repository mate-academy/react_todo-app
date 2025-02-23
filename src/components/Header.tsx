import React, { FormEvent, useContext, useEffect, useRef } from 'react';
import { DispatchContext, StateContext } from './Store';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { completedTodos } from '../services';

export const Header = () => {
  const { todos, newTitle } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const setNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setNewTitle', payload: e.target.value });
  };

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: newTitle.trim(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });
    dispatch({ type: 'setNewTitle', payload: '' });
  };

  const validation = todos.every(todo => todo.completed === true);

  const toggleAll = () => {
    dispatch({ type: 'toggleAll', payload: !validation });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.length === completedTodos(todos).length,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={addTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={setNewTitle}
        />
      </form>
    </header>
  );
};
