/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodosContext } from './components/TodosContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filterType, setFilterType] = useState<Filter>(Filter.ALL);

  function filter(type: Filter, toFilter: Todo[]) {
    switch (type) {
      case Filter.ACTIVE:
        return toFilter.filter(item => !item.completed);

      case Filter.COMPLETED:
        return toFilter.filter(item => item.completed);

      case Filter.ALL:
        return toFilter;

      default:
        return toFilter;
    }
  }

  const filteredTodos = filter(filterType, todos) || [];

  return (
    <div className="todoapp">
      <TodosContext.Provider value={{
        todos,
        setTodos,
        filteredTodos,
        filterType,
        setFilterType,
      }}
      >
        <TodoHeader />
        <TodoList />
        <TodoFooter />
      </TodosContext.Provider>
    </div>
  );
};
