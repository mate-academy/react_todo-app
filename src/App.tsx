/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Header } from './components/Header';
import { TodosContext } from './utils/TodosContext';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [queryStatus, setQueryStatus] = useState(Status.all);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList queryStatus={queryStatus} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer queryStatus={queryStatus} setQueryStatus={setQueryStatus} />
        )}
      </div>
    </div>
  );
};
