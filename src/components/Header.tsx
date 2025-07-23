import React, { useState } from 'react';
import { useDispatch, useGlobalState, useInputRef } from '../hooks/GlobalHooks';
import { Todo } from '../types/Todo';
import cn from 'classnames';

export const Header = () => {
  const [todoInput, setTodoInput] = useState('');
  const { todos } = useGlobalState();
  const dispatch = useDispatch();
  const inputRef = useInputRef();

  const isToggleAllVisible = todos.length > 0;
  const isAllTodosCompleted = todos.every(todo => todo.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prepearedInputValue = todoInput.trim();

    if (!prepearedInputValue) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: prepearedInputValue,
      completed: false,
    };

    dispatch({ type: 'addTodo', newTodo });
    setTodoInput('');
  };

  const toggleAllTodos = () => {
    const newStatus = !isAllTodosCompleted;
    const todosToUpdate = todos.filter(todo => todo.completed !== newStatus);

    if (todosToUpdate.length === 0) {
      return;
    }

    const updatedTodos = todosToUpdate.map(todo => ({
      ...todo,
      completed: newStatus,
    }));

    dispatch({ type: 'toggleTodos', updatedTodos });
  };

  return (
    <header className="todoapp__header">
      {isToggleAllVisible && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllTodosCompleted })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoInput}
          onChange={e => setTodoInput(e.target.value)}
          ref={inputRef}
          autoFocus
        />
      </form>
    </header>
  );
};
