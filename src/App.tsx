import React from 'react';

import { TodoForm } from './Components/TodoForm/TodoForm';
import { TodoList } from './Components/TodoList/TodoList';

import { TodoFooter } from './Components/TodoFooter/TodoFooter';
import {
  TodosProvider,
} from './Components/TodosContext/TodosContext';

export const App: React.FC = () => {
  // const { todos } = useContext(TodosContext);

  // const isTodos = todos.length > 0;

  return (
    <TodosProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoForm />
        </header>

        <TodoList />

        <TodoFooter />
      </div>
    </TodosProvider>
  );
};
