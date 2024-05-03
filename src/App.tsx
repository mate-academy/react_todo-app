import React, { useContext } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { TodoContext } from './components/TodoContext/TodoContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Main />
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
