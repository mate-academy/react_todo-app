import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';
import { TodoFooter } from './TodoFooter';

export const AppContent: React.FC = () => {
  const { state } = useTodoContext();

  const hasTodos = state.todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {hasTodos && (
          <>
            <TodoList />
            <TodoFooter />
          </>
        )}
      </div>
    </div>
  );
};
