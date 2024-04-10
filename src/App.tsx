/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoAppMain } from './components/TodoAppList';
import { TodoAppFooter } from './components/TodoAppFooter';
import { StateContext } from './context/ReduxContex';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader />

        <TodoAppMain />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && <TodoAppFooter />}
      </div>
    </div>
  );
};
