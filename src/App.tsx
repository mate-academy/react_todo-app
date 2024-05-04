import React from 'react';

import { TodoApp } from './components/TodoApp';
import { TodoListProvider } from './context/TodoListProvider';

export const App: React.FC = () => {
  return (
    <TodoListProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoApp />
        </div>
      </div>
    </TodoListProvider>
  );
};
