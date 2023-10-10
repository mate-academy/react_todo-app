/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodosContext } from './TodoProvider';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <TodoHeader />
      <TodoList />
      {todos.length > 0 && <TodoFooter />}
    </div>
  );
};
