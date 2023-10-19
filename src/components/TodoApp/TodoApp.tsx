/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { TodoBody } from '../TodoBody';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />
      {todos.length > 0 && (
        <>
          <TodoBody />
          <Footer />
        </>
      )}
    </div>
  );
};
