import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { TodoList } from './TodoList';

export const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList />
        </section>

        <Footer />
      </div>
    </div>
  );
};
