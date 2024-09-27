import React, { useEffect, useRef } from 'react';
import { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';
import { ListAct } from '../types/Actions';
import cn from 'classnames';

export const NewTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { dispatch, todos, allTodos } = useContext(TodoContext);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim().length > 0) {
      const addedTodo: Todo = {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      };

      setTitle('');

      dispatch({ type: ListAct.Add, payload: addedTodo });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const allCompleted = allTodos.every(todo => todo.completed === true);

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (allCompleted) {
      focusInput();
    }
  }, [allCompleted]);

  useEffect(() => {
    focusInput();
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {allTodos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allCompleted })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: ListAct.SetAllComplet })}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          autoFocus
          className={cn('todoapp__new-todo', { active: allCompleted })}
          placeholder="What needs to be done?"
          value={title}
          ref={inputRef}
          onChange={handleFormChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
};
