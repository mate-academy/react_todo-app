import React, { useContext } from 'react';
import { AddForm } from '../AddForm';
import { Context } from '../context';
import { Footer } from '../Footer';
import { TodoList } from '../TodoList';

export const TodosApp: React.FC = () => {
  const { todos } = useContext(Context);

  return (
    <div
      className="todoapp"
      data-theme="ligth"
    >
      <header className="header">
        <h1>Todos</h1>

        <AddForm />
      </header>

      <TodoList />

      {todos.length > 0 && <Footer />}
    </div>
  );
};
