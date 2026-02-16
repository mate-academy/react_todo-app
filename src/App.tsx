import React, { useContext, useMemo } from 'react';
import { TodoContext } from './context/TodoContext';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header/Header';
import { FilterType } from './types/constants';
import { useHashFilter } from './hooks/useHashFilter';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  const currentFilter = useHashFilter();

  const visibleTodos = useMemo(() => {
    switch (currentFilter) {
      case FilterType.Active:
        return todos.filter(todo => !todo.completed);
      case FilterType.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, currentFilter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};
