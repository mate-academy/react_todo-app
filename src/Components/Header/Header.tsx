import React, { FormEvent, useContext, useEffect, useRef } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import { completedTodos } from '../../services/services';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

export const Header: React.FC = () => {
  const { todos, newTodoTitle } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setTodoTitle', payload: event.target.value });
  };

  const allCompleted = todos.every(todo => todo.completed === true);

  const handleToggleAll = () => {
    dispatch({ type: 'setAllCompleted', payload: !allCompleted });
  };

  const normalizedTitle = newTodoTitle.trim();

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!normalizedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: normalizedTitle,
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });
    dispatch({ type: 'setTodoTitle', payload: '' });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.length === completedTodos(todos).length,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          value={newTodoTitle}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
