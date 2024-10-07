import React, { useContext } from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoContext } from './components/TodoContext';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList />
        </section>

        {!!todos.length && <Footer />}
      </div>
    </div>
  );
};
