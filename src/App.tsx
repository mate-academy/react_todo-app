import React, { useContext } from 'react';

import { Title } from './components/App/Title';
import { Content } from './components/App/Content';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { TodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  const todos = useContext(TodoContext);

  return (
    <div className="todoapp">
      <Title />
      <Content>
        <Header />
        <Main />
        {todos?.length !== 0 && <Footer />}
      </Content>
    </div>
  );
};
