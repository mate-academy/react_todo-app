/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodosProvider } from './contexts/TodosContext';
import { Container } from './components/Container/Container';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <Container />
      </TodosProvider>
    </div>
  );
};
