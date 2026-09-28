/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useTodos } from '../TodoContext';
import { TodoList } from './TodoList';
import { Header } from './Header';
import { Footer } from './Footer';

export const TodoApp: React.FC = () => {
  const { todos } = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};
