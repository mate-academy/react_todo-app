import React, { useContext } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { TodoContext } from './TodoContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <Header />
      {
        todos.length > 0 && (
          <>
            <TodoList />
            <Footer />
          </>
        )
      }
    </div>
  );
};
