import React from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = () => {
  const todos = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList />

        {todos.length > 0 && <TodoFooter />}
      </div>
    </div>
  );
};
