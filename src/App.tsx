import React from 'react';
import { AppContent } from './components/AppContent';
import { TodoContextProvider } from './store/TodoContextProvider';

export const App: React.FC = () => {
  return (
    <TodoContextProvider>
      <AppContent />
    </TodoContextProvider>
  );
};
