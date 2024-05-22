/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { ToDoProvider } from './store/AppContext';
import { ToDoAppContent } from './components/ToDoAppContent';

export const App: React.FC = () => {
  return (
    <ToDoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
      </div>
      <ToDoAppContent />
    </ToDoProvider>
  );
};
