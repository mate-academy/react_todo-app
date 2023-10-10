/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Query } from './helpers/Query';
import { getPreparedTodos } from './components/TodosFilter/TodosFilter';
import { StateTodos } from './components/TodosContext/TodosContext';

export const App: React.FC = () => {
  const [query, setQuery] = useState<Query>('All');
  const todos = useContext(StateTodos);

  const preparedTodos = getPreparedTodos(todos, query);

  return (
    <div className="todoapp">
      <Header />
      <Main todos={preparedTodos} />
      <Footer setQuery={setQuery} />
    </div>
  );
};
