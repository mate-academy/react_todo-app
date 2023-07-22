import { FC } from 'react';
import { TodoProvider } from './context/TodoContext';
import { TodoApp } from './components/TodoApp';

export const App: FC = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);
