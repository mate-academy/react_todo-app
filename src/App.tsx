/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { StateContext } from './GlobalProvider';
import { Header } from './component/Header/Header';
import { Section } from './component/Section/Section';
import { Footer } from './component/Footer/Footer';

export const App: React.FC = () => {
  const { todoList } = useContext(StateContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todoList.length > 0 && <Section />}
        {todoList.length > 0 && <Footer />}
      </div>
    </div>
  );
};
