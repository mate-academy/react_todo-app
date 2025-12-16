import React from 'react';
import { NewTodoProvider } from './NewTodoContext';
import { RefsProvider } from './RefsContext';
import { SelectedTodoProvider } from './SelectedTodoContext';
import { TodosProvider } from './TodosContext';
import { SelectedTodosProvider } from './SelectedTodosContext';

type Props = {
  children: React.ReactNode;
};

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <TodosProvider>
      <SelectedTodosProvider>
        <NewTodoProvider>
          <RefsProvider>
            <SelectedTodoProvider>{children}</SelectedTodoProvider>
          </RefsProvider>
        </NewTodoProvider>
      </SelectedTodosProvider>
    </TodosProvider>
  );
};
