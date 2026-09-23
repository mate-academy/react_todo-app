import React, { useContext } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { TodoList } from '../TodoList/TodoList';
import { StateContext } from '../../context/Store';

export const Content: React.FC = () => {
  const todoList = useContext(StateContext);

  return (
    <div className="todoapp__content">
      <Header />
      <TodoList />
      {todoList.todos.length !== 0 && <Footer />}
    </div>
  );
};
