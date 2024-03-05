import React from 'react';
import { MyProvider } from './components/Provider/Provider';
import { TodoApp } from './components/todoApp/TodoApp';

export const App = () => {
  return (
    <MyProvider>
      <TodoApp />
    </MyProvider>
  );
};
