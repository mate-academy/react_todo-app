import React, { useContext } from 'react';
import { Footer } from '../Footer/Footer';
import { TodoList } from '../TodoList/TodoList';
import { Header } from '../Header/Header';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoApp: React.FC = () => {
  const { allTodos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      {allTodos.length !== 0 && (
        <div>
          <TodoList />

          <Footer />
        </div>
      )}
    </div>
  );
};
