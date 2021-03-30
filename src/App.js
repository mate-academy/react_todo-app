import React, { useContext, useEffect, useState } from 'react';

import { TodoApp } from './components/TodoApp';
import { NotFoundPage } from './components/NotFoundPage';
import { MainStatusControl } from './components/MainStatusControl';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

import { TodosContext } from './utils/TodosContext';
import { LoadingErrorConext } from './utils/LoadingErrorContext';
import { getUser } from './utils/api';
import { userId } from './utils/constants';

const App = () => {
  const { todos } = useContext(TodosContext);
  const { isLoadingError } = useContext(LoadingErrorConext);
  const [userName, setUserName] = useState('');

  const loadData = async() => {
    const result = await getUser(userId);

    setUserName(result.name);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="todoapp">
      <TodoApp
        userName={userName}
      />
      {isLoadingError ? (
        <NotFoundPage />
      ) : (todos.length > 0 && (
        <>
          <section className="main">
            <MainStatusControl />
            <TodoList />
          </section>
          <TodosFilter />
        </>
      ))
    }
    </section>
  );
};

export default App;
