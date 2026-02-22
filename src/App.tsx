/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);
  const hasTodos = todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {hasTodos && <TodoList />}
        {/* Hide the footer if there are no todos */}
        {hasTodos && <Footer />}
      </div>
    </div>
  );
};
