/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';
import { TodosContextProvider } from './components/TodosContext';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <TodosContextProvider>
        <TodoApp />
      </TodosContextProvider>
    </BrowserRouter>
  );
};
