import React, { useState, useMemo } from 'react';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { useTodos } from '../TodosContext';
import { FocusProvider } from '../FocusContext';

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoApp: React.FC = () => {
  const { todos, toggleAllTodos, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <FocusProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <div className="todoapp__content">
          <Header hasTodos={!!todos.length} />
          {todos.length > 0 && (
            <>
              <TodoList todos={filteredTodos} />
              <Footer
                activeCount={activeTodosCount}
                hasCompletedTodos={hasCompletedTodos}
                currFilter={filter}
                onFilterChange={setFilter}
                onClearCompleted={clearCompleted}
                onToggleAll={toggleAllTodos}
              />
            </>
          )}
        </div>
      </div>
    </FocusProvider>
  );
};
