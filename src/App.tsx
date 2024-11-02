import React from 'react';
import { Content } from './components/Content';
import { TodosProvider } from './context/TodosContex';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <h1 className="todoapp__title">todos</h1>

        <Content />
      </TodosProvider>
    </div>
  );
};
