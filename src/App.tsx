/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoContext } from './contexts/TodoContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const { todos } = React.useContext(TodoContext);

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
