import React, { useContext, useState } from 'react';
import { Context } from './Context';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { FilterStatus, Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos } = useContext(Context);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
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
