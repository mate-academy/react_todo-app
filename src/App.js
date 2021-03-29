import React, { useContext } from 'react';

import { TodoAPP } from './components/TodoAPP';
import { MainStatusControl } from './components/MainStatusControl';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

import { TodosContext } from './utils/TodosContext';

const App = () => {
  const { todos } = useContext(TodosContext);

  return (
    <section className="todoapp">
      <TodoAPP />
      {todos.length > 0 && (
      <>
        <section className="main">
          <MainStatusControl />
          <TodoList />
        </section>
        <footer className="footer">
          <TodosFilter />
        </footer>
      </>
      )}
    </section>
  );
};

export default App;
