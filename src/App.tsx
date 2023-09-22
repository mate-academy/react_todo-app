/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodosProvider } from './TodosContext';
import TodoHeader from './component/TodoHeader';
import TodoList from './component/TodoList';
import { TodoFooter } from './component/TodoFooter';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <TodoHeader />
        <TodoList />
        <TodoFooter />
      </div>
    </TodosProvider>
  );
};
