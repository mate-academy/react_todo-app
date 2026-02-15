/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { useTodoState } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos } = useTodoState();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && <TodoList />}

        {todos.length > 0 && <TodoFooter />}
      </div>
    </div>
  );
};
