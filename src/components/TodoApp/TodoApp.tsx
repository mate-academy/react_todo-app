/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from '../Header/Header';
import { TodoList } from '../TodoList/TodoList';
import { TodosProvider } from '../../TodosContext';
import { Footer } from '../Footer/Footer';

export const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <Header />

        <TodoList />

        <Footer />
      </TodosProvider>
    </div>
  );
};
