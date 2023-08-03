import React, { useContext } from 'react';

import { TodosContext } from '../TodosContext/TodosContext';

import { AddTodos } from './AddTodos';
import { TodosList } from './TodosList';
import { TodosFooter } from './TodosFooter';

export const TodosApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const isTodos = todos.length !== 0;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodos />
      </header>

      <TodosList />

      {isTodos && (<TodosFooter />)}
    </div>
  );
};
