import React from 'react';
import { TodoForm } from './Components/TodoForm';
import { TodoList } from './Components/TodoList';
import { TodoFooter } from './Components/TodoFooter';
import { ErrorNotification } from './Components/ErrorNotification';

import { TodoProvider } from './Contexts/TodoProvider';
import { useTodoData } from './hooks/useTodoData';
import { useTodoUI } from './hooks/useTodoUI';

const AppContent: React.FC = () => {
  const { isTodoListVisible, isTodoFooterVisible } = useTodoData();
  const { inputRef } = useTodoUI();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoForm ref={inputRef} />
        {isTodoListVisible && <TodoList />}
        {isTodoFooterVisible && <TodoFooter />}
      </div>
      <ErrorNotification />
    </div>
  );
};

export const App: React.FC = () => (
  <TodoProvider>
    <AppContent />
  </TodoProvider>
);
