/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Footer } from './components/Footer';
import { TodosContext } from './context/TodosContext';
import { FilterOption } from './types/FIlterOption';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const [filter, setFilter] = useState<FilterOption>('All');

  const filteredTodos = useMemo(
    () =>
      todos.filter(todo =>
        filter === 'Active'
          ? !todo.completed
          : filter === 'Completed'
            ? todo.completed
            : true,
      ),
    [todos, filter],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        <TodoList todos={filteredTodos} />

        <Footer filter={filter} onFilter={setFilter} />
      </div>
    </div>
  );
};
