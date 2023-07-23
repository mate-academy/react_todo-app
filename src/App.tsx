/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { TodosContext } from './context/TodosContext';
import { Status } from './types/todo';
import { filterTodos } from './utils/helpers';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [status, setStatus] = useState(Status.All);

  return (
    <div className="todoapp">
      <Header />

      {!!todos.length && (
        <TodoList
          filteredTodos={filterTodos(status, todos)}
        />
      )}

      {!!todos.length && (
        <Footer
          status={status}
          setStatus={setStatus}
        />
      )}
    </div>
  );
};
