import React from 'react';
import { TodoTitleProvider } from './Context/TodoTitleContext';
import { TodoListProvider } from './Context/TodoListContext';
import { AppContent } from './Components/AppContent';
import { EditContextProvider } from './Context/EditContext';
import { FilterContextProvider } from './Context/FilterContext';

export const App: React.FC = () => {
  return (
    <TodoListProvider>
      <FilterContextProvider>
        <TodoTitleProvider>
          <EditContextProvider>
            <AppContent />
          </EditContextProvider>
        </TodoTitleProvider>
      </FilterContextProvider>
    </TodoListProvider>
  );
};
