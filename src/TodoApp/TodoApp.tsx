import React from 'react';
import { Main } from '../Components/Main/Main';
import { useTodos } from '../Components/TodoContext/TodoContext';
import { TodoFilter } from '../Components/TodoFilter/TodoFilter';
import { Header } from '../Components/Header/Header';

export const TodoApp: React.FC = () => {
  const todos = useTodos();

  return (
    <div className="todoapp">
      <Header />
      <Main />
      {todos.length && <TodoFilter />}
    </div>
  );
};
