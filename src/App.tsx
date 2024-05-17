/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { AppProvider } from './context/AppContext';
import { TodosHeader } from './TodosHeader';
import { TodosMain } from './TodosMain';
import { TodosFooter } from './TodosFooter';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodosHeader />

          <TodosMain />

          <TodosFooter />
        </div>
      </div>
    </AppProvider>
  );
};
