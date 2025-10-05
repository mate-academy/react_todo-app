/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Title } from './components/Todo/Title';
import { Todos } from './components/Todo/Todos';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <Title title="Todos" />
      <Todos />

    </div>
  );
};
