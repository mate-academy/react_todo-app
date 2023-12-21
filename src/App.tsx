/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Provider, TodosContext } from './contexts/TodosContext';

export const App: React.FC = () => {
  const { state: { todos } } = React.useContext(TodosContext);
  const [tasksLength, setTasksLength] = useState(todos.length);

  useEffect(() => {
    setTasksLength(todos.length);
  }, [todos]);

  return (
    <Provider>
      <div className="todoapp">
        <Header />
        <Main />
        {tasksLength > 0 && (
          <Footer />
        )}
      </div>
    </Provider>
  );
};
