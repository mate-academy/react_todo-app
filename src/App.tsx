/* eslint-disable jsx-a11y/control-has-associated-label */
// #region imports
import React, { useContext, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { TodosContext } from './components/TodosContext';
import { getFilteredTodos } from './services/getFilteredTodos';
import { FilterStatus } from './types/FilterStatus';
// #endregion

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const sortedTodos = {
    active: todos.filter(({ completed }) => !completed),
    completed: todos.filter(({ completed }) => completed),
  };
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  const filteredTodos = getFilteredTodos(todos, sortedTodos, filterStatus);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            sortedTodos={sortedTodos}
            filterStatus={filterStatus}
            onStatusChange={setFilterStatus}
          />
        )}
      </div>
    </div>
  );
};
