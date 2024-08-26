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

  const promiseToggleCompleted = ({ id, completed, title }: Todo) => {
    return new Promise<void>(resolve => {
      const data = {
        completed: completed,
        title: title,
      };

      patchTodoFromStorage(id, data);
      dispatch({ type: 'patchTodo', payload: { id, data } });

      resolve();
    });
  };

  const handleCompleteAllTodos = async () => {
    let togglePromises;

    if (isAllTodosCompleted) {
      togglePromises = todos.map(todo => {
        const toggleTodo = { ...todo, completed: false };

        return promiseToggleCompleted(toggleTodo);
      });
    } else {
      const activeTodos = todos.filter(todo => !todo.completed);

      togglePromises = activeTodos.map(todo => {
        const toggleTodo = {
          ...todo,
          completed: todo.completed ? false : true,
        };

        return promiseToggleCompleted(toggleTodo);
      });
    }

    await Promise.allSettled(togglePromises);
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
