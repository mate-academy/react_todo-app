import classNames from 'classnames';
import React from 'react';
import { useGlobalState } from '../castomHuks/useGlobalState';
import { patchTodoFromStorage } from '../api/todos';
import { useDispatch } from '../castomHuks/useDispatch';
import { Todo } from '../types/Todo';

export const ToggleButton: React.FC = () => {
  const { todos } = useGlobalState();
  const dispatch = useDispatch();

  const isCompletedTodo = todos.every(todo => todo.completed === true);

  const promiseToggleComleted = ({ id, completed, title }: Todo) => {
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

  const handleCompletedAllTodos = async () => {
    let togglePromises;

    if (isCompletedTodo) {
      togglePromises = todos.map(todo => {
        const toggleTodo = { ...todo, completed: false };

        return promiseToggleComleted(toggleTodo);
      });
    } else {
      const completedTodos = todos.filter(todo => !todo.completed);

      togglePromises = completedTodos.map(todo => {
        const toggleTodo = {
          ...todo,
          completed: todo.completed ? false : true,
        };

        return promiseToggleComleted(toggleTodo);
      });
    }

    await Promise.allSettled(togglePromises);
  };

  return (
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: isCompletedTodo,
      })}
      data-cy="ToggleAllButton"
      onClick={handleCompletedAllTodos}
    />
  );
};
