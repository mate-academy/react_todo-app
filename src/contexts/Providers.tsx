import React from 'react';
import { NewTodoProvider } from './NewTodoContext';
import { RefsProvider } from './RefsContext';
import { SelectedTodoProvider } from './SelectedTodoContext';
import { TodosProvider } from './TodosContext';
import { SelectedTodosProvider } from './SelectedTodosContext';
import { TodosFiltersProvider } from './TodosFiltersContext';
import { FocusProvider } from './FocusContext';

type Props = {
  children: React.ReactNode;
};

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <TodosFiltersProvider>
      <TodosProvider>
        <SelectedTodosProvider>
          <NewTodoProvider>
            <RefsProvider>
              <SelectedTodoProvider>
                <FocusProvider>{children}</FocusProvider>
              </SelectedTodoProvider>
            </RefsProvider>
          </NewTodoProvider>
        </SelectedTodosProvider>
      </TodosProvider>
    </TodosFiltersProvider>
  );
};
