import React, { useContext } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { TodoContext } from '../TodoContext';
import { TodosFilter } from './TodosFilter';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <Header />
      {todos.length > 0
      && (
        <>
          <Main />
          <TodosFilter />
        </>
      )}

    </div>
  );
};
