import React from 'react';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { useTodos } from '../TodosContext/TodosContext';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp: React.FC = () => {
  const todos = useTodos();

  return (
    <div className="todoapp">
      <Header />
      <Main />
      {todos.length > 0 && <TodosFilter />}
    </div>
  );
};
