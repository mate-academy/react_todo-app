import React, { useContext } from 'react';
import { TodosFilter } from './Components/Footer/TodosFilter';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { TodosContext } from './Context/TodosContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      <Main />

      {!!todos.length && <TodosFilter />}
    </div>
  );
};
