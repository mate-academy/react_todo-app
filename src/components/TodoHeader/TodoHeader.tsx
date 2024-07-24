import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { ErrorMessages } from '../../types';
import { useTodosContext } from '../controllers/todos/useTodosContext';

// import { handleFilteredTodos } from '../../utils';

const USER_ID = 885;

export const TodoHeader: React.FC = () => {
  const { todos, onChangeErrorMessage, onToggleTodos, onAddTodo } =
    useTodosContext();
  const [value, setValue] = useState('');
  const isAllCompleted = todos.every(todo => todo.completed);
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [todos.length]);

  const addingTodo = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (!value.trim()) {
      onChangeErrorMessage(ErrorMessages.EmptyTitleError);

      return;
    }

    const newTodo = {
      id: +new Date(),
      userId: USER_ID,
      title: value.trim(),
      completed: false,
    };

    try {
      onAddTodo(newTodo);
      setValue('');
    } catch {
      onChangeErrorMessage(ErrorMessages.AddError);
    }
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllCompleted })}
          data-cy="ToggleAllButton"
          onClick={onToggleTodos}
        />
      )}

      <form onSubmit={addingTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={titleField}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </header>
  );
};
