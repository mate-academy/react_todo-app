import React, { useState } from 'react';
import {
  useDispatch,
  useGlobalState,
  useHeaderInputRef,
} from '../hooks/GlobalHooks';
import { Todo } from '../types/Todo';
import cn from 'classnames';
import { ActionType } from '../constants/ActionType';

export const Header = () => {
  const [todoInput, setTodoInput] = useState('');
  const { todos } = useGlobalState();
  const dispatch = useDispatch();
  const headerInputRef = useHeaderInputRef();

  const isToggleAllVisible = todos.length > 0;
  const isAllTodosCompleted = todos.every(todo => todo.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const prepearedInputValue = todoInput.trim();

    if (!prepearedInputValue) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: prepearedInputValue,
      completed: false,
    };

    dispatch({ type: ActionType.Add, newTodo });
    setTodoInput('');
  };

  const buildUpdatedTodos = (): Todo[] => {
    const newStatus = !isAllTodosCompleted;

    return todos
      .filter(todo => todo.completed !== newStatus)
      .map(todo => ({
        ...todo,
        completed: newStatus,
      }));
  };

  const toggleAllTodos = () => {
    const updatedTodos = buildUpdatedTodos();

    dispatch({
      type: ActionType.Toggle,
      updatedTodos,
    });
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
          ref={headerInputRef}
          autoFocus
        />
      </form>
    </header>
  );
};
