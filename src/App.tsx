/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { NewTodo } from './components/NewTodo';
import { TodosContent } from './components/TodosContent';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <NewTodo />
          <TodosContent />
        </div>
      </div>
    </TodoProvider>
  );
};
