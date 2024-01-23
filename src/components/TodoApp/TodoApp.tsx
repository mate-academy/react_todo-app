import './todoapp.css';

import React, { useContext } from 'react';
import { Header } from '../header';
import { Main } from '../main';
import { Footer } from '../footer';
import { TodosContext } from '../../context/TodosContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      {!todos.length || (
        <Main />
      )}

      {todos.length > 0 && (
        <Footer />
      )}
    </div>
  );
};
