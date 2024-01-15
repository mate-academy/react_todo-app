/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { ToggleAll } from './Components/ToggleAll';
import { Footer } from './Components/Footer';
import { StateContext } from './state/TodosContext';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <Header />
      {todos.length !== 0
        && (
          <section className="main">
            <ToggleAll />
            <TodoList />
            <Footer />
          </section>
        )}
    </div>
  );
};
