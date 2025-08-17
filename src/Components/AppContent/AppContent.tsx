/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Header } from '../../Components/Header';
import { TodoList } from '../../Components/TodoList';
import { Footer } from '../../Components/Footer';
import { TodoListContext } from '../../Context/TodoListContext';

export const AppContent: React.FC = () => {
  const { todoList } = useContext(TodoListContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList />

        {todoList.length !== 0 && <Footer />}
      </div>
    </div>
  );
};
