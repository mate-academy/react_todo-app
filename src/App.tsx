/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodosProvider } from './TodoContext/TodosContext';

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
