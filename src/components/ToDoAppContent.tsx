import React from 'react';
import { useContext } from 'react';
import { ToDoContext } from '../store/AppContext';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Navigation } from './Navigation';

export const ToDoAppContent: React.FC = () => {
  const { state } = useContext(ToDoContext);
  const { todoList } = state;

  return (
    <div className="todoapp__content">
      <Header />
      {todoList.length !== 0 && (
        <>
          <TodoList />
          <Navigation />
        </>
      )}
    </div>
  );
};
