/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import React, { useContext } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Notification } from './components/Notification/Notification';
import { StateContext } from './Store';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

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
