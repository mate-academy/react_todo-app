import React from 'react';
import { TodoApp } from './components/todoApp/TodoApp';
import { TodoList } from './components/todoList/TodoList';
import { TodosProvider } from './providers/TodosContext';
import { TodosFilter } from './components/todoFilter/TodosFilter';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <TodoApp />
        <TodoList />
        <TodosFilter />
      </div>
    </TodosProvider>
  );
};
