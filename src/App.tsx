import React, { useContext } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoToggler } from './components/TodoToggler';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoContextList } from './Services/TodosContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContextList);

  return (
    <div className="todoapp">
      <TodoForm />

      {todos.length > 0 && (
        <>
          <section className="main">
            <TodoToggler />
            <TodoList />
          </section>

          <TodoFilter />
        </>
      )}
    </div>
  );
};
