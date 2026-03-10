/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoProvider, TodoContext } from './contexts/TodoContext';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

export const TodoApp: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && (
          <>
            <TodoList filter={filter} />
            <TodoFooter filter={filter} onFilterChange={setFilter} />
          </>
        )}
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);
