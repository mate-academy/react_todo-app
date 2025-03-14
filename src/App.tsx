/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { TodoProvider } from './TodoContext';
import { TodoError } from './components/TodoError';
import { TodoFooter } from './components/TodoFooter';
import { TodoSection } from './components/TodoSection';
import { TodoHeader } from './components/TodoHeader';

export enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

interface AppProp {
  todoId: number;
}

export const App: React.FC<AppProp> = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoHeader />
          <TodoSection />
          <TodoFooter />
        </div>

        <TodoError />
      </div>
    </TodoProvider>
  );
};
