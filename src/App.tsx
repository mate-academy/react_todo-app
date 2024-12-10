import React, { useContext } from 'react';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodosContext } from './context';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList />
        {todos.length > 0 && <TodoFooter />}
      </div>
    </div>
  );
};
