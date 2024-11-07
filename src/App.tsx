import React, { useContext } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodosContext } from './services/TodosContext&Provider';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header />

      <div className="todoapp__content">
        <TodoList />

        {!!todos.length && <Footer />}
      </div>
    </div>
  );
};
