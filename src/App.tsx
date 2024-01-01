/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ToggleAll } from './components/ToggleAll';
import { Footer } from './components/Footer';
import { StateContext } from './state/TodosContext';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">

      <Header />

      {todos.length !== 0
        && (
          <>
            <section className="main">
              <ToggleAll />

              <TodoList />
            </section>
            <Footer />
          </>
        )}
    </div>
  );
};
