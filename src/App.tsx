/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import { TodosContext } from './context/TodosContext';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import { TODOS_KEY } from './utils/localStorage';

export const App: React.FC = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('TodosContext must be used within TodosProvider');
  }

  const { state } = context;
  const { todos } = state;

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList />
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
