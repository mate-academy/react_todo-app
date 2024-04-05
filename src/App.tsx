import React from 'react';
import { ListTodos } from './components/ListTodos/ListTodos';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <section className="todoapp__main" data-cy="TodoList">
          <ListTodos />
        </section>
        <Footer />
      </div>
    </div>
  );
};
