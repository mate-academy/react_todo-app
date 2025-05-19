import React, { useState, useRef, useEffect } from 'react';
import { useTodoContext } from '../context/TodoContext';
import classNames from 'classnames';

export const TodoHeader: React.FC = () => {
  const { state, dispatch } = useTodoContext();
  const { todos } = state;

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const prevTodosCountRef = useRef(todos.length);

  const hasTodos = todos.length > 0;
  const allCompleted = hasTodos && todos.every(todo => todo.completed);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (todos.length !== prevTodosCountRef.current) {
      inputRef.current?.focus();
    }

    prevTodosCountRef.current = todos.length;
  }, [todos.length]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      return;
    }

    dispatch({ type: 'ADD_TODO', payload: { title: newTodoTitle.trim() } });
    setNewTodoTitle('');
  };

  const handleToggleAll = () => {
    dispatch({
      type: 'TOGGLE_ALL_TODOS',
      payload: { completed: !allCompleted },
    });
  };

  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={inputRef}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
