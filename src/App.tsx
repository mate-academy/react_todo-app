import React, { useState, useMemo, useContext } from 'react';
import { Filter } from './types/Filter';
import { TodosContext } from './components/TodosContext';
import SectionTodo from './components/SectionTodo';
import FooterTodo from './components/FooterTodo';
import HeaderTodo from './components/HeaderTodo';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const {
    todos,
    filterTodos,
  } = useContext(TodosContext);

  const filteredTodos = useMemo(() => {
    return filterTodos(filter);
  }, [filter, filterTodos]);

  return (
    <div className="todoapp">
      <HeaderTodo />
      {!!todos.length && (
        <>
          <SectionTodo filteredTodos={filteredTodos} />
          <FooterTodo filter={filter} setFilter={setFilter} />
        </>
      )}
    </div>
  );
};
