/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoAppHeader } from './components/TodoAppheader';
import { TodoAppList } from './components/TodoAppList';
import { TodoAppFooter } from './components/TodoAppFooter';
import { TodosContext } from './TodosContext/Context';

export const App: React.FC = () => {
  const todos = useContext(TodosContext).todos;
  const isEmpty = todos.length === 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoAppHeader />
        {!isEmpty && (
          <>
            <TodoAppList />
            <TodoAppFooter />
          </>
        )}
      </div>
    </div>
  );
};
