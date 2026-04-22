import React, { useContext, useEffect } from 'react';
import { Header } from './components/Header';
import { TodosList } from './components/Todos';
import { Footer } from './components/Footer';
import { StateContext } from './context/TodosContext';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  useEffect(() => {
    if (!localStorage.getItem('todos')) {
      localStorage.setItem('todos', JSON.stringify([]));
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodosList />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
