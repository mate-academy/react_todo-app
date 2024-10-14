import React, { useEffect, useRef, useState } from 'react';
import { useGlobalDispatch, useGlobalState } from '../store/Store';
import { ActionType } from '../enums/ActionTypes';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const fieldRef = useRef<HTMLInputElement>(null);
  const currentTodosLength = useRef(todos.length);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: ActionType.ADD_TODO, payload: newTodo.trim() });
      setNewTodo('');
    }
  };

  useEffect(() => {
    fieldRef.current?.focus();
  }, []);

  useEffect(() => {
    if (todos.length < currentTodosLength.current) {
      fieldRef.current?.focus();
    }

    currentTodosLength.current = todos.length;
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
          onClick={() => dispatch({ type: ActionType.TOGGLE_ALL })}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          ref={fieldRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
      </form>
    </header>
  );
};
