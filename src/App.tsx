import React, { useContext, useState } from 'react';
import { TodoApp } from './components/TodoApp';
import { Filter } from './types/Filter';
import { TodosContext } from './components/TodosContext';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const { todos } = useContext(TodosContext);

  const filtredTodo = todos.filter(({ completed }) => {
    switch (filter) {
      case Filter.Active:
        return !completed;
      case Filter.Completed:
        return completed;
      default:
        return true;
    }
  }, [filter]);

  return (
    <div className="todoapp">
      <TodoApp />
      {!!todos.length && (
        <>
          <TodoList items={filtredTodo} />
          <TodoFilter filter={filter} onFilterChange={setFilter} />
        </>
      )}
    </div>
  );
};
