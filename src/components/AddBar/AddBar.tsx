import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { ErrorField } from '../../types/errorField';
import { useError } from '../../context/ErrorContext';
import { useDispatch, useTodos } from '../../context/GlobalProvider';

export const AddBar: React.FC = () => {
  const todos = useTodos();
  const dispatch = useDispatch();
  const { errorMessage, showError } = useError();
  const [query, setQuery] = useState('');
  const todoField = useRef<HTMLInputElement>(null);
  const isActive = todos.every(todo => todo.completed);
  const isVisible = todos.length !== 0;

  useEffect(() => {
    todoField.current?.focus();
  }, [todos, errorMessage]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim() === '') {
      showError(ErrorField.emptyTitle);

      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: query.trim(),
      completed: false,
    };

    dispatch({ type: 'add', payload: newTodo });
    setQuery('');
  };

  return (
    <header className="todoapp__header">
      {isVisible && (
        <button
          type="button"
          className={cn(`todoapp__toggle-all`, { active: isActive })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'updateAll' })}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          ref={todoField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};
