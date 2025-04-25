/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { TododList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useTodos } from './context/TodoContext';
import { Filter } from './type/Filter';

export const App: React.FC = () => {
  const [filteredBy, setFilteredBy] = useState(Filter.All);
  const { todos } = useTodos();

  const unCompletedTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const filteredTodos = useMemo(() => {
    switch (filteredBy) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filteredBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header unCompletedTodos={unCompletedTodos} />
        <TododList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <Footer
            unCompletedTodos={unCompletedTodos}
            filteredBy={filteredBy}
            setFilteredBy={setFilteredBy}
          />
        )}
      </div>
    </div>
  );
};
