import React, { useContext, useState } from 'react';
import { Context } from './Context';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const { todos } = useContext(Context);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length !== 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer filter={filter} onFilterChange={setFilter} />
          </>
        )}
      </div>
    </div>
  );
};
