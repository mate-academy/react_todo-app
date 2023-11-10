/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoContent } from './components/TodoConent';
import { TodoFooter } from './components/TodoFooter';
import { TodoProvider } from './components/TodosContext';
import TodoApp from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodoProvider>
        <TodoApp />
        <TodoContent />
        <TodoFooter />
      </TodoProvider>
    </div>
  );
};
