/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { TodosContext } from './components/GlobalState/GlobalState';
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.All,
  );

  const todos = useContext(TodosContext);

  const filterTodosByStatus = () => {
    if (statusFilter === StatusFilter.All) {
      return todos;
    }

    if (statusFilter === StatusFilter.Active) {
      return [...todos].filter(todo => !todo.completed);
    }

    if (statusFilter === StatusFilter.Completed) {
      return [...todos].filter(todo => todo.completed);
    }
  };

  const calculateActiveTodos = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  const countActiveTodo = calculateActiveTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filterTodosByStatus() ?? []} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            countActiveTodo={countActiveTodo}
          />
        )}
      </div>
    </div>
  );
};
