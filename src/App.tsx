/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { TodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <Main />

        {todos.length > 0 && <Footer todos={todos} />}
      </div>
    </div>
  );
};
