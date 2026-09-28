import React, { useEffect } from 'react';
import { Header } from './components/Header/Header';
import { List } from './components/List/List';
import { Footer } from './components/Footer/Footer';
import { useGlobalState } from './GlobalProvider';

export const App: React.FC = () => {
  const { todos } = useGlobalState();

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && <List />}

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
