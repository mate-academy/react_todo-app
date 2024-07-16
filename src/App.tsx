/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { ToDoHeader } from './components/ToDoHeader';
import { ToDoList } from './components/ToDoList';
import { ToDoFooter } from './components/ToDoFooter';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <ToDoHeader />
        <ToDoList />
        <ToDoFooter />
      </div>
    </div>
  );
};
