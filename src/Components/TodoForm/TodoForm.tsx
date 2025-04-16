import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import {
  DispatchContext,
  StateContext,
} from '../../GlobalProvider/GlobalProvider';
import { Todo } from '../../types/Todo';

export const TodoForm = () => {
  const todos = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [title, setTitle] = useState('');

  const availableToggelAll = todos.length > 0;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || title.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });

    setTitle('');
  };

  const handleToggleAll = () => {
    dispatch({ type: 'toggleAll' });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}

      {availableToggelAll && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: hasCompletedTodos,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
