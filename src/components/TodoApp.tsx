import React from 'react';
import { useTodo } from './TodoContext';
import { TodoHeader } from './TodoHeader';
import { TodoFooter } from './TodoFooter';
import { TodoList } from './TodoList';

export const TodoApp: React.FC = () => {
  const { todos } = useTodo();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && <TodoList />}

        {todos.length > 0 && <TodoFooter />}
      </div>
    </div>
  );
};
