
import React, { useMemo, useState } from 'react';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { useTodos } from './context/TodoContext';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [filteredBy, setFilteredBy] = useState(FilterType.All);
  const { todos } = useTodos();

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filteredBy) {
        case FilterType.All:
          return true;

        case FilterType.Active:
          return !todo.completed;

        case FilterType.Completed:
          return todo.completed;
      }
    });
  }, [filteredBy, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header areAllCompleted={areAllCompleted} />

        <TodoList filteredTodos={filteredTodos} />

        {todos.length > 0 && (
          <Footer currentFilter={filteredBy} onFilterChange={setFilteredBy} />
        )}
      </div>
    </div>
  );
};
