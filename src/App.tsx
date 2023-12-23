/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { TodosContext } from './contexts/TodosContext';

export const App: React.FC = () => {
  const { state: { todos } } = React.useContext(TodosContext);
  const [tasks, setTasks] = useState(todos);

  useEffect(() => {
    setTasks(todos);
  }, [todos]);

  return (
    <div className="todoapp">
      <Header />
      <Main />
      {tasks.length > 0 && (
        <Footer />
      )}
    </div>
  );
};
