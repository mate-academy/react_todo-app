/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoFooter, TodoHeader, TodoList } from '../features/todos';
import { TodosProvider } from '../features/todos/providers/TodosProvider';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoHeader />

          <TodoList />

          <TodoFooter />
        </div>
      </TodosProvider>
    </div>
  );
};
