/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoContent } from './components/TodoContent';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <TodoContent />
    </div>
  );
};
