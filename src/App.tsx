/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { Content } from './components/Content/Content';
import { GlobalStateProvider } from './context/Store';

export const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <Content />
      </div>
    </GlobalStateProvider>
  );
};
