import React from 'react';
import { TodosContextProvider } from './components/TodosProvider';
import { TodoApp } from './components/TodoApp';
import './styles/index.scss';

export const App: React.FC = () => {
  return (
    <TodosContextProvider>
      <TodoApp />
    </TodosContextProvider>
  );
};
