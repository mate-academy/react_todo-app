import React, { useContext } from 'react';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import { TodoContext } from '../context/todo.context';

const TodoWidget: React.FC = () => {
  const { todosStats } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <TodoHeader />
      {todosStats.todosTotal > 0 && (
        <>
          <TodoList />
          <TodoFooter />
        </>
      )}
    </div>
  );
};

export default TodoWidget;
