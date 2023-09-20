import React, { useContext } from 'react';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <TodoHeader />

      {!!todos.length && (
        <>
          <TodoList />
          <TodoFooter />
        </>
      )}
    </div>
  );
};
