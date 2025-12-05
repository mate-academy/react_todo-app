import React from 'react';
import { useTodos } from '../context/TodoContext';
import { TodoList } from './TodoList';
import { Footer } from './Footer';

export const TodosContent: React.FC = () => {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return null;
  }

  return (
    <>
      <TodoList />
      <Footer />
    </>
  );
};
