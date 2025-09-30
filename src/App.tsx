import React from 'react';
import { TodosProvider } from './components';
import { AppContent } from './AppContent';

export const App: React.FC = () => (
  <TodosProvider>
    <AppContent />
  </TodosProvider>
);
