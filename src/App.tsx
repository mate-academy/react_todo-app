import React, { useContext, useRef, useState } from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

import { Filter } from './types/Filter';
import { StateContext } from './Store';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  const [filter, setFilter] = useState<Filter>(Filter.All);

  const activeTodos = todos.filter(todo => !todo.completed);
  const activeTodosCount = activeTodos.length;
  const completedTodosCount = todos.length - activeTodosCount;
  const allTodosCompleted = activeTodosCount === 0 && todos.length !== 0;

  const inputRef = useRef<HTMLInputElement>(null);

  const focusNewTodoField = () => {
    inputRef.current?.focus();
  };

  const onFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          allTodosCompleted={allTodosCompleted}
          inputRef={inputRef}
          focusNewTodoField={focusNewTodoField}
        />

        <TodoList filter={filter} focusNewTodoField={focusNewTodoField} />

        {todos.length !== 0 && (
          <Footer
            completedTodosCount={completedTodosCount}
            activeTodosCount={activeTodosCount}
            filter={filter}
            onFilterChange={onFilterChange}
            focusNewTodoField={focusNewTodoField}
          />
        )}
      </div>
    </div>
  );
};
