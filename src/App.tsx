/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Content } from './components/Content';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Content />
    </div>
  );
};
