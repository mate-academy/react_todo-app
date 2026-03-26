/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { useStateValue } from './GlobalProvider';

export const App: React.FC = () => {
  const { todosCount } = useStateValue();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        {todosCount > 0 && <Footer />}
      </div>
    </div>
  );
};
