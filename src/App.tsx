/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainSection } from './components/MainSection/MainSection';
import { Footer } from './components/Footer';
import { Filter } from './types/Filter';
import { useTodos } from './hooks/useTodos';

export const App: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const filterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    } else if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const allCompleted = todos.every(todo => todo.completed);

  const toggleAll = () => {
    const newCompleted = !allCompleted;

    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: newCompleted,
      })),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header toggleAll={toggleAll} allCompleted={allCompleted} />
        <MainSection visibleTodos={visibleTodos} />
        {todos.length > 0 && (
          <Footer filterChange={filterChange} filter={filter} />
        )}
      </div>
    </div>
  );
};
