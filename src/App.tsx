/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/todoApp';
import { TodosProvider } from './components/todosContext';
import {
  ActiveProvider,
  AllProvider,
  CompletedProvider,
} from './components/filterContext';
import { ManageCheckboxProvider } from './components/manageCheckboxContext';

export const App: React.FC = () => {
  return (
    <ManageCheckboxProvider>
      <AllProvider>
        <ActiveProvider>
          <CompletedProvider>
            <TodosProvider>
              <TodoApp />
            </TodosProvider>
          </CompletedProvider>
        </ActiveProvider>
      </AllProvider>
    </ManageCheckboxProvider>
  );
};
