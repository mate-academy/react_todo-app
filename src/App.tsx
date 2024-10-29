/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import React, { useContext, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage } from './types/ErrorMessage';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Notification } from './components/Notification/Notification';
import { DispatchContext, StateContext } from './Store';
import { onAutoCloseNotification } from './utils/autoCloseNotification';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  useEffect(() => {
    dispatch({ type: 'download' });
    getTodos()
      .then(downloadedTodos => {
        dispatch({ type: 'downloadSuccess', todos: downloadedTodos });
      })
      .catch(() => {
        dispatch({ type: 'failure', errorMessage: ErrorMessage.load });
      })
      .finally(() => {
        onAutoCloseNotification(dispatch);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        <TodoList />

        {todos.length > 0 && <TodoFilter />}
      </div>

      <Notification />
    </div>
  );
};
