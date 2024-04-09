/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoAppHeader } from './component/TodoAppHeader';
import { TodoAppMain } from './component/TodoAppMain';
import { TodoAppFooter } from './component/TodoAppFooter';
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
