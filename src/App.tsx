/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import TodoContent from './components/content/TodoContent';
import { AppContext } from './context/AppContext';

export const App: React.FC = () => {
  return (
    <AppContext>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <TodoContent />
      </div>
    </AppContext>
  );
};
