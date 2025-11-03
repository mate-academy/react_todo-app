import React, { useContext } from 'react';
import { Header } from './component/Header/Header';
import { Section } from './component/Section/Section';
import { Footer } from './component/Footer/Footer';
import { StateContext } from './ClobalProvaider';

export const App: React.FC = () => {
  const { todoList } = useContext(StateContext);
  // console.log(todoList.length)

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
