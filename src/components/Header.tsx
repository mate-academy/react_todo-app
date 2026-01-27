import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatchTodos, useSetTodos } from '../context/TodoContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatchTodos();
  const { todos } = useSetTodos();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos.length]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    dispatch({
      type: 'addTodo',
      payload: trimmedTitle,
    });
    setTitle('');
    inputRef.current?.focus();
  };

  const toggleAll = () => {
    dispatch({
      type: 'toggleAll',
    });
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allCompleted })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={handleChange}
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
