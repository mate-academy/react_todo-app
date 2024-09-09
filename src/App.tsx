import { ReactNode } from 'react';
import TodoApp from './components/TodoApp/TodoApp';
import './App.scss';

import { TodoContextProvider } from './Contexts/TodoContext';
import { FilterContextProvider } from './components/Filter';

export const App = (): ReactNode => {
  return (
    <TodoContextProvider>
      <FilterContextProvider>
        <TodoApp />
      </FilterContextProvider>
    </TodoContextProvider>
  );
};
