import React from 'react';
import { useGlobalState } from '../CustomHooks/useGlobalState';
import { useDispatch } from '../CustomHooks/useDispatch';
import { Todo } from '../types/Todo';
import { patchTodoFromStorage } from '../api/todos';
import classNames from 'classnames';

export const ToggleButtonHeader: React.FC = () => {
  const { todos } = useGlobalState();
  const dispatch = useDispatch();

  const isAllTodosCompleted = todos.every(todo => todo.completed === true);

  const toggleTodoStatus = (todo: Todo, completed: boolean) => {
    const data = {
      completed: completed,
      title: todo.title,
    };

    patchTodoFromStorage(todo.id, data);
    dispatch({ type: 'patchTodo', payload: { id: todo.id, data } });
  };

  const handleCompleteAllTodos = () => {
    if (isAllTodosCompleted) {
      todos.forEach(todo => {
        toggleTodoStatus(todo, false);
      });
    } else {
      todos
        .filter(todo => !todo.completed)
        .forEach(todo => {
          toggleTodoStatus(todo, true);
        });
    }
  };

  return (
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: isAllTodosCompleted,
      })}
      data-cy="ToggleAllButton"
      onClick={handleCompleteAllTodos}
    />
  );
};
