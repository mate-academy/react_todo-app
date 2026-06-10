/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { useTodoContext } from './hooks/useTodoContext';

export const App: React.FC = () => {
  const {
    state: { todos },
  } = useTodoContext();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

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
