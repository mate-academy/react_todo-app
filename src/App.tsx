/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from './TodoContext';
import { Filter } from './types/Filter';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext must be used within TodoProvider');
  }

  const { todos, addTodo, toggleAll, clearCompleted } = context;
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === '#/active') {
        setFilter(Filter.Active);
      } else if (hash === '#/completed') {
        setFilter(Filter.Completed);
      } else {
        setFilter(Filter.All);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const visibleTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const allCompleted = todos.length > 0 && activeTodos.length === 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todosCount={todos.length}
          allCompleted={allCompleted}
          onToggleAll={toggleAll}
          onAddTodo={addTodo}
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              activeCount={activeTodos.length}
              completedCount={completedTodos.length}
              currentFilter={filter}
              onClearCompleted={clearCompleted}
            />
          </>
        )}
      </div>
    </div>
  );
};
