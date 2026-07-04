/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodoHeader } from '../TodoHeader';
import { TodoList } from '../TodoList';
import { Footer } from '../Footer';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && <TodoList />}

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
