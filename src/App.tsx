/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { TodosProvider } from './TodosContext';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <TodosProvider>
        <Header />

        <TodoList />

        {/* <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </section> */}

        <Footer />
      </TodosProvider>
    </div>
  );
};
