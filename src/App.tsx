/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import { AppContext } from './components/AppContext/AppContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  const todosData = useContext(AppContext);

  useEffect(() => {
    todosData?.setTodosList();
  }, []);

  return (
    <>
      <div className="todoapp">
        <Header />
        {todosData?.filteredTodos && (
          <TodoApp />
        )}
        {todosData?.filteredTodos && (
          <Footer />
        )}
      </div>
      {todosData?.isError && (
        <ErrorNotification />
      )}
    </>

  );
};
