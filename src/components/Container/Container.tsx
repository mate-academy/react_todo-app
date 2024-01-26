import React, { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { TodoApp } from '../TodoApp/TodoApp';

export const Container: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div>
      <Header />

      {todos.length > 0 && (
        <TodoApp />
      )}

      {todos.length > 0 && (
        <Footer />
      )}
    </div>
  );
};
