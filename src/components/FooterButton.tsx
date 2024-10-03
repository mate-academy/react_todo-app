import React from 'react';
import { useGlobalState } from '../castomHuks/useGlobalState';
import { deleteTodoFromStorage } from '../api/todos';
import { useDispatch } from '../castomHuks/useDispatch';

export const FooterButton: React.FC = () => {
  const { todos, inputHeaderRef } = useGlobalState();
  const dispatch = useDispatch();

  const clearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    const deletePromises = completedTodos.map(
      todo =>
        new Promise<void>(resolve => {
          deleteTodoFromStorage(todo.id);
          dispatch({ type: 'deleteTodo', payload: todo.id });
          resolve();
        }),
    );

    if (inputHeaderRef?.current) {
      inputHeaderRef.current.focus();
    }

    await Promise.allSettled(deletePromises);
  };

  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!hasCompletedTodos}
      onClick={clearCompleted}
    >
      Clear completed
    </button>
  );
};
