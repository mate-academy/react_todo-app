/* eslint-disable prettier/prettier */
import React from 'react';
import { useTodos } from './store/TodosContext';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const { todosIsEmpty } = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header />

      <div className="todoapp__content">
        <TodoList />
        {!todosIsEmpty &&
          <Footer />
        }
      </div>
    </div>
  );
};
