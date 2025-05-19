import React from 'react';
import { TodoProvider } from './context/TodoProvider';
import { AppContent } from './components/AppContent';

export const App: React.FC = () => (
  <TodoProvider>
    <AppContent />
  </TodoProvider>
);
