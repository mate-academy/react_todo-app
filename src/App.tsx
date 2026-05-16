/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';

import { useTodo } from './context/TodoContext';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos } = useTodo();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && (
          <>
            <TodoList />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};
