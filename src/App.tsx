import React from 'react';
import { ToDoProvider } from './store/AppContext';
import { ToDoAppContent } from './components/ToDoAppContent';
import './styles/todo.scss';

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
