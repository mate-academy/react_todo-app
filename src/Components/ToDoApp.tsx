import React, { useContext } from 'react';

import { TodoContext } from './Context/TodoContext';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Section } from './Main/Section';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">

      <Header />
      <Section />
      {!!todos.length && <Footer />}

    </div>
  );
};
